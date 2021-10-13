import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import RecipeCard from '../components/RecipeCard';
import { ThemeProvider } from '@material-ui/core';
import { exampleRecipe, exampleRecipeNoImages } from '../common/data';

const storyExport = {
  title: 'RecipeCard',
  component: RecipeCard
};

export default storyExport;

export const baseRecipeCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeCard
        onCardClick={action('onCardClickAction')}
        onFavoriteToggle={action('onFavoriteToggleAction')}
        recipe={exampleRecipe}
        theme={theme}
      />
    </ThemeProvider>
  )
};

export const emptyImageRecipeCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecipeCard
        onCardClick={action('onCardClickAction')}
        onFavoriteToggle={action('onFavoriteToggleAction')}
        recipe={exampleRecipeNoImages}
        theme={theme}
      />
    </ThemeProvider>
  )
};
