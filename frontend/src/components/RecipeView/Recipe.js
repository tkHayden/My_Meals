import React, {useState} from 'react';
import {Box, Grid, Typography,
  ListItem, ListItemText} from '@mui/material';
import {GridItem, InfoList, TitleDivider} from './Recipe.style';

// development data
import data from '../../devData.json';

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(data);
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
      <Grid container spacing={2} sx={{maxWidth: 1100}}>
        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>
          <Box
            component="img"
            sx={{
              maxHeight: {xs: 400, lg: 500},
              maxWidth: {xs: 400, lg: 500},
            }}
            alt={`${recipe.title}`}
            src="https://spoonacular.com/recipeImages/800754-556x370.jpg"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>

          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant='h3' sx={{textAlign: 'center', fontSize: {xs: 40, sm: 45, md: 50, lg: 55}, p: 1}}>
              {recipe.title}
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'center', maxWidth: '100%'}}>
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
              key={recipe.cuisines}>
              <ListItemText
                primary= {`Cuisine types: ${recipe.cuisines}`}
              />
            </ListItem>
            <ListItem
              key={recipe.diets}>
              <ListItemText
                primary= {`Diet types: ${recipe.diets}`}
              />
            </ListItem>
            <ListItem
              key={recipe.readyInMinutes}>
              <ListItemText
                primary= {`Total time: ${recipe.readyInMinutes} mins`}
              />
            </ListItem>
            <ListItem
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
      </Grid>

    </Box>
  );
};

export default Recipe;
