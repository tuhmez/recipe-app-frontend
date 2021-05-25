import React from 'react';
import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import RecipeCard from '../components/RecipeCard';
import { ThemeProvider } from '@material-ui/core';

import { recipeExample, recipeExampleNoImages } from '../utilities';

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
        recipe={recipeExample.toObject()}
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
        recipe={recipeExampleNoImages.toObject()}
        theme={theme}
      />
    </ThemeProvider>
  )
};
