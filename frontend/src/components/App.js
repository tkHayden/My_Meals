import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Home from './Home';
import Recipes from './RecipeView/Recipes';
import FeaturedRecipes from './RecipeView/FeaturedRecipes';
import ResultRecipes from './RecipeView/ResultRecipes';

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
  },
});

const App = () => {
  return (
    <ThemeProvider theme={xtheme}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="recipes" element={<Recipes />}>
          <Route index element={<FeaturedRecipes/>}/>
          <Route path='results' element={<ResultRecipes/>}/>
        </Route>

      </Routes>
    </ThemeProvider>

  );
};

export default App;
