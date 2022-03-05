import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '180px',
  },
  favoritedCard: {
    width: '180px',
    borderColor: red[500]
  },
  media: {
    height: 100,
  },
  favoriteIcon: {
    color: red[500]
  }
}));
