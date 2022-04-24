import React from 'react';
import {Box, Grid, Typography, Card, CardActionArea,
  CardContent, CardMedia} from '@mui/material';

const RecipeList = (props) => {
  const featuredList = () => {
    console.log(props);
    return (
      <>
        {props.recipes.map((i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i.title}>
              <Card
                sx={{maxWidth: '90%',
                  height: {xs: 300, sm: 300, md: 350, lg: 350}, m: 2}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height='200'
                    image= {i.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div"
                      sx={{textAlign: 'center'}}>
                      {i.title}
                    </Typography>
                    <Typography variant="caption text" component="div"
                      sx={{textAlign: 'center'}}>
                      Calories: 30
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Grid container spacing={1}
        sx={{width: {xs: '100%', md: '90%', xl: 1500}}}>
        <Grid item xs={12}>
          <Typography variant='h4'sx={{textAlign: 'center'}}>
            {props.header}
          </Typography>
        </Grid>
        {featuredList()}
      </Grid>

    </Box>
  );
};
export default RecipeList;
