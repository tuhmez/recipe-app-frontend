import { Grid, Theme } from '@material-ui/core';

import RecipeCard from '../RecipeCard/RecipeCard';

import { RecipeMessage } from '../../proto/recipe_pb';

interface Props {
  recipes: RecipeMessage.AsObject[];
  theme: Theme;
  handleCardClick: () => void;
  handleOnFavoriteToggle: () => void;
}

const RecipeCardGrid = (props: Props) => {
  const { handleCardClick, handleOnFavoriteToggle, recipes, theme } = props;

  // const theme = useTheme();
  // const dispatch = useDispatch();
  // const handleOnFavoriteToggle = useCallback((recipe: RecipeMessage) => dispatch(updateRecipe(recipe.toObject())), [dispatch]);
  // const handleCardClick = () => {
  //   dispatch();
  // }
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

  let subGrid: any = [];
  for (let i = 0; i < recipeCards.length; i += 3) {
    if (!recipeCards) return;
    let subGridItems: any = [];
    const firstItem = recipeCards[i];
    const secondItem = recipeCards[i + 1];
    const thirdItem = recipeCards[i + 2];
    if (firstItem) subGridItems.push(firstItem);
    if (secondItem) subGridItems.push(secondItem);
    if (thirdItem) subGridItems.push(thirdItem);

    subGrid.push(
      <Grid container item justify='center' spacing={2}>
        {subGridItems}
      </Grid>
    )
  }

  return (
    <Grid container justify='center' spacing={2}>
      {subGrid}
    </Grid>
  );
};

export default RecipeCardGrid;
