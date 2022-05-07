import React, {useState} from 'react';
import {Box, Grid, Typography,
  ListItem, ListItemText} from '@mui/material';
import HeaderBar from '../HeadBar';
import Footer from '../Footer';
import {GridItem, InfoList} from './Recipe.style';

// development data
import data from '../../devData.json';

const Recipe = () => {
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
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <HeaderBar />
      <Box sx={{flexGrow: 1, pb: 5, display: 'flex', justifyContent: 'center'}}>
        <Grid container space={2} sx={{maxWidth: 1100}}>
          <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: {xs: 233, md: 350},
                maxWidth: {xs: 350, md: 350},
              }}
              alt="The house from the offer."
              src="https://spoonacular.com/recipeImages/800754-556x370.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>

            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography>
                {recipe.title}
              </Typography>
              <Typography>
                {recipe.nutrients[0].amount} Calories | {recipe.readyInMinutes} mins | {recipe.servings} servings
              </Typography>
            </Box>
          </Grid>
          <GridItem item xs={12} sm={6} >
            <Typography variant='h4'>
                General Info
            </Typography>
            <InfoList >
              <ListItem>
                <ListItemText
                  primary= {`Cuisine types: ${recipe.cuisines}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary= {`Diet types: ${recipe.diets}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary= {`Total time: ${recipe.readyInMinutes} mins`}
                />
              </ListItem>
              <ListItem>
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
            <InfoList>
              {renderIngredients()}
            </InfoList>
          </GridItem>
          <GridItem item xs={12} sm={6}>
            <Typography variant='h4'>
                Nutrients
            </Typography>
            <InfoList>
              {renderNutrients()}
            </InfoList>
          </GridItem>
          <GridItem item xs={12} sm={6} >
            <Typography variant='h4'>
              Instructions
            </Typography>
            <InfoList>
              {recipe.instructions.map((i) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary= {i}

                    />
                  </ListItem>
                );
              })}
            </InfoList>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Recipe;
