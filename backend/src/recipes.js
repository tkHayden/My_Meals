/* eslint-disable max-len */
const axios = require('axios');
const NodeCache = require( 'node-cache' );
const myCache = new NodeCache();

const spoonacular = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = process.env.SPOONACULAR_API_KEY;

exports.searchRecipes = async (req, res) => {
  try {
    const searchVal = req.query.search;
    const offset = req.query.offset;
    const recipeResponse = await axios.get(`${spoonacular}?query=${searchVal}&offset=${offset}&number=20&apiKey=${apiKey}`);
    console.log(recipeResponse.data.results);
    res.status(200).json(recipeResponse.data.results);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.getFeaturedRecipes = async (req, res) => {
  try {
    const cachedRecipes = myCache.get('featured_recipes');
    if (cachedRecipes) {
      console.log('cached');
      res.status(200).json(cachedRecipes);
    } else {
      const featureResponse = await axios.get(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`);
      console.log(featureResponse.data);

      const keys = ['id', 'title', 'calories', 'image'];
      const filteredRecipes = featureResponse.data.recipes.map((recipe) => {
        const obj ={};
        for (const key of keys) {
          obj[key] = recipe[key];
        }
        return obj;
      });
      console.log(filteredRecipes);
      myCache.set('featured_recipes', filteredRecipes, 3600);
      res.status(200).json(filteredRecipes);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};
