import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  table: {
    paddingBottom: theme.spacing(2),
  },
  elementContainer: {
    maxHeight: 200,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  element: {
    background: theme.palette.grey[200],
    borderRadius: '20px',
    maxWidth: '95%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: '150px'
  },
  input: {
    display: 'none'
  },
  chipPaper: {
    padding: theme.spacing(1),
    borderRadius: 25
  },
  chipSubGrid: {
    maxWidth: '75%'
  },
  errorText: {
    color: theme.palette.error.main
  },
  errorHelperText: {
    fontSize: '0.75em',
    color: theme.palette.error.main,
    marginLeft: '14px',
    marginRight: '14px'
  },
  favoriteIcon: {
    color: red[500]
  },
  stepDialog: {
    minWidth: '280px',
    width: '300px',
    height: '225px',
    maxHeight: '225px'
  },
  ingredientDialog: {
    minWidth: '280px',
    width: '300px',
    height: '200px',
    maxHeight: '200px'
  }
}));