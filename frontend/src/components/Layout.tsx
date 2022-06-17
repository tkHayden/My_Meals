import React from 'react';
import HeaderBar from './HeadBar';
import Footer from './Footer';
import Box from '@mui/material/Box';

type Props = {
  children: JSX.Element;
};

const Layout = ({children}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        m: -1,
        backgroundColor: '#F1F7F8',
      }}
    >
      <HeaderBar />
      <Box
        sx={{
          mb: 11,
          ml: 2,
          mr: 2,
          minHeight: {xs: 100, sm: 400, md: 600, lg: 800},
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
