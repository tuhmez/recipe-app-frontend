import { ThemeProvider } from '@material-ui/core';

import { theme } from '../app-styles';
import { RecipeImages } from '../components/RecipeImages';
import { exampleRecipe } from '../common/data';

const storyExport = {
  title: 'RecipeImages',
  component: RecipeImages
};

export default storyExport;

export const BaseRecipeImages = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeImages data={exampleRecipe.images} handleRemoveImage={() => console.log('')}/>
    </ThemeProvider>
  )
};
