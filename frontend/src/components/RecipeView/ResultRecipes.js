import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import RecipeList from './RecipeList';
import CircularProgress from '@mui/material/CircularProgress';
import {Button, Typography} from '@mui/material';

const ResultRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultRecipes, setResultRecipes] = useState();
  const [offsetSearch, setOffset] = useState(0);

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
          setResultRecipes(data);
        });
  }, []);

  const loadMore = () => {
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
          setResultRecipes((currRecipes) => [...currRecipes, ...data]);
        });
  };
  return (
    <>
      {resultRecipes ?
       <RecipeList recipes={resultRecipes} header={'Results'}/> :
       <CircularProgress />}
      <Button variant="contained"
        size="large"
        color= 'primary'
        onClick={() => loadMore()}>
        Load More
      </Button>
    </>
  );
};

export default ResultRecipes;
