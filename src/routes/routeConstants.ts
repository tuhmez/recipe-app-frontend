export const possibleRoutes = {
  main: '/',
  recipes: '/recipes',
  createRecipePage: '/recipes/create-recipe',
  editRecipePage: '/recipes/edit-recipe/:recipeId',
  viewRecipePage: '/recipes/view-recipe/:recipeId',
  about: '/about',
  issues: '/issues'
};

export const viewRecipePageNavigator = (recipeId: string) => `/recipes/view-recipe/${recipeId}`;
export const editRecipePageNavigator = (recipeId: string) => `/recipes/edit-recipe/${recipeId}`;
