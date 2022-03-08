import { createSelector } from '@reduxjs/toolkit';
import { RecipeState } from '../type';

export const globalState = (state: any) => state.global;

export const selectIsLoading = createSelector(
  globalState,
  (state: RecipeState) => state.isLoading
);

export const selectRecipes = createSelector(
  globalState,
  (state: RecipeState) => state.recipes
);

export const selectError = createSelector(
  globalState,
  (state: RecipeState) => state.error
);

export const selectSearchTerm = createSelector(
  globalState,
  (state: RecipeState) => state.searchTerm
);

export const selectIssues = createSelector(
  globalState,
  (state: RecipeState) => state.issues
);
