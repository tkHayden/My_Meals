import React, {useState} from 'react';
import {Box, Grid, Typography,
  List, ListItem, ListItemText} from '@mui/material';
import HeaderBar from '../HeadBar';
import Footer from '../Footer';
import data from '../../devData.json';

const Recipe = () => {
  const [recipe, setRecipe] = useState(data);

  const renderIngredients = () => {
    return (
      <>
        {recipe.ingredients.map((ingredient) => {
          return (
            <ListItem>
              <ListItemText
                primary= {ingredient.name}
                secondary= {ingredient.amount}
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
            <ListItem>
              <ListItemText
                primary= {nutrient.name}
                secondary= {nutrient.amount}
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
      <Box sx={{flexGrow: 1, pb: 5}}>
        <Grid container>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
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
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography>
                {recipe.title}
              </Typography>
              <Typography>
                {recipe.nutrients[0].amount} Calories | {recipe.readyInMinutes} mins | {recipe.servings} servings
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography>
                Ingredients
            </Typography>
            <List
              sx={{
                'width': '100%',
                'maxWidth': 360,
                'bgcolor': 'background.paper',
                'position': 'relative',
                'overflow': 'auto',
                'maxHeight': 200,
                '& ul': {padding: 0},
              }}
            >
              {renderIngredients()}
            </List>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <Typography>
                General Info
            </Typography>
            <List
              sx={{
                'width': '100%',
                'maxWidth': 360,
                'bgcolor': 'background.paper',
                'position': 'relative',
                'overflow': 'auto',
                'maxHeight': 200,

              }}>
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
            </List>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <Typography>
                Nutrients
            </Typography>
            <List
              sx={{
                'width': '100%',
                'maxWidth': 360,
                'bgcolor': 'background.paper',
                'position': 'relative',
                'overflow': 'auto',
                'maxHeight': 200,

              }}>
              {renderNutrients()}
            </List>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <Typography>
              instructions
            </Typography>
            <List
              sx={{
                'width': '100%',
                'maxWidth': 360,
                'bgcolor': 'background.paper',
                'position': 'relative',
                'overflow': 'auto',
                '& ul': {padding: 0},
              }}>
              {recipe.instructions.map((i) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary= {i}

                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Recipe;
