import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    minWidth: '30vw',
    width: '350px',
    maxWidth: '85vw'
  },
  issueName: {
    maxWidth: '90%'
  },
  noIssuesTextContainer: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    '-ms-transform': 'translate(-50%, -50%)',
    'transform': 'translate(-50%, -50%)',
  },
  noIssuesText: {
    fontStyle: 'italic'
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    bottom: 20,
    right: 20,
    left: 'auto',
    margin: 0,
    boxShadow: 'none'
  },
}));
