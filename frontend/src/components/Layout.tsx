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
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        m: -1,
        backgroundColor: 'white',
      }}
    >
      <HeaderBar />
        {children}
      <Footer />
    </Box>
  );
};

export default Layout;
