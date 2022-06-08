import {rest} from 'msw';
import response from './mockResponses.json';

const baseUrl = 'http://localhost:3010/v0/';

export const fetchFeaturedRecipes = rest.get(`${baseUrl}featured_recipes`, async (req, res, ctx) => {
  return res(
      ctx.status(200),
      ctx.json(response.featured),
  );
});

export const fetchFeaturedRecipesNetworkError = rest.get(`${baseUrl}featured_recipes`, async (req, res, ctx) => {
  return res.networkError('Failed to connect');
});

export const handlers = [fetchFeaturedRecipes, fetchFeaturedRecipesNetworkError];
