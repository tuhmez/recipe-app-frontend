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
    display: 'block',
    height: 100,
  },
  favoriteIcon: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    color: red[500]
  },
  favoriteBanner: {
    position: 'absolute',
    top: '-5px',
    right: '-20px',
    width: 0,
    height: 0,
    borderLeft: '30px solid black',
    borderRight: '30px solid black',
    
    borderBottom: `30px solid black`,
    transform: 'rotate(45deg)'
  }
}));
