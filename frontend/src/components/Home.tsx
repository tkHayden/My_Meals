import React from 'react';
import Box from '@mui/material/Box';
import image from '../dinner.jpg';
import foodImg from '../food.jpg';
import smallerImg from '../smallerBG.jpg';
import groceryImg from '../GroceryList.jpeg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import {
  mainText,
  cardGrid,
  cardPic,
  searchBox,
  CenterTypography,
  HomeContainer,
} from './Home.style';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{...HomeContainer}}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            ...searchBox,
            backgroundImage: {xs: `url(${smallerImg})`, md: `url(${image})`},
            backgroundPosition: {xs: 'center'},
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Typography variant='h3' sx={{...mainText}}>
            Search For Delicious Recipes and More!
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{color: 'gray', maxWidth: 400, textAlign: 'center'}}
          >
            Search for new recipes, create new grocery list and customize your
            grocery list by adding your favorite recipes.
          </Typography>
          <Button
            variant='contained'
            size='large'
            color='primary'
            sx={{width: 200, fontFamily: 'Roboto', mt: 3}}
            onClick={() => navigate('/recipes')}
          >
            Search Recipes
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{...cardGrid, justifyContent: {xs: 'center', md: 'flex-end'}}}
        >
          <Card sx={{maxWidth: 450, m: 2}}>
            <CardActionArea>
              <CardMedia
                component='img'
                sx={{...cardPic}}
                image={foodImg}
                alt='green iguana'
              />
              <CardContent>
                <CenterTypography gutterBottom variant='h5'>
                  Search for Recipes
                </CenterTypography>
                <CenterTypography variant='body2' color='text.secondary'>
                  Search through a diverse selection of recipes. Type in
                  whatever your appetite desires and see what delicious recipes
                  are to be tried!
                </CenterTypography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            ...cardGrid,
            justifyContent: {xs: 'center', md: 'flex-start'},
          }}
        >
          <Card sx={{maxWidth: 450, m: 2}}>
            <CardActionArea>
              <CardMedia
                sx={{...cardPic}}
                component='img'
                image={groceryImg}
                alt='green iguana'
              />
              <CardContent>
                <CenterTypography
                  gutterBottom
                  variant='h5'
                  sx={{textAlign: 'center'}}
                >
                  Create Grocery Lists
                </CenterTypography>
                <CenterTypography
                  variant='body2'
                  color='text.secondary'
                  sx={{textAlign: 'center'}}
                >
                  As a user, you can create new grocery lists and customize your
                  existing grocery lists. Add your favorite recipes that you
                  have discovered to your grocery lists.
                </CenterTypography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Typography></Typography>
    </Box>
  );
};

export default Home;
