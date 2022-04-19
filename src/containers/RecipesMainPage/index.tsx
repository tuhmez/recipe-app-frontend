import { Fab, useTheme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectRecipes, selectSearchTerm } from '../../redux/selectors';
import { possibleRoutes, viewRecipePageNavigator } from '../../routes/routeConstants';
import { RecipeCardGrid } from '../../components/RecipeCardGrid';
import { useStyles } from './styles';
import { IRecipe } from '../../common/types';
import { useEffect, useState } from 'react';
import { findRecipe } from '../../utilities/findRecipe';

export const RecipesMain = () => {
  const [recipeData, setRecipeData] = useState<IRecipe[]>([]);
  // Selectors
  const recipes = useSelector(selectRecipes);
  const searchTerm = useSelector(selectSearchTerm);
  // Dispatch
  const dispatch = useDispatch()
  // Navigation
  const navigate = useNavigate();
  // Handlers
  const onClickAddRecipe = () => {
    navigate(createRecipePage);
  };
  const onCardClick = (recipe: IRecipe) => {
    navigate(viewRecipePageNavigator(recipe.recipeId));
  };
  // Styles
  const classes = useStyles();
  const theme = useTheme();
  // Constants
  const { createRecipePage } = possibleRoutes;
  useEffect(() => {
    setRecipeData(recipes);
    return () => {
      setRecipeData([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);
  // Effects
  useEffect(() => {
    if (searchTerm !== '') {
      setRecipeData(findRecipe(searchTerm, recipes));
    } else {
      setRecipeData(recipes);
    }
  }, [searchTerm, recipes]);

  return (
    <div>
      <RecipeCardGrid recipes={recipeData} theme={theme} handleCardClick={onCardClick} />
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