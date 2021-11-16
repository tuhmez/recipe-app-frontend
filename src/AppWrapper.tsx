import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core'

interface Props {
  children: any;
  store: any;
  theme: any;
}

export const AppWrapper = (props: Props) => {
  // Props deconstruction
  const { children, store, theme } = props;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
};
