import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { makeStyles, ThemeProvider } from '@material-ui/core'

interface Props {
  children: any;
  store: any;
  theme: any;
}

export const AppWrapper = (props: Props) => {
  // Props deconstruction
  const { children, store, theme } = props;
  // Styles
  const classes = makeStyles(theme => ({
    variantSuccess: {
      width: '10px'
    },
    variantError: {
      maxWidth: '100px'
    },
    containerRoot: {
      maxWidth: '50vw'
    }
  }))();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} classes={{ containerRoot: classes.containerRoot }}>
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
};
