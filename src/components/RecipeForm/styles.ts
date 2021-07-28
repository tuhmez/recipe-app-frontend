import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '150px'
  },
  input: {
    display: 'none'
  },
  ingredientContainer: {
    marginLeft: `${theme.spacing(2)} !important`
  }
}));