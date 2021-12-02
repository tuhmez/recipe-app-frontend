export const possibleRoutes = {
  main: '/',
  createRecipePage: '/create-recipe',
  editRecipePage: '/edit-recipe/:recipeName',
  viewRecipePage: '/view-recipe/:recipeName'
};

export const viewRecipePageNavigator = (recipeName: string) => `/view-recipe/${recipeName}`;
export const editRecipePageNavigator = (recipeName: string) => `/edit-recipe/${recipeName}`;
