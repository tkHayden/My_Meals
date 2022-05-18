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
    const remainingResults = recipeResponse.data.totalResults - offset - 20;
    const resObj = {
      results: recipeResponse.data.results,
      remaining: remainingResults > 0 ? remainingResults : 0,
    };
    res.status(200).json(resObj);
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

      const keys = ['id', 'title', 'calories', 'image'];
      const filteredRecipes = featureResponse.data.recipes.map((recipe) => {
        const obj ={};
        for (const key of keys) {
          obj[key] = recipe[key];
        }
        return obj;
      });
      myCache.set('featured_recipes', filteredRecipes, 3600);
      res.status(200).json(filteredRecipes);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const id = req.params.id;

    const recipeResult = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`);
    if (recipeResult.status == 200) {
      const recipe = filterRecipe(recipeResult.data);
      res.status(200).json(recipe);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

const filterRecipe = (recipe) => {
  const keys = ['id', 'title', 'readyInMinutes', 'servings', 'image'];
  const newRecipeObj = {instructions: []};
  for (const key of keys) {
    newRecipeObj[key] = recipe[key];
  }
  // Changing cuisines/diets from an array to string of concanated values to make it easier to display on the frontend
  newRecipeObj.cuisines = recipe.cuisines.join(' , ');
  newRecipeObj.diets = recipe.diets.join(' , ');
  if (recipe.analyzedInstructions.length > 0) {
    for (const instruction of recipe.analyzedInstructions[0].steps) {
      newRecipeObj.instructions.push(instruction.step);
    }
  }
  newRecipeObj.ingredients = grabMoreInfo(recipe.extendedIngredients, true);
  newRecipeObj.nutrients = grabMoreInfo(recipe.nutrition.nutrients, false);

  return newRecipeObj;
};

// Extracts appropriate properties from Ingredients or Nutrients obj from spoonacular's recipe obj response
const grabMoreInfo = (obj, isIngredients) => {
  const arr =[];
  for (const item of obj) {
    const tempObj = {};
    tempObj['name'] = item.name;
    tempObj['amount'] = Math.ceil(item.amount);
    tempObj['unit'] = item.unit;
    // Grab meta property only if we passed in the ingredient obj
    if (isIngredients) {
      // Changing meta from an array to string of concanated values to make it easier to display on the frontend
      tempObj['meta'] = item.meta.join(' , ');
    }
    arr.push(tempObj);
  }
  return arr;
};
