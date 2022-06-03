/* eslint-disable max-len */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import {
  searchRecipes,
  getFeaturedRecipes,
  getRecipe,
} from "./controllers/recipes";
import { verifyUserId, checkJwt } from "./util/middleware";
import {
  getUsersGroceryLists,
  addUsersNewGrocerylist,
  deleteUsersGroceryList,
  updateUsersGroceryListName,
} from "./controllers/grocerylist";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface Error {
  status: number;
  message?: string;
}

const apiSpec = path.join(__dirname, "../api/openapi.yaml");
const apidoc: any = yaml.load(fs.readFileSync(apiSpec, "utf8"));
app.use("/v0/api-docs", swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  })
);

app.get("/v0/recipes", searchRecipes);
app.get("/v0/featured_recipes", getFeaturedRecipes);
app.get("/v0/recipe/:id", getRecipe);
app.get(
  "/v0/:userId/grocerylist",
  checkJwt,
  verifyUserId,
  getUsersGroceryLists
);
app.post(
  "/v0/:userId/grocerylist",
  checkJwt,
  verifyUserId,
  addUsersNewGrocerylist
);
app.delete(
  "/v0/:userId/grocerylist/:listId",
  checkJwt,
  verifyUserId,
  deleteUsersGroceryList
);
app.put(
  "/v0/:userId/grocerylist/:listId",
  checkJwt,
  verifyUserId,
  updateUsersGroceryListName
);
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: err.message,
      status: err.status,
    });
  }
);
