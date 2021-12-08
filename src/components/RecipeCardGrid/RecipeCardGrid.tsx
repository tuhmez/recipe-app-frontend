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
      <Grid item>
        <RecipeCard
          recipe={recipe}
          theme={theme}
          onCardClick={onHandleCardClick}
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
      <Grid container item justify='center' spacing={1}>
        {subGridItems}
      </Grid>
    )
  }

  const noRecipeComponent = (
    <Grid item>
      <Typography variant='subtitle1' className={classes.noRecipesText}>No recipes yet!</Typography>
    </Grid>
  );

  return (
    <Grid container justify='center' alignItems={subGrid.length !== 0 ? undefined : 'center'} spacing={1}>
      {subGrid.length !== 0
      ? subGrid
      : noRecipeComponent
      }
    </Grid>
  );
};
