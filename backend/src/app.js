/* eslint-disable max-len */
const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
const recipes = require('./recipes');
const {MongoClient} = require('mongodb');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mongoHost = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const uri = `mongodb://${mongoHost}:${mongoPassword}@localhost:27017`;
const client = new MongoClient(uri);

const run = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('admin').command({ping: 1});
    console.log('Connected successfully to server!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
run().catch(console.dir);
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

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
