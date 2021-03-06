import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';
import {BasicRecipe} from './Recipe.model';
import ErrorMessage from '../ErrorMessage';
import {useSearch} from '../Provider/SearchProvider';

const ResultRecipes = () => {
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultRecipes, setResultRecipes] = useState<BasicRecipe[] | undefined>(
      undefined,
  );
  const [offsetSearch, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingRecipes, setRemainingRecipes] = useState(0);
  const searchQuery = useSearch();

  // Sets search params in the url and
  // creates query string for the fetch api calls
  const getQueryString = (offset: number) => {
    setSearchParams({search: searchQuery});
    const queryString = new URLSearchParams({
      search: searchQuery ? searchQuery : '',
      offset: `${offset}`,
    }).toString();
    return queryString;
  };

  // useEffect call is dependent on the change of searchQuery. This makes
  // it so when a user clicks on individual recipe then clicks back to results
  // it doesnt call the fetch from the api again
  useEffect(() => {
    setResultRecipes(undefined);
    const queryString = getQueryString(0);
    fetch(`http://localhost:3010/v0/recipes?${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          setRemainingRecipes(data.remaining);
          setResultRecipes(data.results);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        });
  }, [searchQuery]);

  const loadMore = () => {
    setIsLoading(true);
    const offset = offsetSearch + 20;
    setOffset(offset);
    const queryString = getQueryString(offset);
    fetch(`http://localhost:3010/v0/recipes?${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (resultRecipes) {
            setResultRecipes((currRecipes) =>
            currRecipes ? [...currRecipes, ...data.results] : [...data.results],
            );
          }
          setRemainingRecipes(data.remaining);
          setIsLoading(false);
        });
  };

  const displayLoading = (isError: boolean) => {
    return <>{isError ? <ErrorMessage /> : <CircularProgress />}</>;
  };
  const renderButton = (
      recipes: BasicRecipe[] | undefined,
      isLoading: boolean,
      remainingRecipes: number,
  ) => {
    console.log(remainingRecipes);
    if (recipes && remainingRecipes > 0) {
      return (
        <Button
          variant='contained'
          size='large'
          color='primary'
          onClick={() => loadMore()}
        >
          {isLoading ?
            'Loading...' :
            `Load more results (${remainingRecipes} more)`}
        </Button>
      );
    }
  };
  return (
    <>
      {resultRecipes && !isError ? (
        <RecipeList recipeList={resultRecipes} header={'Results'} />
      ) : (
        displayLoading(isError)
      )}
      {renderButton(resultRecipes, isLoading, remainingRecipes)}
    </>
  );
};

export default ResultRecipes;
