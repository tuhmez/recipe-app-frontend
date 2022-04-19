import { Button, Grid, Theme, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRecipe } from '../../common/types';
import { CLEAR_SEARCH } from '../../redux/reducer';
import { selectSearchTerm } from '../../redux/selectors';

import { RecipeCard } from '../RecipeCard';
import { useStyles } from './styles';

export interface Props {
  recipes: IRecipe[];
  theme: Theme;
  handleCardClick: (recipe: IRecipe) => void;
}

export const RecipeCardGrid = (props: Props) => {
  // Props deconstruction
  const { handleCardClick, recipes, theme } = props;
  // Selectors
  const searchTerm = useSelector(selectSearchTerm);
  // Dispatch
  const dispatch = useDispatch();
  // Styles
  const classes = useStyles();

  const recipeCards = recipes.map(recipe => {
    const onHandleCardClick = () => {
      handleCardClick(recipe);
    };
    return (
      <Grid item key={`${recipe.name}-${recipe.recipeId}`}>
        <RecipeCard
          recipe={recipe}
          theme={theme}
          onCardClick={onHandleCardClick}
          key={`${recipe.name}-${recipe.recipeId}`}
        />
      </Grid>
    );
  });

  let subGrid: JSX.Element[] = [];
  for (let i = 0; i < recipeCards.length; i += 2) {
    let subGridItems: any = [];
    const firstItem = recipeCards[i];
    const secondItem = recipeCards[i + 1];
    if (firstItem) subGridItems.push(firstItem);
    if (secondItem) subGridItems.push(secondItem);

    subGrid.push(
      <Grid container item justifyContent='center' spacing={1} key={`subgrid-${subGrid.length}`}>
        {subGridItems}
      </Grid>
    )
  };
  
  const onClearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const clearSearchComponent = (
    <Grid item key='clear-search-component'>
      <Button
        variant='contained'
        color='primary'
        onClick={onClearSearch}
        disableElevation
      >
        Clear Search
      </Button>
    </Grid>
  );

  const noRecipeComponent = (
    <Grid item key='no-recipe-text'>
      <Typography
        variant='subtitle1'
        className={classes.noRecipesText}
        key='no-recipe-text'
      >
        {searchTerm !== '' ? 'No recipes found!' : 'No recipes yet!'}
      </Typography>
    </Grid>
  );

  return (
    <Grid container justifyContent='center' alignItems={subGrid.length !== 0 ? undefined : 'center'} spacing={1}>
      {subGrid.length !== 0
      ? subGrid
      : noRecipeComponent
      }
      {subGrid.length !== 0 && searchTerm !== '' ? clearSearchComponent : undefined}
    </Grid>
  );
};
