import {mswServer} from './mockHttpServer';
import '@testing-library/jest-dom';
import * as handler from './handlers';
import FeaturedRecipes from '../RecipeView/FeaturedRecipes';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import mockData from './mockResponses.json';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

beforeEach(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
const mockUseLocationValue = {
  pathname: '/recipe',
  search: '',
  hash: '',
  state: null,
};
const history = createMemoryHistory();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as {},
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));


describe('Displaying Featured Recipes from API fetch', () => {
  test('Check title of Recipes with 45 or less characters', async () => {
    mswServer.use(handler.fetchFeaturedRecipes);
    render(<Router location={history.location} navigator={history}>
      <FeaturedRecipes />
    </Router>,
    );
    for (const data of mockData.featured) {
      if (data.title.length <= 45) {
        await screen.findByText(data.title);
      }
    }
  });
  test('Check title of Recipe with more than 45 characters have proper format', async () => {
    mswServer.use(handler.fetchFeaturedRecipes);
    render(<Router location={history.location} navigator={history}>
      <FeaturedRecipes />
    </Router>,
    );
    for (const data of mockData.featured) {
      if (data.title.length > 45) {
        await screen.findByText(`${data.title.substring(0, 45)}...`);
      }
    }
  });
  test('Check pictures for all recipes', async () => {
    mswServer.use(handler.fetchFeaturedRecipes);
    render(<Router location={history.location} navigator={history}>
      <FeaturedRecipes />
    </Router>,
    );
    for (const data of mockData.featured) {
      const img = await screen.findByAltText(`picture of ${data.title}`);
      expect(img).toHaveAttribute('src', data.image);
    }
  });
});

describe('Displaying Errors from Featured Recipes API fetch', () => {
  test('Error Connection when fetching from server', async () => {
    mswServer.use(handler.fetchFeaturedRecipesNetworkError);
    render(<FeaturedRecipes />);
    await screen.findByText('Error');
    await screen.findByText('Unable to connect to the server at this time. Please try again later!');
  });
});
