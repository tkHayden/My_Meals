import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';

const ResultRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultRecipes, setResultRecipes] = useState();
  const [offsetSearch, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingRecipes, setRemainingRecipes] = useState(0);

  useEffect(() => {
    console.log(searchParams.get('search'));
    setSearchParams({search: searchParams.get('search')});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch('http://localhost:3010/v0/recipes?' + new URLSearchParams({
      search: searchParams.get('search'),
      offset: 0,
    }))
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRemainingRecipes(data.remaining);
          setResultRecipes(data.results);
        });
  }, [searchParams]);

  const loadMore = () => {
    setIsLoading(true);
    const offset = offsetSearch + 20;
    setOffset(offset );
    console.log(offset );
    fetch('http://localhost:3010/v0/recipes?' + new URLSearchParams({
      search: searchParams.get('search'),
      offset: offset,
    }))
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResultRecipes((currRecipes) => [...currRecipes, ...data.results]);
          setRemainingRecipes(data.remaining);
          setIsLoading(false);
        });
  };
  const renderButton = (recipes, isLoading, remainingRecipes) => {
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
       <RecipeList recipes={resultRecipes} header={'Results'}/> :
       <CircularProgress />}
      {renderButton(resultRecipes, isLoading, remainingRecipes)}
    </>
  );
};

export default ResultRecipes;
