import {styled} from '@mui/system';
import Typography from '@mui/material/Typography';

export const mainText = {
  textAlign: 'center',
  p: 3,
  maxWidth: 450,
  color: '#E28657',
  fontSize: {xs: 30, sm: 30, md: 40, lg: 45},
  fontFamily: 'Roboto sans-serif',
  fontWeight: 800,
  fontStyle: 'italic',
  mt: {xs: 1, md: 8},
};

export const cardGrid = {
  display: 'flex',
  mt: {
    sm: 7,
  },
};

export const cardPic = {
  height: {
    xs: 180,
    sm: 200,
    md: 250,
  },
};

export const searchBox = {
  maxWidth: '100%',
  height: '67vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

};

export const CenterTypography = styled(Typography)({
  textAlign: 'center',
});

export const HomeContainer = {
  flexGrow: 1,
  pb: 10,
  width: '100%',
  backgroundColor: '#F1F7F8',
};
