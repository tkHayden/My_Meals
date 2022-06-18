/* eslint-disable @typescript-eslint/no-var-requires */
const testRecipes = require("./recipeTestData.json");
const mockSearchRecipes = require('./mockSearchResponse.json');
import supertest from "supertest";
import http from "http";
import { app } from "../app";
import axios from "axios";
import { IngredientsNutrients } from "../models/recipes.model";
let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const apiKey = process.env.SPOONACULAR_API_KEY;
const baseUrl= `https://api.spoonacular.com/recipes/`;
mockedAxios.get.mockImplementation((url: string) => {
  console.log(url);
  if (url.includes('random')){
    return Promise.resolve({ status: 200, data: testRecipes });
  } else if(url.includes('complexSearch')){

    return Promise.resolve({ status: 200, data: {results: mockSearchRecipes, number: 10, offset: 0, totalResults: 10} });

  }
  else {
    const index = url.charAt(36);

    return Promise.resolve({ status: 200, data: testRecipes[index] });
  }
});

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

const checkNutrientsIngredienst = (
  recipeInfo: IngredientsNutrients[],
  spoonacularInfo: IngredientsNutrients[]
) => {
  if (recipeInfo.length !== spoonacularInfo.length)
    for (let i = 0; i < recipeInfo.length; i++) {
      if (recipeInfo[i].name !== spoonacularInfo[i].name) {
        return false;
      }
      if (recipeInfo[i].amount !== spoonacularInfo[i].amount) {
        return false;
      }
      if (recipeInfo[i].unit !== spoonacularInfo[i].unit) {
        return false;
      }
    }
  return true;
};

test('Check that \\recipe\\"id enpoint responds with necessary data', async () => {
  for (let i = 0; i < testRecipes.length; i++) {
    const resp = await request.get(`/v0/recipe/${i}`);
    const recipe = resp.body;
    expect(recipe.id).toBe(testRecipes[i].id);
    expect(recipe.title).toBe(testRecipes[i].title);
    expect(recipe.servings).toBe(testRecipes[i].servings);
    expect(recipe.image).toBe(testRecipes[i].image);
    expect(
      checkNutrientsIngredienst(
        recipe.ingredients,
        testRecipes[i].extendedIngredients
      )
    ).toBe(true);
    expect(
      checkNutrientsIngredienst(
        recipe.nutrients,
        testRecipes[i].nutrition.nutrients
      )
    ).toBe(true);
  }
});

test('Check valid request for Featured Recipes', async () => {
  const response = await request.get('/v0/featured_recipes')
  const recipes = response.body;
  for (let i = 0; i < recipes.length; i++){
    expect(recipes[i].id).toBe(testRecipes[i].id)
    expect(recipes[i].title).toBe(testRecipes[i].title)
    expect(recipes[i].servings).toBe(testRecipes[i].servings)
    expect(recipes[i].image).toBe(testRecipes[i].image)
    expect(recipes[i].ingredients).toBe(undefined)
    expect(recipes[i].nutrients).toBe(undefined)
  }
})

test('Check valid request for searching of Recipes', async () => {
  const response = await request.get('/v0/recipes?search=chicken&offset=0')
  expect(response.body.remaining).toBe(0)
  const recipes = response.body.results;
  for (let i = 0; i < recipes.length; i++){
    expect(recipes[i].id).toBe(mockSearchRecipes[i].id)
    expect(recipes[i].title).toBe(mockSearchRecipes[i].title)
    expect(recipes[i].servings).toBe(mockSearchRecipes[i].servings)
    expect(recipes[i].image).toBe(mockSearchRecipes[i].image)
    expect(recipes[i].servings).toBe(undefined)
    expect(recipes[i].ingredients).toBe(undefined)
  }
})
