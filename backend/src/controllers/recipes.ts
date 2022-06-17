/* eslint-disable max-len */
import axios from "axios";
import { CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";
import { Request, Response } from "express";
import {
  BasicRecipe,
  SpoonacularRecipes,
  IngredientsNutrients,
  DetailedRecipe,
  SpoonacularResponse,
  Instructions,
} from "../models/recipes.model";

type SearchResults = {
  results: BasicRecipe[];
  offset: number;
  number: number;
  totalResults: number;
};

const myCache = new CacheContainer(new MemoryStorage());
const spoonacular = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = process.env.SPOONACULAR_API_KEY;

export const searchRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searchVal = req.query.search;
    let offset = 0;
    if (req.query.offset) {
      offset = parseInt(req.query.offset as string);
    }
    const recipeResponse = await axios.get<SearchResults>(
      `${spoonacular}?query=${searchVal}&offset=${offset}&number=20&apiKey=${apiKey}`
    );
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

export const getFeaturedRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cachedRecipes = await myCache.getItem<SpoonacularRecipes[]>(
      "featured_recipes"
    );
    if (cachedRecipes) {
      console.log("cached");
      res.status(200).json(cachedRecipes);
    } else {
      const featureResponse = await axios.get<SpoonacularResponse>(
        `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`
      );
      const filteredRecipes = featureResponse.data.recipes.map((recipe) => {
        return createBasicRecipe(recipe);
      });
      myCache.setItem("featured_recipes", filteredRecipes, { ttl: 3600 });
      res.status(200).json(filteredRecipes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const recipeResult = await axios.get<SpoonacularRecipes>(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
    );
    if (recipeResult.status == 200) {
      const spoonacularRecipes = recipeResult.data as SpoonacularRecipes;
      const recipe = createDetailedRecipe(spoonacularRecipes);
      res.status(200).json(recipe);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

const createDetailedRecipe = (recipe: SpoonacularRecipes): DetailedRecipe => {
  return {
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    cuisines: recipe.cuisines.join(" , "),
    diets: recipe.diets.join(" , "),
    instructions: extractInstructions(recipe.analyzedInstructions),
    ingredients: extractIngredientsAndNutrients(recipe.extendedIngredients),
    nutrients: extractIngredientsAndNutrients(recipe.nutrition.nutrients),
    ...createBasicRecipe(recipe),
  };
};

const extractInstructions = (
  spoonacularInstructions: Instructions[]
): string[] => {
  const instructions: string[] = [];
  if (spoonacularInstructions.length > 0) {
    for (const instruction of spoonacularInstructions[0].steps) {
      instructions.push(instruction.step);
    }
  }
  return instructions;
};

// Extracts appropriate properties from Ingredients or Nutrients obj
// from spoonacular's recipe obj response
export const extractIngredientsAndNutrients = (
  obj: IngredientsNutrients[]
): IngredientsNutrients[] => {
  const arr: IngredientsNutrients[] = [];
  for (const item of obj) {
    arr.push({
      name: item.name,
      amount: Math.ceil(item.amount),
      unit: item.unit,
    });
  }
  return arr;
};
//Creates Recipe object with basic info. These recipe objects populate the
//search and feature responses
export const createBasicRecipe = (
  spoonacularRecipe: SpoonacularRecipes
): BasicRecipe => {
  return {
    id: spoonacularRecipe.id,
    title: spoonacularRecipe.title,
    image: spoonacularRecipe.image,
  };
};
