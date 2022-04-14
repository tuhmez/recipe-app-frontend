import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { SocketClient } from '../../socket';
import { ViewRecipe } from '../../components/ViewRecipe';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { IRecipe } from '../../common/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes } from '../../redux/selectors';
import { editRecipePageNavigator } from '../../routes/routeConstants';
import { DELETE_RECIPE_REQUEST } from '../../redux/reducer';
import { useStyles } from '../../components/App/styles';

export interface Props {
  socket?: SocketClient;
}

export const ViewRecipePage = (props: Props) => {
  // Props deconstruction
  const { socket } = props;
  // States
  const [ currentRecipe, setCurrentRecipe ] = useState<IRecipe | undefined>(undefined);
  const { recipeId } = useParams();
  // Selectors
  const recipeSelector = useSelector(selectRecipes);
  // Dispatch
  const dispatch = useDispatch();
  // Navigation
  const navigate = useNavigate();
  // Effects
  useEffect(() => {
    const recipeToPass = recipeSelector.find(r => r.recipeId === recipeId);
    if (recipeToPass) setCurrentRecipe(recipeToPass);
    return () => {
      setCurrentRecipe(undefined);
    }
  }, [ recipeId, recipeSelector]);
  // Handlers
  const handleEditRecipe = (recipe: IRecipe) => {
    navigate(editRecipePageNavigator(recipe.recipeId));
  };
  const handleDeleteRecipe = (recipe: IRecipe) => {
    dispatch({ type: DELETE_RECIPE_REQUEST });
    socket?.deleteRecipe(recipe);
  }
  // Styles
  const classes = useStyles();

  if (!currentRecipe) return <div className={classes.loading}><CircularProgress /></div>;
  return (
    <ViewRecipe
      recipe={currentRecipe}
      onHandleEditRecipe={handleEditRecipe}
      onHandleDeleteRecipe={handleDeleteRecipe}
    />
  )
};
