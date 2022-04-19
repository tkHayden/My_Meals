import React from 'react';
import Box from '@mui/material/Box';
import image from '../background.png';
import foodImg from '../food.jpg';
import groceryImg from '../GroceryList.jpeg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import {mainText, cardGrid, cardPic} from './Home.style.js';
import Button from '@mui/material/Button';
import HeaderBar from './HeadBar';

const Home = () => {
  return (
    <>
      <HeaderBar/>
      <Box sx={{flexGrow: 1, pt: 6}}>
        <Grid container spacing={{xs: 4, sm: 1}}>
          <Grid item xs={12} sm={5}
            sx={{
              ml: 5,
              height: {xs: 200, sm: 300, md: 350, lg: 400},
              backgroundImage: `url(${image})`,
              backgroundPosition: {xs: 'center', sm: 'right'},
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}>
          </Grid>
          <Grid item xs={12} sm={6} sx={{
            height: 200, display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <Typography variant='h3'
              sx={{...mainText}}>
              Search For Delicious Recipes and More!
            </Typography>
            <Button variant="contained" size="large" color= 'primary'
              sx={{width: 200, fontFamily: ('Roboto'), mt: 3}}>
              Search Recipes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}
            sx={{...cardGrid,
              justifyContent: {xs: 'center', md: 'flex-end'},
            }}>
            <Card sx={{maxWidth: 450, m: 2}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{...cardPic}}
                  image={foodImg}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
            Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}
            sx={{...cardGrid,
              justifyContent: {xs: 'center', md: 'flex-start'},
            }}>
            <Card sx={{maxWidth: 450, m: 2}}>
              <CardActionArea>
                <CardMedia
                  sx={{...cardPic}}
                  component="img"
                  image={groceryImg}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
            Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Home;
