import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Home from './Home';
import Recipes from './RecipeView/Recipes';
import FeaturedRecipes from './RecipeView/FeaturedRecipes';
import ResultRecipes from './RecipeView/ResultRecipes';
import Recipe from './RecipeView/Recipe';
import RecipeModal from './RecipeView/RecipeModal';
import Layout from './Layout';

const xtheme = createTheme({
  palette: {
    primary: {
      main: '#7AB2B9',
    },
    secondary: {
      main: '#E28657',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <ThemeProvider theme={xtheme}>
      <Layout>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="recipes" element={<Recipes />}>
            <Route index element={<FeaturedRecipes />} />
            <Route path="results" element={<ResultRecipes />} />
          </Route>
          <Route path="/recipe/:id" element={<Recipe children={undefined} />} />
        </Routes>
      </Layout>
      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/recipe/:id" element={<RecipeModal />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default App;
