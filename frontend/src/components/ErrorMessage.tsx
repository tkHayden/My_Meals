import {Alert, AlertTitle, Box} from '@mui/material';
import {recipeContainer} from './RecipeView/RecipeList.style';

const ErrorMessage = () => {
  return (
    <Box sx={{...recipeContainer, width: '80%'}}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
      Unable to connect to the server at this time. Please try again later!
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
