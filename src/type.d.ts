import { RecipeMessage } from "./proto/recipe_pb";

type RecipeState = {
  recipes: RecipeMessage.AsObject[];
  isLoading: boolean;
  error: string;
};

type AddRecipeAction = {
  type: string;
  recipe: RecipeMessage.AsObject;
};

type AddRecipeActionSuccess = {
  type: string;
  recipe: RecipeMessage.AsObject;
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
  recipe: RecipeMessage.AsObject;
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
  recipes: RecipeMessage.AsObject[];
}

type GetAllRecipesActionFailure = {
  type: string;
  error: string;
}

type GetAllDispatchType = (args: GetAllRecipesAction | GetAllRecipesActionFailure | GetAllRecipesActionSuccess) => GetAllRecipesAction | GetAllRecipesActionFailure | GetAllRecipesActionSuccess;

type UpdateRecipeAction = {
  type: string;
  recipe: RecipeMessage.AsObject;
}

type UpdateRecipeActionSuccess = {
  type: string;
  recipe: RecipeMessage.AsObject
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
