/* eslint-disable max-len */
import express from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import OpenApiValidator from 'express-openapi-validator';
const recipes = require('./controllers/recipes');
const {verifyUserId, checkJwt} = require('./util/middleware');
const grocerylist = require('./controllers/grocerylist');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');
const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);


app.get('/v0/recipes', recipes.searchRecipes);
app.get('/v0/featured_recipes', recipes.getFeaturedRecipes);
app.get('/v0/recipe/:id', recipes.getRecipe);
app.get('/v0/:userId/grocerylist', checkJwt, verifyUserId, grocerylist.getUsersGroceryLists);
app.post('/v0/:userId/grocerylist', checkJwt, verifyUserId, grocerylist.addUsersNewGrocerylist);
app.delete('/v0/:userId/grocerylist/:listId', checkJwt, verifyUserId, grocerylist.deleteUsersGroceryList);
app.put('/v0/:userId/grocerylist/:listId', checkJwt, verifyUserId, grocerylist.updateUsersGroceryListName);
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
