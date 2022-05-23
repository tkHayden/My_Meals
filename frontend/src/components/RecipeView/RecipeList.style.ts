import {keyframes} from '@mui/system';

export const fadeUp = keyframes`
from {
  transform: translateY(2%);
  opacity: 0;
}
to {
  transform: translateX(0%);
  opacity: 2
}
`;

export const recipeCard = {
  'maxWidth': '90%',
  'backgroundColor': '#FAFAFA',
  'height': {
    xs: 280,
    sm: 290,
    md: 300,
    lg: 310,
  },
  'm': 2,
  ':hover': {
    boxShadow: 20,
  },
};

export const recipeTitle = {
  textAlign: 'center',
  fontSize: {
    xs: 16,
    sm: 17,
    md: 18,
    lg: 20,
  },
};

export const recipeContainer = {
  display: 'flex',
  justifyContent: 'center',
  animation: `${fadeUp} 2s ease`,
};
