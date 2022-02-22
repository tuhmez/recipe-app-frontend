import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  companyImages: {
    maxWidth: '70%',
    height: 'auto',
  },
  selfImage: {
    height: '250px',
    width: 'auto',
  },
  divider: {
    width: '50vw',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));