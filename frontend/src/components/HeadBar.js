import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth0} from '@auth0/auth0-react';

const HeaderBar = () => {
  const {isAuthenticated, isLoading, logout, loginWithRedirect} = useAuth0();

  return (
    <Box sx={{flexGrow: 1, boxShadow: '1px 2px 2px gray'}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          {isAuthenticated || isLoading ?
           <Button
             variant="contained"
             color='secondary'
             size='small'
             onClick={() => logout({returnTo: window.location.origin})}>
               Logout
           </Button> :
            <Button
              variant="contained"
              color='secondary'
              size='small'
              onClick={() => loginWithRedirect()}>
                Login
            </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
