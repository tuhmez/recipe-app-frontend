import { theme } from '../app-styles';
import RecipeForm from '../components/RecipeForm';
import { ThemeProvider } from '@material-ui/core';
import { exampleRecipe } from '../common/data';

const storyExport = {
  title: 'RecipeForm',
  component: RecipeForm
};

export default storyExport;

export const baseRecipeForm = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeForm data={exampleRecipe}/>
    </ThemeProvider>
  )
};
