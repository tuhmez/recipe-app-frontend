import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IRecipe } from '../../common/types';
import { RecipeForm } from '../../components/RecipeForm';
import { selectRecipes } from '../../redux/selectors';
import { SocketClient } from '../../socket';
import { useStyles } from '../../components/App/styles';
import { UPDATE_RECIPE_REQUEST } from '../../redux/reducer';

export interface Props {
  socket: SocketClient;
}

export const EditRecipePage = (props: Props) => {
  // Props deconstruction
  const { socket } = props;
  // States
  const [ currentRecipe, setCurrentRecipe ] = useState<IRecipe | undefined>(undefined);
  const { recipeName } = useParams();
  // Selectors
  const recipeSelector = useSelector(selectRecipes);
  // Dispatch
  const dispatch = useDispatch();
  // Navigate
  const navigate = useNavigate();
  // Effects
  useEffect(() => {
    const recipeToPass = recipeSelector.find(r => r.name === recipeName);
    if (recipeToPass) setCurrentRecipe(recipeToPass);
    return () => {
      setCurrentRecipe(undefined);
    };
  }, [ recipeName, recipeSelector ]);
  // Handlers
  const onLeaveFormHandler = () => {
    navigate(-1);
  };
  const onSubmitFormHandler = (recipe: IRecipe) => {
    dispatch({ type: UPDATE_RECIPE_REQUEST });
    socket.editRecipe(recipe);
  }
  // Styles
  const classes = useStyles();

  if (!currentRecipe) return <div className={classes.loading}><CircularProgress /></div>;

  return (
    <RecipeForm
      isEdit
      data={currentRecipe}
      onCancelFormAction={onLeaveFormHandler}
      onSubmitFormAction={onSubmitFormHandler}
  
    />
  );
};
