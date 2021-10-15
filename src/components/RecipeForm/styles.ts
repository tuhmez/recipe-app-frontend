import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 375,
    paddingBottom: theme.spacing(2)
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
    maxWidth: 120,
  },
  ingredientMeasurement: {
    maxWidth: 50,
  },
  ingredientUnit: {
    minWidth: 132.8,
  }
}));