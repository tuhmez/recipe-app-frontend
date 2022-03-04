import { createAction } from '@reduxjs/toolkit';
import { IRecipe } from '../common/types';
import { RecipeState } from '../type';

const initialState: RecipeState = {
  recipes: [],
  searchTerm: '',
  error: '',
  isLoading: false
};

// Adding recipes
export const ADD_RECIPE_REQUEST = createAction('ADD_RECIPE_REQUEST');
const handleAddRecipeRequest = (state: RecipeState, action: any) => {
  return {
    ...state,
    isLoading: true
  };
};
export const ADD_RECIPE_SUCCESS = createAction('ADD_RECIPE_SUCCESS');
const handleAddRecipeSuccess = (state: RecipeState, action: any): RecipeState => {
  const newRecipeState: IRecipe[] = [...state.recipes, action.payload];
  return {
    ...state,
    isLoading: false,
    recipes: newRecipeState
  };
};
export const ADD_RECIPE_FAILURE = createAction('ADD_RECIPE_FAILURE');
const handleAddRecipeFailure = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload
  };
};
// Updating recipes
export const UPDATE_RECIPE_REQUEST = createAction('UPDATE_RECIPE_REQUEST');
const handleUpdateRecipeRequest = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: true
  };
};
export const UPDATE_RECIPE_SUCCESS = createAction('UPDATE_RECIPE_SUCCESS');
const handleUpdateRecipeSuccess = (state: RecipeState, action: any): RecipeState => {
  const newRecipeState = [...state.recipes];
  const updateIndex = newRecipeState.findIndex(r => r.recipeId === action.payload.recipeId);
  newRecipeState[updateIndex] = action.payload;
  return {
    ...state,
    isLoading: false,
    recipes: newRecipeState
  };
};
export const UPDATE_RECIPE_FAILURE = createAction('UPDATE_RECIPE_FAILURE');
const handleUpdateRecipeFailure = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload
  };
};
// Deleting recipes
export const DELETE_RECIPE_REQUEST = createAction('DELETE_RECIPE_REQUEST');
const handleDeleteRecipeRequest = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: true
  };
};
export const DELETE_RECIPE_SUCCESS = createAction('DELETE_RECIPE_SUCCESS');
const handleDeleteRecipeSuccess = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: false,
    recipes: state.recipes.filter(r => r.recipeId !== action.payload.recipeId)
  };
};
export const DELETE_RECIPE_FAILURE = createAction('DELETE_RECIPE_FAILURE');
const handleDeleteRecipeFailure = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload
  };
};
// Getting recipes
export const GET_RECIPES_REQUEST = createAction('GET_RECIPES_REQUEST');
const handleGetRecipeRequest = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: true
  };
};
export const GET_RECIPES_SUCCESS = createAction('GET_RECIPES_SUCCESS');
const handleGetRecipeSuccess = (state: RecipeState, action: any): RecipeState => {
  const prevRecipeState = [...state.recipes];
  if (action.payload.recipeId) {
    const recipeIndex = prevRecipeState.findIndex(r => r.recipeId === action.payload.recipeId);
    prevRecipeState[recipeIndex] = action.payload.recipes[0];
    return {
      ...state,
      recipes: prevRecipeState
    };
  } else {
    const newRecipesToAdd = (action.payload.recipes as IRecipe[]).filter(r => !prevRecipeState.includes(r));
    return {
      ...state,
      recipes: prevRecipeState.concat(newRecipesToAdd)
    };
  }
};
export const GET_RECIPES_FAILURE = createAction('GET_RECIPES_FAILURE');
const handleGetRecipeFailure = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload
  };
};
export const GET_RECIPE_BY_SEARCH = createAction('GET_RECIPE_BY_SEARCH');
const handleGetRecipeBySearch = (state: RecipeState, action: any): RecipeState => {
  return {
    ...state,
    searchTerm: action.payload
  };
};
export const CLEAR_SEARCH = createAction('CLEAR_SEARCH');
const handleClearSearch = (state: RecipeState): RecipeState => {
  return {
    ...state,
    searchTerm: ''
  };
};

const appReducer = (
  state: RecipeState = initialState,
  action: any
): RecipeState => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return handleAddRecipeRequest(state, action);
    case ADD_RECIPE_SUCCESS:
      return handleAddRecipeSuccess(state, action);
    case ADD_RECIPE_FAILURE:
      return handleAddRecipeFailure(state, action);
    case UPDATE_RECIPE_REQUEST:
      return handleUpdateRecipeRequest(state, action);
    case UPDATE_RECIPE_SUCCESS:
      return handleUpdateRecipeSuccess(state, action);
    case UPDATE_RECIPE_FAILURE:
      return handleUpdateRecipeFailure(state, action);
    case DELETE_RECIPE_REQUEST:
      return handleDeleteRecipeRequest(state, action);
    case DELETE_RECIPE_SUCCESS:
      return handleDeleteRecipeSuccess(state, action);
    case DELETE_RECIPE_FAILURE:
      return handleDeleteRecipeFailure(state, action);
    case GET_RECIPES_REQUEST:
      return handleGetRecipeRequest(state, action);
    case GET_RECIPES_SUCCESS:
      return handleGetRecipeSuccess(state, action);
    case GET_RECIPES_FAILURE:
      return handleGetRecipeFailure(state, action);
    case GET_RECIPE_BY_SEARCH:
      return handleGetRecipeBySearch(state, action);
    case CLEAR_SEARCH:
      return handleClearSearch(state);
    default:      
      return state;
  }
}

export default appReducer;
