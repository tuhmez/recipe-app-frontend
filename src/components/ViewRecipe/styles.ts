import { makeStyles } from '@material-ui/core';

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
    height: 200,
    objectFit: 'contain',
    // maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    // width: '100%',
  },
}));
