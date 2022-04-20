import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import Link from '@mui/material/Link';
import {LinkBox} from './Footer.style.js';

const Footer = () => {
  return (
    <>
      <Box sx={{flexGrow: 1,
        mt: 15,
        boxShadow: '-1px -1px 10px',
        background: 'linear-gradient( #7AB2B9, #E28657)'}}>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={5} >
            <Typography variant='h6'sx={{textAlign: 'center', color: 'white'}}>
                My Meals
            </Typography>
            <Typography variant = 'body2'
              sx={{textAlign: 'center', color: 'white'}}>
              uses the Edamam API for recipes and nutrition data.
            </Typography>
            <Typography variant = 'body2'
              sx={{textAlign: 'center', color: 'white'}}>
            &#169; 2022 by Tyler Hayden
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant='h6' sx={{textAlign: 'center', color: 'white'}}>
                My Meals
            </Typography>
            <LinkBox>
              <Link variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline="hover">
                Home
              </Link>
            </LinkBox>
            <LinkBox>
              <Link variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline="hover">
                All Recipes
              </Link>
            </LinkBox>
            <LinkBox>
              <Link variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline="hover">
                My Grocery Lists
              </Link>
            </LinkBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
