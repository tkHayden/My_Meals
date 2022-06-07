// eslint-disable-next-line @typescript-eslint/no-var-requires
const testRecipes = require("./recipeTestData.json");
import supertest from "supertest";
import http from "http";
import { app } from "../app";
import axios from "axios";
import { getRecipe } from "../controllers/recipes";
import { IngredientsNutrients } from "../models/recipes.model";
let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const apiKey = process.env.SPOONACULAR_API_KEY;
const url = `https://api.spoonacular.com/recipes/0/information?includeNutrition=true&apiKey=${apiKey}`;
mockedAxios.get.mockImplementation((ur) => {
  // extracts recipe id from request url,
  //which is just the array index for testRecipes
  const index = ur.charAt(36);

  return Promise.resolve({ status: 200, data: testRecipes[index] });
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
