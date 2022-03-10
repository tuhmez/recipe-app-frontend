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
    outline: 'black solid 0.5px',
    background: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0))'
  },
  image: {
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))',
    right: '4px',
    top: '4px',
    height: '45px',
    width: '150px',
  },
  imageButton: {
    float: 'right',
    color: theme.palette.common.white
  }
}));
