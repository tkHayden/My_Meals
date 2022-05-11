import React, {useState} from 'react';
import {Dialog, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Recipe from './Recipe';
import Layout from '../Layout';


const RecipeModal = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog
    fullScreen
      open={true}
      onClose={handleClose}
    >
      <Layout>
      <Recipe>
      <Button onClick={() => handleClose()} variant='large' sx={{color: 'black'}}>
        Close Modal
      </Button>
      </Recipe>
      </Layout>

    </Dialog>
  );
};

export default RecipeModal;
