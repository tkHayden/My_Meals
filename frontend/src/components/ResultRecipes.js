import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import RecipeList from './RecipeList';

const ResultRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultRecipes, setResultRecipes] = useState();

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
  }, [searchParams]);
  return (
    <>
      {resultRecipes ? <RecipeList recipes={resultRecipes} header={'Results'}/> :
  null}
    </>
  );
};

export default ResultRecipes;
