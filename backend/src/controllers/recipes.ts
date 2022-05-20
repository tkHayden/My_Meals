/* eslint-disable max-len */
import axios from 'axios';
import {CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { Request, Response} from 'express';
import {SpoonacularRecipe, IngredientsNutrients, RecipeInterface, 
  FeatureResults, RecipeResult, SearchResults} from '../models/recipes.model'
const myCache = new CacheContainer(new MemoryStorage())

const spoonacular = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = process.env.SPOONACULAR_API_KEY;

export const searchRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchVal = req.query.search;
    let offset = 0
    if (req.query.offset){
      offset = parseInt(req.query.offset as string)
    }
    const recipeResponse = await axios.get<SearchResults>(`${spoonacular}?query=${searchVal}&offset=${offset}&number=20&apiKey=${apiKey}`);
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

export const getFeaturedRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const cachedRecipes = await myCache.getItem<RecipeInterface[]>('featured_recipes');
    if (cachedRecipes) {
      console.log('cached');
      res.status(200).json(cachedRecipes);
    } else {
      const featureResponse = await axios.get<FeatureResults>(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`);
      const filteredRecipes = featureResponse.data.recipes.map((recipe) => {
        const obj: RecipeInterface={
          id: '',
          title: '',
          image: '',
          imageType: ''
          };
        for (const key of Object.keys(obj)) {
          obj[key]= recipe[key];
        }
        return obj;
      });
      myCache.setItem('featured_recipes', filteredRecipes, {ttl:3600});
      res.status(200).json(filteredRecipes);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const recipeResult = await axios.get<SpoonacularRecipe>(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`);
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

const filterRecipe = (recipe: SpoonacularRecipe): RecipeResult => {
  const keys = ['id', 'title', 'readyInMinutes', 'servings', 'image'];
  const newRecipeObj= {} as RecipeResult;
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
  console.log(newRecipeObj.id)
  newRecipeObj.ingredients = grabMoreInfo(recipe.extendedIngredients);
  newRecipeObj.nutrients = grabMoreInfo(recipe.nutrition.nutrients);

  return newRecipeObj;
};

// Extracts appropriate properties from Ingredients or Nutrients obj from spoonacular's recipe obj response
const grabMoreInfo = (obj:IngredientsNutrients[] ): IngredientsNutrients[]=> {
  const arr: IngredientsNutrients[] = [];
  for (const item of obj) {
    const tempObj = {} as IngredientsNutrients;
    tempObj['name'] = item.name;
    tempObj['amount'] = Math.ceil(item.amount);
    tempObj['unit'] = item.unit;
    // Grab meta property only if we passed in the ingredient obj
    arr.push(tempObj);
  }
  return arr;
};
