import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  // 64 px is the app bar height
  container: {
    maxHeight: 'calc(100vh - 64px)',
    marginTop: `calc(64px + 36px + ${theme.spacing(1)}px)`,
    overflow: 'auto'
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    bottom: 20,
    right: 20,
    left: 'auto',
    margin: 0
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}));