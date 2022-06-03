import {Divider, Grid, List} from '@mui/material';
import {styled} from '@mui/material/styles';

export const GridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const InfoList = styled(List)({
  width: '95%',
  maxWidth: 390,
  bgcolor: 'background.paper',
  position: 'relative',
  overflow: 'auto',
  maxHeight: 300,
});

export const TitleDivider = styled(Divider)({
  width: '95%',
  maxWidth: 390,
  borderBottomWidth: 3,
  borderColor: '#E28657',
});
