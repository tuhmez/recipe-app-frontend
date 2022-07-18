import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    position: 'relative',
  },
  additionalButtonsContainer: {
    position: 'fixed',
    top: '50px',
    width: '95vw',
    height: '50px',
    backgroundColor: theme.palette.background.default,
    zIndex: 100,
  },
  optionsButton: {
    marginTop: theme.spacing(2),
    float: 'right',
    position: 'fixed',
    right: '25px',
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
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '56px',
  },
  divider: {
    marginBottom: theme.spacing(0.5)
  },
  listItem: {
    paddingLeft: '48px'
  },
  listIcon: {
    minWidth: '32px'
  },
  chipList: {
    display: 'flex',
    flexDirection: 'column',
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  resetButton: {
    width: '100%',
  },
  expandedAccordion: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.divider} !important`,
    },
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider} !important`
    }
  },
}));
