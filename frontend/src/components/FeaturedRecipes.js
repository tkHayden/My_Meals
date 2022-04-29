import React, {useEffect, useState} from 'react';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';


const FeaturedRecipes = () => {
  const [featureRecipes, setFeatureRecipes] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3010/v0/featured_recipes')
        .then((response) => response.json())
        .then((data) => setFeatureRecipes(data));
  }, []);
  return (
    <>
      {featureRecipes ?
       <RecipeList recipes={featureRecipes} header={'Featured'}/> :
       <CircularProgress />
      }
    </>
  );
};

export default FeaturedRecipes;
