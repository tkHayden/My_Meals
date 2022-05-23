import React from 'react';
import HeaderBar from './HeadBar';
import Footer from './Footer';
import Box from '@mui/material/Box';

type Props = {
  children: JSX.Element,
};

const Layout = ({children} : Props) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', m: -1}}>
      <HeaderBar/>
      {children}
      <Footer/>
    </Box>
  );
};

export default Layout;
