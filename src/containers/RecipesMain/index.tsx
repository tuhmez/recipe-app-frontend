import { Fab, useTheme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectRecipes } from '../../redux/selectors';
import { possibleRoutes, viewRecipePageNavigator } from '../../routes/routeConstants';
import { RecipeCardGrid } from '../../components/RecipeCardGrid';
import { useStyles } from './styles';
import { IRecipe } from '../../common/types';

export const RecipesMain = () => {
  // Selectors
  const recipes = useSelector(selectRecipes);
  // Navigation
  const navigate = useNavigate();
  // Handlers
  const onClickAddRecipe = () => {
    navigate(createRecipePage);
  };
  const onCardClick = (recipe: IRecipe) => {
    navigate(viewRecipePageNavigator(recipe.name));
  };
  // Styles
  const classes = useStyles();
  const theme = useTheme();
  // Constants
  const { createRecipePage } = possibleRoutes;

  return (
    <div>
      <RecipeCardGrid recipes={recipes} theme={theme} handleCardClick={onCardClick} />
      <Fab
        color='primary'
        aria-label='add'
        size='large'
        className={classes.fab}
        onClick={onClickAddRecipe}
      >
        <Add />
      </Fab>
    </div>
  )
};