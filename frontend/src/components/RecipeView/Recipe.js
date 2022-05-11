import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography,
  ListItem, ListItemText, CircularProgress} from '@mui/material';
import {GridItem, InfoList, TitleDivider} from './Recipe.style';
import {useParams} from 'react-router-dom';
import {fadeUp} from './RecipeList.style.js';

// development data

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3010/v0/recipe/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRecipe(data);
        });
  }, [id]);

  const renderIngredients = () => {
    return (
      <>
        {recipe.ingredients.map((ingredient) => {
          return (
            <ListItem
              key={ingredient.name}
              divider = {true}
            >

              <ListItemText
                primary= {`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}
              />
            </ListItem>
          );
        })}
      </>
    );
  };

  const renderNutrients = () => {
    return (
      <>
        {recipe.nutrients.map((nutrient) => {
          return (
            <ListItem
              key={nutrient.name}
              divider = {true}
              secondaryAction={
                <ListItemText
                  primary= {`${nutrient.amount} ${nutrient.unit}`}
                />

              }
            >
              <ListItemText
                primary= {nutrient.name}
              />
            </ListItem>
          );
        })}
      </>
    );
  };
  return (
    <Box sx={{flexGrow: 1, pb: 5, display: 'flex', justifyContent: 'center', mt: 3}}>
      {recipe ?
      <Grid container spacing={2} sx={{maxWidth: 1100, animation: `${fadeUp} 2s ease`}}>
        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>
          <Box
            component="img"
            sx={{
              maxHeight: {xs: 350, sm: 400, lg: 450},
              maxWidth: {xs: 350, sm: 400, lg: 450},
            }}
            alt={`${recipe.title}`}
            src= {`${recipe.image}`}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>

          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant='h3' sx={{textAlign: 'center', fontSize: {xs: 40, sm: 45, md: 50, lg: 55}, p: 2}}>
              {recipe.title}
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'center', maxWidth: '100%', pb: 2}}>
              {recipe.nutrients[0].amount} Calories | {recipe.readyInMinutes} mins | {recipe.servings} servings
            </Typography>
            {props.children}
          </Box>
        </Grid>
        <GridItem item xs={12} sm={6} >
          <Typography variant='h4'>
                General Info
          </Typography>
          <TitleDivider/>
          <InfoList >
            <ListItem
              divider = {true}
              key={recipe.cuisines}>
              <ListItemText
                primary= {`Cuisine types: ${recipe.cuisines}`}
              />
            </ListItem>
            <ListItem
              divider = {true}
              key={recipe.diets}>
              <ListItemText
                primary= {`Diet types: ${recipe.diets}`}
              />
            </ListItem>
            <ListItem
              divider = {true}
              key={recipe.readyInMinutes}>
              <ListItemText
                primary= {`Total time: ${recipe.readyInMinutes} mins`}
              />
            </ListItem>
            <ListItem
              divider = {true}
              key={recipe.servings}>
              <ListItemText
                primary= {`Servings: ${recipe.servings}`}
              />
            </ListItem>

          </InfoList>
        </GridItem>
        <GridItem item xs={12} sm={6} >
          <Typography variant='h4'>
                Ingredients
          </Typography>
          <TitleDivider/>
          <InfoList>
            {renderIngredients()}
          </InfoList>
        </GridItem>
        <GridItem item xs={12} sm={6}>
          <Typography variant='h4' >
                Nutrients
          </Typography>
          <TitleDivider/>
          <InfoList>
            {renderNutrients()}
          </InfoList>
        </GridItem>
        <GridItem item xs={12} sm={6} >
          <Typography variant='h4'>
              Instructions
          </Typography>
          <TitleDivider/>
          <InfoList>
            {recipe.instructions.map((instruction, i) => {
              return (
                <ListItem
                  key={instruction}>
                  <ListItemText
                    primary= {`${i + 1}. ${instruction}`}

                  />
                </ListItem>
              );
            })}
          </InfoList>
        </GridItem>
      </Grid> :
      <Box>
        <CircularProgress size='80px' sx={{marginTop: 50}}/>
      </Box>}
    </Box>
  );
};

export default Recipe;
