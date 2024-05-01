import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { emptyRecipe } from '../../common/data';
import { IRecipe } from '../../common/types';
import { RecipeForm } from '../../components/RecipeForm';
import { ADD_RECIPE_REQUEST } from '../../redux/reducer';
import { SocketClient } from '../../socket';
import { useSnackbar } from 'notistack';

export interface Props {
  socket: SocketClient;
}

export const CreateRecipePage = (props: Props) => {
  // Props deconstruction
  const { socket } = props;
  // Dispatch
  const dispatch = useDispatch();
  // Navigate
  const navigate = useNavigate();
  // Handlers
  const onLeaveFormHandler = () => {
    navigate(-1);
  };
  // Notifications
  const enqueueSnackbar = useSnackbar();

  const onSubmitFormHandler = (recipe: IRecipe) => {
    dispatch({ type: ADD_RECIPE_REQUEST });
    socket.addRecipe(recipe);
  };

  return <RecipeForm data={emptyRecipe} onCancelFormAction={onLeaveFormHandler} onSubmitFormAction={onSubmitFormHandler} enqueueSnackbar={enqueueSnackbar}/>
};
