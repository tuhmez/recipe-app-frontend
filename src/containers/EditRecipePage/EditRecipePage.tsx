import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IRecipe } from '../../common/types';
import { RecipeForm } from '../../components/RecipeForm';
import { selectRecipes } from '../../redux/selectors';
import { SocketClient } from '../../socket';
import { EDIT_RECIPE_REQUEST } from '../../socket/constants';

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
    dispatch({ type: EDIT_RECIPE_REQUEST });
    socket.editRecipe(recipe);
  }

  if (!currentRecipe) return <div>we loading...</div>;

  return (
    <RecipeForm
      isEdit
      data={currentRecipe}
      onCancelFormAction={onLeaveFormHandler}
      onSubmitFormAction={onSubmitFormHandler}
  
    />
  );
};
