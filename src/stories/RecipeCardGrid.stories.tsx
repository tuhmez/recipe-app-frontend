import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import RecipeCardGrid from '../components/RecipeCardGrid';
import { ThemeProvider } from '@material-ui/core';
import { IRecipe } from '../common/types';
import { exampleRecipe, exampleRecipeNoImages } from '../common/data';

const storyExport = {
  title: 'RecipeCardGrid',
  component: RecipeCardGrid
};

export default storyExport;

export const baseRecipeCard = () => {
  let recipes: IRecipe[] = [];
  const numberRecipeEntries = Math.random() * 10;
  for (let i = 0; i < numberRecipeEntries; i += 1) {
    const fiftyFiftyRand = Math.random();
    if (fiftyFiftyRand >= 0.50) {
      recipes.push(exampleRecipe);
    } else {
      recipes.push(exampleRecipeNoImages);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <RecipeCardGrid
        recipes={recipes}
        theme={theme}
        handleCardClick={action('handleCardClickAction')}
        handleOnFavoriteToggle={action('handleOnFavoriteToggleAction')}
      />
    </ThemeProvider>
  )
};
