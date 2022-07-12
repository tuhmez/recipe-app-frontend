import { IIssue, IRecipe } from "./common/types";

type RecipeState = {
  recipes: IRecipe[];
  issues: IIssue[];
  searchTerm: string;
  isLoading: boolean;
  error: string;
  filters: { [key: string]: { [key: string]: boolean }};
  sort: { [key: string]: boolean };
};

type AddRecipeAction = {
  type: string;
  recipe: IRecipe;
};

type AddRecipeActionSuccess = {
  type: string;
  recipe: IRecipe;
}

type AddRecipeActionFailure = {
  type: string;
  error: string;
}

type AddDistpatchType = (args: AddRecipeAction | AddRecipeAction | AddRecipeActionFailure | AddRecipeActionSuccess) => AddRecipeAction | AddRecipeActionFailure | AddRecipeActionSuccess;

type GetRecipeAction = {
  type: string;
  id: string
}

type GetRecipeActionSuccess = {
  type: string;
  recipe: RecipeMessage;
}

type GetRecipeActionFailure = {
  type: string;
  error: string;
}

type GetDispatchType = (args: GetRecipeAction | GetRecipeActionFailure | GetRecipeActionSuccess) => GetRecipeAction | GetRecipeActionFailure | GetRecipeActionSuccess;

type GetAllRecipesAction = {
  type: string;
}

type GetAllRecipesActionSuccess = {
  type: string;
  recipes: RecipeMessage[];
}

type GetAllRecipesActionFailure = {
  type: string;
  error: string;
}

type GetAllDispatchType = (args: GetAllRecipesAction | GetAllRecipesActionFailure | GetAllRecipesActionSuccess) => GetAllRecipesAction | GetAllRecipesActionFailure | GetAllRecipesActionSuccess;

type UpdateRecipeAction = {
  type: string;
  recipe: RecipeMessage;
}

type UpdateRecipeActionSuccess = {
  type: string;
  recipe: RecipeMessage;
}

type UpdateRecipeActionFailure = {
  type: string;
  error: string;
}

type UpdateDispatchType = (args: UpdateRecipeAction | UpdateRecipeActionFailure | UpdateRecipeActionSuccess) => UpdateRecipeAction | UpdateRecipeActionFailure | UpdateRecipeActionSuccess;

type DeleteRecipeAction = {
  type: string;
  id: string;
}

type DeleteRecipeActionSuccess = {
  type: string;
  id: string;
}

type DeleteRecipeActionFailure = {
  type: string;
  error: string;
}

type DeleteDispatchType = (args: DeleteRecipeAction | DeleteRecipeActionFailure | DeleteRecipeActionSuccess) => DeleteRecipeAction | DeleteRecipeActionFailure | DeleteRecipeActionSuccess;
