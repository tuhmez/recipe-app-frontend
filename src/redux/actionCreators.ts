import {
  AddDistpatchType,
  AddRecipeAction,
  AddRecipeActionFailure,
  AddRecipeActionSuccess,
  DeleteDispatchType,
  DeleteRecipeAction,
  DeleteRecipeActionFailure,
  DeleteRecipeActionSuccess,
  GetRecipeAction,
  GetDispatchType,
  GetRecipeActionFailure,
  GetRecipeActionSuccess,
  UpdateDispatchType,
  UpdateRecipeAction,
  UpdateRecipeActionFailure,
  UpdateRecipeActionSuccess,
  GetAllRecipesAction,
  GetAllDispatchType,
  GetAllRecipesActionFailure,
  GetAllRecipesActionSuccess
} from '../type';
import * as actionTypes from './actionTypes';

import {
  addRecipe as addRecipeGrpc,
  deleteRecipe as deleteRecipeGrpc,
  getAllRecipes as getAllRecipesGrpc,
  getRecipe as getRecipeGrpc,
  updateRecipe as updateRecipeGrpc
} from '../communications'
import { RecipeId, RecipeMessage, Status } from '../proto/recipe_pb';
import { toRecipeProto } from '../utilities';

export function addRecipe(recipe: RecipeMessage.AsObject) {
  const action: AddRecipeAction = {
    type: actionTypes.ADD_RECIPE_REQUEST,
    recipe
  }

  return addRecipeAction(action);
}

export function getRecipe(id: string) {
  const action: GetRecipeAction = {
    type: actionTypes.GET_RECIPE_REQUEST,
    id
  }

  return getRecipeAction(action);
}

export function getAllRecipes() {
  const action: GetAllRecipesAction = {
    type: actionTypes.GET_ALL_RECIPE_REQUEST
  };

  return getAllRecipesAction(action);
}

export function updateRecipe(recipe: RecipeMessage.AsObject) {
  const action: UpdateRecipeAction = {
    type: actionTypes.UPDATE_RECIPE_REQUEST,
    recipe
  }

  return updateRecipeAction(action);
}

export function deleteRecipe(id: string) {
  const action: DeleteRecipeAction = {
    type: actionTypes.DELETE_RECIPE_REQUEST,
    id
  };

  return deleteRecipeAction(action);
}

function addRecipeAction(action: AddRecipeAction) {
  return (dispatch: AddDistpatchType) => {
    dispatch(action);
    const recipe = toRecipeProto(action.recipe);
    addRecipeGrpc(recipe, (err: any, response: Status) => {
      if (err) {
        const failure: AddRecipeActionFailure = {
          type: actionTypes.ADD_RECIPE_FAILURE,
          error: err
        }
        dispatch(failure);
        return;
      } else if (response.getIsError()) {
        const failure: AddRecipeActionFailure = {
          type: actionTypes.ADD_RECIPE_FAILURE,
          error: response.getDescription()
        }
        dispatch(failure);
        return;
      }
      const success: AddRecipeActionSuccess = {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        recipe: action.recipe
      };
      dispatch(success);
    });
  };
}

function getRecipeAction(action: GetRecipeAction) {
  return (dispatch: GetDispatchType) => {
    const id = new RecipeId().setId(action.id);
    getRecipeGrpc(id, (err: any, response: RecipeMessage) => {
      if (err) {
        const failure: GetRecipeActionFailure = {
          type: actionTypes.GET_RECIPE_FAILURE,
          error: err
        };
        dispatch(failure);
        return;
      }
      const success: GetRecipeActionSuccess = {
        type: actionTypes.GET_RECIPE_SUCCESS,
        recipe: response.toObject()
      };
      dispatch(success);
    });
  }
}

function getAllRecipesAction(action: GetAllRecipesAction) {
  const recipes: RecipeMessage.AsObject[] = [];

  return (dispatch: GetAllDispatchType) => {
    getAllRecipesGrpc(response => {
      recipes.push(response.toObject());
    },
    err => {
      if (err) {
        const failure: GetAllRecipesActionFailure = {
          type: actionTypes.GET_ALL_RECIPE_FAILURE,
          error: err
        };
        dispatch(failure);
      }
    }, () => {
      const success: GetAllRecipesActionSuccess = {
        type: actionTypes.GET_ALL_RECIPE_SUCCESS,
        recipes
      };
      dispatch(success);
    });
  }
}

function updateRecipeAction(action: UpdateRecipeAction) {
  return (dispatch: UpdateDispatchType) => {
    const recipe = toRecipeProto(action.recipe);
    updateRecipeGrpc(recipe, (err: any, response: Status) => {
      if (err) {
        const failure: UpdateRecipeActionFailure = {
          type: actionTypes.UPDATE_RECIPE_FAILURE,
          error: err
        };
        dispatch(failure);
        return;
      } else if (response.getIsError()) {
        const failure: UpdateRecipeActionFailure = {
          type: actionTypes.UPDATE_RECIPE_FAILURE,
          error: response.getDescription()
        };
        dispatch(failure);
        return;
      }

      const success: UpdateRecipeActionSuccess = {
        type: actionTypes.UPDATE_RECIPE_SUCCESS,
        recipe: action.recipe
      };
      dispatch(success);
    });
  }
}

function deleteRecipeAction(action: DeleteRecipeAction) {
  return (dispatch: DeleteDispatchType) => {
    const id = new RecipeId().setId(action.id);
    deleteRecipeGrpc(id, (err: any, response: Status) => {
      if (err) {
        const failure: DeleteRecipeActionFailure = {
          type: actionTypes.DELETE_RECIPE_FAILURE,
          error: err
        }
        dispatch(failure);
        return;
      } else if (response.getIsError()) {
        const failure: DeleteRecipeActionFailure = {
          type: actionTypes.DELETE_RECIPE_FAILURE,
          error: response.getDescription()
        };
        dispatch(failure);
        return;
      }
      const success: DeleteRecipeActionSuccess = {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        id: action.id
      };
      dispatch(success);
    });
  }
}
