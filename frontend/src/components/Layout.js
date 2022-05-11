import React from 'react';
import HeaderBar from './HeadBar';
import Footer from './Footer';
import Box from '@mui/material/Box';

const Layout = (props) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <HeaderBar/>
      {props.children}
      <Footer/>
    </Box>
  );
};

export default Layout;
