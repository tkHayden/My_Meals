import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';
import {BasicRecipe} from './Recipe.model';

const ResultRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultRecipes, setResultRecipes] = useState<BasicRecipe[] |undefined>(undefined);
  const [offsetSearch, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingRecipes, setRemainingRecipes] = useState(0);

  // useEffect(() => {
  //   console.log(searchParams.get('search'));
  //   setSearchParams({search: searchParams.get('search')});
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getQueryString = (offset: number) => {
    const searchQuery = searchParams.get('search');
    const queryString = new URLSearchParams({
      search: searchQuery ? searchQuery : '',
      offset: `${offset}`,
    }).toString();
    return queryString;
  };

  useEffect(() => {
    // only fetch if search query is set. This keeps the background
    // state (resultRecipes) intact when RecipeModal is opened
    if (searchParams.get('search')) {
      setResultRecipes(undefined);
      const queryString = getQueryString(0);
      fetch(`http://localhost:3010/v0/recipes?${queryString}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setRemainingRecipes(data.remaining);
            setResultRecipes(data.results);
          });
    }
  }, [searchParams]);

  const loadMore = () => {
    setIsLoading(true);
    const offset = offsetSearch + 20;
    setOffset(offset );
    const queryString = getQueryString(offset);
    fetch(`http://localhost:3010/v0/recipes?${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (resultRecipes) {
            setResultRecipes((currRecipes) =>
            currRecipes ? [...currRecipes, ...data.results] : [...data.results]);
          }
          setRemainingRecipes(data.remaining);
          setIsLoading(false);
        });
  };
  const renderButton = (recipes:BasicRecipe[] |undefined, isLoading: boolean, remainingRecipes: number) => {
    console.log(remainingRecipes);
    if (recipes && remainingRecipes > 0) {
      return (
        <Button variant="contained"
          size="large"
          color= 'primary'
          onClick={() => loadMore()}>
          {isLoading ? 'Loading...' :
           `Load more results (${remainingRecipes} more)`}
        </Button>
      );
    }
  };
  return (
    <>
      {resultRecipes ?
       <RecipeList recipeList={resultRecipes} header={'Results'}/> :
       <CircularProgress />}
      {renderButton(resultRecipes, isLoading, remainingRecipes)}
    </>
  );
};

export default ResultRecipes;
