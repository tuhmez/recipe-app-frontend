import { theme } from '../app-styles';
import { RecipeForm } from '../components/RecipeForm';
import { ThemeProvider } from '@material-ui/core';
import { emptyRecipe, exampleRecipe } from '../common/data';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import { combineReducers, createStore } from 'redux';

const store = createStore(combineReducers((state: any, action: any) => {}));

const storyExport = {
  title: 'RecipeForm',
  component: RecipeForm
};


export default storyExport;

export const BaseRecipeForm = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RecipeForm data={emptyRecipe} onCancelFormAction={action('onLeaveForm')} onSubmitFormAction={action('onSubmitForm')} enqueueSnackbar={action('enqueueSnackbar')}/>
      </ThemeProvider>

    </Provider>
  );
};

export const BaseRecipeFormEdit = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RecipeForm data={exampleRecipe} isEdit onCancelFormAction={action('onLeaveForm')} onSubmitFormAction={action('onSubmitForm')} enqueueSnackbar={action('enqueueSnackbar')}/>
      </ThemeProvider>
    </Provider>
  );
};
