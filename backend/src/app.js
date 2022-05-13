/* eslint-disable max-len */
const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
const recipes = require('./recipes');
const user = require('./user');
const {verifyUserId, checkJwt} = require('./util/middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/name', checkJwt, verifyUserId, user.getName);
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

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
