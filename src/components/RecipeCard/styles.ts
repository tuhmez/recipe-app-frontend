import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '180px'
  },
  media: {
    height: 100,
  },
  favoriteIcon: {
    color: red[500]
  }
}));
