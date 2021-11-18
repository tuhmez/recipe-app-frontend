import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  // 64 px is the app bar height
  container: {
    maxHeight: 'calc(100vh - 64px)',
    paddingTop: `calc(64px + ${theme.spacing(2)}px)`
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    bottom: 20,
    right: 20,
    left: 'auto',
    margin: 0
  }
}));