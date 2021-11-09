import { IRecipe } from '../common/types';

export interface IRecipeByIdRequest {
  recipeId: string;
}

export interface IUpdateRecipeRequest {
  recipeId: string;
  recipe: IRecipe;
}

export interface IErrorResponse {
  err: string;
}

export interface IPingResponse {
  status: string;
}
