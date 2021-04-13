import * as actionTypes from '../redux/actionTypes';
import { RecipeState } from '../type';

const initialState: RecipeState = {
  recipes: [],
  error: '',
  isLoading: false
};

export default function rootReducer(
  state: RecipeState = initialState,
  action: any
) {
  let newState: RecipeState;
  switch (action.type) {
    case actionTypes.ADD_RECIPE_REQUEST:
      newState = {
        ...state,
        isLoading: true
      };
      return newState;
    case actionTypes.ADD_RECIPE_SUCCESS:
      newState = {
        ...state,
        recipes: state.recipes.concat(action.recipe),
        isLoading: false
      }
      return newState
    case actionTypes.ADD_RECIPE_FAILURE:
      newState = {
        ...state,
        error: action.error,
        isLoading: false
      }
      return;
    case actionTypes.UPDATE_RECIPE_REQUEST:
      newState = {
        ...state,
        isLoading: true
      }
      return;
    case actionTypes.UPDATE_RECIPE_SUCCESS:
      const newRecipeUpdateState = state.recipes.map((recipe, index, recipeArray) => {
        if (index === action.recipe.id) {
          recipeArray[index] = action.recipe.id;
        }
        return recipe;
      });
      newState = {
        ...state,
        recipes: newRecipeUpdateState,
        isLoading: false
      }
      return newState;
    case actionTypes.UPDATE_RECIPE_FAILURE:
      newState = {
        ...state,
        error: action.error,
        isLoading: false
      }
      return newState;
    case actionTypes.DELETE_RECIPE_REQUEST:
      newState = {
        ...state,
        isLoading: true
      }
      return newState;
    case actionTypes.DELETE_RECIPE_SUCCESS:
      const newRecipeDeleteState = state.recipes.map((recipe, index, recipeArray) => {
        if (recipe.id === action.id) {
          recipeArray.splice(index, 1);
        }
        return recipe;
      });
      newState = {
        ...state,
        recipes: newRecipeDeleteState,
        isLoading: false
      }
      return;
    case actionTypes.DELETE_RECIPE_FAILURE:
      newState = {
        ...state,
        error: action.error,
        isLoading: false,
      }
      return newState;
    case actionTypes.GET_RECIPE_REQUEST:
      newState = {
        ...state,
        isLoading: true
      }
      return newState;
    case actionTypes.GET_RECIPE_SUCCESS:
      let doesRecipeExist = false;
      state.recipes.forEach(recipe => {
        if (recipe.id === action.recipe.id) doesRecipeExist = true;
      });
      let newRecipeState = state.recipes;
      if (!doesRecipeExist) {
        newRecipeState.push(action.recipe);
      }
      newState = {
        ...state,
        isLoading: false,
        recipes: newRecipeState
      };
      return newState;
    case actionTypes.GET_RECIPE_FAILURE:
      newState = {
        ...state,
        error: action.error,
        isLoading: false
      };
      return newState;
    case actionTypes.GET_ALL_RECIPE_REQUEST:
      newState = {
        ...state,
        isLoading: true
      };
      return newState;
    case actionTypes.GET_ALL_RECIPE_SUCCESS:
      newState = {
        ...state,
        isLoading: false,
        recipes: action.recipes
      }
      return newState;
    case actionTypes.GET_ALL_RECIPE_FAILURE:
      newState = {
        ...state,
        error: action.error,
        isLoading: false
      };
      return newState;
    default:      
      return state;
  }
}
