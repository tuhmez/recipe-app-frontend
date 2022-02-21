export const possibleRoutes = {
  main: '/',
  recipes: '/recipes',
  createRecipePage: '/recipes/create-recipe',
  editRecipePage: '/recipes/edit-recipe/:recipeName',
  viewRecipePage: '/recipes/view-recipe/:recipeName',
  about: '/about',
};

export const viewRecipePageNavigator = (recipeName: string) => `/recipes/view-recipe/${recipeName}`;
export const editRecipePageNavigator = (recipeName: string) => `/recipes/edit-recipe/${recipeName}`;
