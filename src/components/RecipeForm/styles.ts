import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 375,
    paddingBottom: theme.spacing(2),
  },
  elementContainer: {
    maxWidth: 400,
    maxHeight: 200,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  ingredientElement: {
    paddingBottom: theme.spacing(1)
  },
  formControl: {
    minWidth: '150px'
  },
  input: {
    display: 'none'
  },
  ingredientContainer: {
    marginLeft: `${theme.spacing(2)} !important`
  },
  ingredientName: {
    maxWidth: 110,
  },
  ingredientMeasurement: {
    maxWidth: 65,
  },
  ingredientUnit: {
    minWidth: 132.8,
  }
}));