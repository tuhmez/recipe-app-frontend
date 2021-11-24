import { ThemeProvider } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { theme } from '../app-styles';
import { ViewRecipe } from '../components/ViewRecipe';
import { exampleRecipe, exampleRecipeMultipleImages, exampleRecipeNoImages } from '../common/data';

const storyExport = {
  title: 'ViewRecipe',
  component: ViewRecipe
};

export default storyExport;

export const BaseViewRecipe = () => {
  return (
    <ThemeProvider theme={theme}>
      <ViewRecipe
        recipe={exampleRecipeMultipleImages}
        onHandleEditRecipe={action('onHandleEditRecipe')}
        onHandleDeleteRecipe={action('onHandleDeleteRecipe')}
      />
    </ThemeProvider>
  );
};

export const OneImageViewRecipe = () => {
  return (
    <ThemeProvider theme={theme}>
      <ViewRecipe
        recipe={exampleRecipe}
        onHandleEditRecipe={action('onHandleEditRecipe')}
        onHandleDeleteRecipe={action('onHandleDeleteRecipe')}
      />
    </ThemeProvider>
  );
};

export const NoImageViewRecipe = () => {
  return (
    <ThemeProvider theme={theme}>
      <ViewRecipe
        recipe={exampleRecipeNoImages}
        onHandleEditRecipe={action('onHandleEditRecipe')}
        onHandleDeleteRecipe={action('onHandleDeleteRecipe')}
      />
    </ThemeProvider>
  );
};
