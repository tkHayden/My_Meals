import React from 'react';
import {Box, Grid, Typography, Card, CardActionArea,
  CardContent, CardMedia, Divider} from '@mui/material';
import {keyframes} from '@mui/system';

const RecipeList = (props) => {
  const spin = keyframes`
  from {
    transform: translateY(2%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 2
  }
`;
  const featuredList = () => {
    console.log(props);
    return (
      <>
        {props.recipes.map((i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i.title}>
              <Card
                sx={{'maxWidth': '90%',
                  'backgroundColor': '#FAFAFA',
                  'height': {xs: 280, sm: 290, md: 300, lg: 310}, 'm': 2, ':hover': {boxShadow: 20}}}>
                <CardMedia
                  component="img"
                  height='200'
                  image= {i.image}
                  alt="green iguana"
                />
                <Divider/>
                <CardContent >
                  <Typography variant="h6" component="div"
                    sx={{textAlign: 'center', fontSize: {xs: 16, sm: 17, md: 18, lg: 20}}}>
                    {i.title.length > 45 ? `${i.title.substring(0, 45)}...` : i.title }
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
    <Box sx={{display: 'flex', justifyContent: 'center', animation: `${spin} 2s ease`}}>
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
