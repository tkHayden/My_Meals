import React from 'react';
import HeaderBar from './HeadBar';
import Footer from './Footer';
import {Box, Grid, Typography, Card, CardActionArea,
  CardContent, CardMedia} from '@mui/material';
import {mainText} from './Home.style';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';


const Recipes = () => {
  const featuredList = () => {
    const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <>
        {list.map((i) => {
          return (
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card sx={{maxWidth: 300, m: 2}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height='200'
                    image= 'https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLWVhc3QtMSJHMEUCIEzXhFSwskRBgD34pnXfI5ZLqfsa6B0QQ4uvX0a0wfiPAiEA5AO7mzEJLhP%2BGX%2BCFXKc%2FWIvJTVXtUJVLj%2BRzizzQIIq%2BgMIHhAAGgwxODcwMTcxNTA5ODYiDKhxUr8tKwWB56nILirXAyVK%2FAtD8Kz9jNJzuRmfpnkZBII%2Bk1lJX8cVkBkNBvLVn9YlUTdCQD7N0b6ma8SOG%2F9NWIycBcujIyYHXcJ8Adb7HEINMSXPuQY2HNZbG%2FoYhlOb%2B50DZiM3xq82QpCryuT59EU66l2WrRr8Rg3IU2hTomQeG%2BLEpV59KVdvJyBYZ97JlatS%2BGkKTCVLGD%2BkIjY%2BqMZ5vSy2rIqtlXLOEaPjlizw7lyCqKrlJi5no%2FZHaDJgLhAnfga8Cxc1aUblabm8KB5YNzUIAqD7unbIXxKCdPd9z2Y2iyyVzpQXK2ADgrJjx09ae1YmRwMBztKJQ5YW2ZBusnoYp%2FkPJasN6MKgIvzMj38JqIXgkhmyTYO7HoXH0fR5rMRo6%2F3U2O30%2FXlQ69H7LTF2JEE9rH0g3PVyEiYRrUnw9G9%2F2z%2BSugCWsaaLIXepkQbJm3A9wzJaB3AUhjxTct1roXk9NgzsaxOt3AMnegOLqh9FhNmnPvAyexSQ5bYp%2F0%2FrPYVRAVIoCv5EzgWttJFhWzgsC6XR6NZxY526qcqD%2FOAg41Q3DcTzjp%2B46GJdeQ3VR7cky8ZwoIvG4W3a5bsuiwzIE%2BWXfo0uXdeaeCQ317x4mhVgCKb9jbsdNl7%2BcDDI5IGTBjqlAfsEuqsTQr7OolUK5ylpzVyRIhtmRW6fZAEww9Isxa9qhVn6TEQBOoa96gFur3Z9nPjnIul5U1FC7l6aqf6XwmffuSoXzbU%2FEbDHmvtPm0xmfzLExT85gZeNJJ0nn%2FYWc8waQzhRadufhs8y2TaTE%2FiksNy0UeWbiQoGXmbecFQY04aSq5CWbGeh1hmLoqPRADehYqELF2sBD2c5%2Bw5nHpvQ5qU9dw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220420T214042Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFH2KWZGFF%2F20220420%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e1b4ec967709020fbeb89bcded9adba3fe3ff764e063946961d0ec3d9ad92929'
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                Food
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
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <HeaderBar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'}}>
        <Typography variant='h2' sx={{...mainText, maxWidth: 700}}>
        Search through the diverse collection of recipes!
        </Typography>
        <Paper
          component="form"
          sx={{p: '2px 4px', display: 'flex',
            alignContent: 'center', width: 300}}
        >
          <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder="Search Recipes..."
            inputProps={{'aria-label': 'search recipes'}}
          />
          <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
            <SearchIcon />
          </IconButton>

        </Paper>
        <Box sx={{}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h4'sx={{textAlign: 'center'}}>
                Featured Recipes
              </Typography>
            </Grid>
            {featuredList()}
          </Grid>

        </Box>

      </Box>
      <Footer/>
    </Box>
  );
};
export default Recipes;
