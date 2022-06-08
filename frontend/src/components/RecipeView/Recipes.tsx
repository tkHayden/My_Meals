import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {mainText} from '../Home.style';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {keyframes} from '@mui/system';
import {useSearchUpdate} from '../Provider/SearchProvider';

const Recipes = () => {
  const [searchValue, setSearchValue] = useState('');
  const updateQuery = useSearchUpdate();
  const navigate = useNavigate();
  const onSearch = () => {
    console.log(searchValue);
    updateQuery(searchValue);
    navigate({
      pathname: 'results',
    });
  };
  const spin = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        minHeight: '83vh',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `${spin}`,
      }}
    >
      <Typography
        variant='h2'
        sx={{...mainText, maxWidth: 700, animation: `${spin} 1s ease`}}
      >
        Search through a diverse collection of recipes!
      </Typography>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignContent: 'center',
          width: 300,
          mb: 10,
        }}
      >
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder='Search Recipes...'
          inputProps={{'aria-label': 'search recipes'}}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton sx={{p: '10px'}} aria-label='search' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Outlet />
    </Box>
  );
};
export default Recipes;
