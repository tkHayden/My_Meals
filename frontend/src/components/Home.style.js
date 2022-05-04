import {styled} from '@mui/system';
import Typography from '@mui/material/Typography';

export const mainText = {
  textAlign: 'center',
  p: 3,
  maxWidth: 450,
  color: '#E28657',
  fontSize: {xs: 30, sm: 30, md: 40, lg: 45},
  fontFamily: ('Roboto', 'sans-serif'),
  fontWeight: 800,
  fontStyle: 'italic',
};

export const cardGrid = {
  display: 'flex',
  mt: {
    sm: 12,
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
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 9,
  ml: {
    lg: '-5%',
  },
};

export const CenterTypography = styled(Typography)({
  textAlign: 'center',
});

export const HomeContainer = {
  flexGrow: 1,
  pt: 10,
  pb: 15,
  mt: 0.2,
  backgroundColor: '#F1F7F8',
};
