import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import { RecipeCardGrid } from '../components/RecipeCardGrid';
import { ThemeProvider } from '@material-ui/core';
import { IRecipe } from '../common/types';
import { exampleRecipe, exampleRecipeNoImages } from '../common/data';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(combineReducers({ global: (state: any, action: any) => ({ searchTerm: ''})}));

const storyExport = {
  title: 'RecipeCardGrid',
  component: RecipeCardGrid
};

export default storyExport;

export const baseRecipeGrid = () => {
  let recipes: IRecipe[] = [];
  let numberRecipeEntries = Math.floor(Math.random() * 10);
  if (numberRecipeEntries === 0) numberRecipeEntries = 1;

  for (let i = 0; i < numberRecipeEntries; i += 1) {
    const fiftyFiftyRand = Math.random();
    if (fiftyFiftyRand >= 0.50) {
      recipes.push(exampleRecipe);
    } else {
      recipes.push(exampleRecipeNoImages);
    }
  }
  const filterTypes = {
    Favorites: {
        Favorited: false,
        'Not Favorited': false
    },
    Difficulty: {
        Easy: false,
        Medium: false,
        Hard: false
    },
    Type: {
        Breakfast: false,
        Lunch: false,
        Dinner: false,
        Appetizer: false,
        Snack: false,
        Drink: false
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RecipeCardGrid
          recipes={recipes}
          theme={theme}
          handleCardClick={action('handleCardClickAction')}
          filter={filterTypes}
        />
      </ThemeProvider>
    </Provider>
  )
};

export const emptyRecipeGrid = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RecipeCardGrid
          recipes={[]}
          theme={theme}
          handleCardClick={action('handleCardClickAction')}
        />
      </ThemeProvider>
    </Provider>
  )
};
