import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import {LinkBox, FooterLink} from './Footer.style';
import {useNavigate} from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          boxShadow: '-1px -1px 10px',
          background: 'linear-gradient( #7AB2B9, #E28657)',
          width: '100%',
        }}
      >
        <Grid container spacing={1} sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Grid item xs={12} sm={5}>
            <Typography
              variant='h6'
              sx={{textAlign: 'center', color: 'white'}}
            >
              My Meals
            </Typography>
            <Typography
              variant='body2'
              sx={{textAlign: 'center', color: 'white'}}
            >
              uses the Spoonacular API for recipes and nutrition data.
            </Typography>
            <Typography
              variant='body2'
              sx={{textAlign: 'center', color: 'white'}}
            >
              &#169; 2022 by Tyler Hayden
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography
              variant='h6'
              component='div'
              sx={{textAlign: 'center', color: 'white'}}
            >
              My Meals
            </Typography>
            <LinkBox>
              <FooterLink
                variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline='hover'
                onClick={() => navigate('/')}
              >
                Home
              </FooterLink>
            </LinkBox>
            <LinkBox>
              <FooterLink
                variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline='hover'
                onClick={() => navigate('/recipes')}
              >
                All Recipes
              </FooterLink>
            </LinkBox>
            <LinkBox>
              <FooterLink
                variant='subtitle2'
                sx={{textAlign: 'center', color: 'white'}}
                underline='hover'
              >
                My Grocery Lists
              </FooterLink>
            </LinkBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
