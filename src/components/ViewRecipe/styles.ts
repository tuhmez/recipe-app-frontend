import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  gridContainer: {
    width: '99vw'
  },
  root: {
    maxWidth: 400,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  stepper: {
    width: '250px',
  },
  img: {
    height: 'auto',
    width: '80vw',
    maxHeight: '50vh',
    maxWidth: '1248px',
    objectFit: 'contain',
    overflow: 'hidden',
    display: 'block',
  },
  favoriteIcon: {
    color: red[500],
  },
  stepText: {
    fontWeight: 'bold'
  }
}));
