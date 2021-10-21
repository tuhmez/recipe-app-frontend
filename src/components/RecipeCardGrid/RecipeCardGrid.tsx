import { Grid, Theme } from '@material-ui/core';

import { IRecipe } from '../../common/types';

import { RecipeCard } from '../RecipeCard';

export interface Props {
  recipes: IRecipe[];
  theme: Theme;
  handleCardClick: () => void;
  handleOnFavoriteToggle: () => void;
}

export const RecipeCardGrid = (props: Props) => {
  // Props deconstruction
  const { handleCardClick, handleOnFavoriteToggle, recipes, theme } = props;

  const recipeCards = recipes.map(recipe => {
    return (
      <Grid item>
        <RecipeCard
          recipe={recipe}
          theme={theme}
          onCardClick={handleCardClick}
          onFavoriteToggle={handleOnFavoriteToggle}
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

  return (
    <Grid container justify='center' spacing={1}>
      {subGrid}
    </Grid>
  );
};
