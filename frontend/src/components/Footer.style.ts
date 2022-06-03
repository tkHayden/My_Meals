import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export const LinkBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const FooterLink = styled(Link)({
  textAlign: 'center',
  color: 'white',
});
