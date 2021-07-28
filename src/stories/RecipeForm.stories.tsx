import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import RecipeForm from '../components/RecipeForm';
import { ThemeProvider } from '@material-ui/core';

import { recipeExample, recipeExampleNoImages } from '../utilities';
import { RecipeMessage } from '../proto/recipe_pb';

const storyExport = {
  title: 'RecipeForm',
  component: RecipeForm
};

export default storyExport;

export const baseRecipeForm = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeForm data={new RecipeMessage().toObject()}/>
    </ThemeProvider>
  )
};
