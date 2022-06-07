import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth0} from '@auth0/auth0-react';
import {Stack} from '@mui/material';
import {HeaderTextButton} from './Home.style';

const HeaderBar = () => {
  const {
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  console.log(user);

  React.useEffect(() => {
    (async () => {
      if (user) {
        try {
          const token = await getAccessTokenSilently();
          console.log(token);
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <Box sx={{width: '100%'}}>
      <AppBar position='static'>
        <Toolbar sx={{flexGrow: 1, justifyContent: 'space-between'}}>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{mr: 2}}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h5'
              color='white'
              sx={{display: {xs: 'none', md: 'block'}}}
            >
              MyMeals
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={{sm: 0, md: 3}}
            sx={{display: {xs: 'none', md: 'block'}}}
          >
            <HeaderTextButton>
              <Typography variant='h6' >
                Home
              </Typography>
            </HeaderTextButton>
            <HeaderTextButton >
              <Typography variant='h6' >
                Find Recipes
              </Typography>
            </HeaderTextButton>
            <HeaderTextButton>
              <Typography variant='h6'>
                My Grocey List
              </Typography>
            </HeaderTextButton>
          </Stack>
          <Typography
            variant='h5'
            color='white'
            sx={{display: {xs: 'block', md: 'none'}}}
          >
            MyMeals
          </Typography>
          {isAuthenticated || isLoading ? (
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={() => logout({returnTo: window.location.origin})}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
