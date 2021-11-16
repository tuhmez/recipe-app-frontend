import { theme } from '../app-styles';
import { RecipeForm } from '../components/RecipeForm';
import { ThemeProvider } from '@material-ui/core';
import { emptyRecipe, exampleRecipe } from '../common/data';
import { action } from '@storybook/addon-actions';

const storyExport = {
  title: 'RecipeForm',
  component: RecipeForm
};

export default storyExport;

export const BaseRecipeForm = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeForm data={emptyRecipe} onCancelFormAction={action('onLeaveForm')} onSubmitFormAction={action('onSubmitForm')}/>
    </ThemeProvider>
  );
};

export const BaseRecipeFormEdit = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeForm data={exampleRecipe} isEdit onCancelFormAction={action('onLeaveForm')} onSubmitFormAction={action('onSubmitForm')}/>
    </ThemeProvider>
  );
};
