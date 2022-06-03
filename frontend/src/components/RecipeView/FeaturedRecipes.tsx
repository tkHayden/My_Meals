import React, {useEffect, useState} from 'react';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {BasicRecipe} from './Recipe.model';

const FeaturedRecipes = () => {
  // eslint-disable-next-line max-len
  const [featureRecipes, setFeatureRecipes] = useState<
    BasicRecipe[] | undefined
  >(undefined);
  useEffect(() => {
    fetch('http://localhost:3010/v0/featured_recipes')
        .then((response) => response.json())
        .then((data: BasicRecipe[]) => setFeatureRecipes(data));
  }, []);
  return (
    <>
      {featureRecipes ? (
        <RecipeList recipeList={featureRecipes} header={'Featured'} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FeaturedRecipes;
