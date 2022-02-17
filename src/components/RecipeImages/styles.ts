import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    width: '80vw',
    borderRadius: theme.shape.borderRadius
  },
  imagePreview: {
    width: '150px',
    height: 'auto',
    outline: 'black solid 0.5px'
  }
}));
