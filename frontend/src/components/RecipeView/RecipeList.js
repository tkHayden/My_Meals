import React from 'react';
import {recipeCard, recipeTitle, recipeContainer} from './RecipeList.style';
import {Box, Grid, Typography, Card,
  CardContent, CardMedia, Divider} from '@mui/material';

const RecipeList = (props) => {
  const featuredList = () => {
    console.log(props);
    return (
      <>
        {props.recipes.map((recipe) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.title}>
              <Card
                sx={{...recipeCard}}>
                <CardMedia
                  component="img"
                  height='200'
                  image= {recipe.image}
                  alt= {`picture of ${recipe.title}`}
                />
                <Divider/>
                <CardContent >
                  <Typography variant="h6" component="div"
                    sx={{...recipeTitle}}>
                    {recipe.title.length > 45 ?
                     `${recipe.title.substring(0, 45)}...` :
                      recipe.title }
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <Box sx={{...recipeContainer}}>
      <Grid container spacing={1}
        sx={{width: {xs: '100%', md: '90%', xl: 1500}}}>
        <Grid item xs={12} sx={{mb: 3}}>
          <Typography variant='h3'sx={{textAlign: 'center'}}>
            {props.header}
          </Typography>
          <Divider />
        </Grid>
        {featuredList()}
      </Grid>

    </Box>
  );
};
export default RecipeList;
