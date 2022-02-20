import { Grid, Theme, Typography } from '@material-ui/core';

import { IRecipe } from '../../common/types';

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
  }

  const noRecipeComponent = (
    <Grid item key='no-recipe-component'>
      <Typography
        variant='subtitle1'
        className={classes.noRecipesText}
        key='no-recipe-text'
      >
        No recipes yet!
      </Typography>
    </Grid>
  );

  return (
    <Grid container justifyContent='center' alignItems={subGrid.length !== 0 ? undefined : 'center'} spacing={1}>
      {subGrid.length !== 0
      ? subGrid
      : noRecipeComponent
      }
    </Grid>
  );
};
