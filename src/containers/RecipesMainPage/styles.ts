import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  topButtonGroup: {
    position: 'fixed',
    right: 20,
    left: 'auto',
    top: 60,
    bottom: 'auto',
    marginTop: theme.spacing(1),
    zIndex: 100,
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
    marginTop: 'auto'
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
