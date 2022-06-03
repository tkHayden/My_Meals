import React, {useEffect, useState} from 'react';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {BasicRecipe} from './Recipe.model';
import ErrorMessage from '../ErrorMessage';

const FeaturedRecipes = () => {
  const [isError, setIsError] = useState(false);
  const [featureRecipes, setFeatureRecipes] = useState<
    BasicRecipe[] | undefined
  >(undefined);
  useEffect(() => {
    fetch('http://localhost:3010/v0/featured_recipes')
        .then((response) => {
          return response.json();
        })
        .then((data: BasicRecipe[]) => setFeatureRecipes(data))
        .catch((err) => {
          console.log(err);
          setIsError(true);
        });
  }, []);

  const displayLoading = (isError: boolean) => {
    return (
      <>
        {isError ?
             <ErrorMessage/>:
      <CircularProgress />}
      </>
    );
  };
  return (
    <>
      {featureRecipes && !isError ? (
        <RecipeList recipeList={featureRecipes} header={'Featured'} />
      ) : (
        displayLoading(isError)
      )}
    </>
  );
};

export default FeaturedRecipes;
