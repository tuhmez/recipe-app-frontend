import { Button, Grid, Theme, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRecipe } from '../../common/types';
import { CLEAR_SEARCH } from '../../redux/reducer';
import { selectSearchTerm } from '../../redux/selectors';

import { RecipeCard } from '../RecipeCard';
import { useStyles } from './styles';

export interface ISort {
  favorites?: boolean;
  type?: boolean;
  difficulty?: boolean;
  alphabetical?: boolean;
}

export type IFilter = {
  [key in 'Favorites' | 'Difficulty' | 'Type']: {
    [key: string]: boolean;
  };
};

export interface Props {
  recipes: IRecipe[];
  theme: Theme;
  handleCardClick: (recipe: IRecipe) => void;
  sort?: ISort;
  filter?: IFilter;
}

export const RecipeCardGrid = (props: Props) => {
  // Props deconstruction
  const { handleCardClick, filter, recipes, sort, theme } = props;
  // Selectors
  const searchTerm = useSelector(selectSearchTerm);
  // Dispatch
  const dispatch = useDispatch();
  // Styles
  const classes = useStyles();

  const recipeCards = useMemo(() => {
    return recipes.filter(recipe => {
      if (filter) {
        const filterArray = [ filter.Difficulty, filter.Favorites, filter.Type ];
        const canSkipFilter = filterArray.map((v) => Object.values(v)).flat().every((v) => !v);
        
        if (canSkipFilter) return recipe;

        const selectedFilters = new Map();
        selectedFilters.set("difficulty", []);
        selectedFilters.set("favorited", []);
        selectedFilters.set("type", []);

        filterArray.forEach((f, i) => {
          Object.entries(f).forEach(([k, v]) => {
            let arrayToGet = "";
            if (v === true) {
              if (i === 0) {
                arrayToGet = "difficulty";
              } else if (i === 1) {
                arrayToGet = "favorited";
              } else {
                arrayToGet = "type";
              }

              const filteredArray = selectedFilters.get(arrayToGet);
              filteredArray.push(k.toLowerCase());
              selectedFilters.set(arrayToGet, filteredArray);
            }
          });
          
        });

        const recipeMatch: boolean[] = [];

        selectedFilters.forEach((v, k) => {
          if (v.length === 0) return;
          if (k === "favorited") {
            if (v.length === 2) {
              recipeMatch.push(true);
            } else {
              recipeMatch.push(recipe.favorited === (v[0] === "favorited"));
            }
          } else {
            // @ts-ignore
            recipeMatch.push(v.includes(recipe[k].toLowerCase()));
          }
        });

        return recipeMatch.every((v) => v === true);
      }

      return false;
    })
    .sort((a, b) => {
      if (sort) {
        if (sort.alphabetical && sort.alphabetical === true) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          
          return 0;
        } else if (sort.difficulty && sort.difficulty === true) {

        } else if (sort.favorites && sort.favorites === true) {
          if (a.favorited && !b.favorited) return -1;
          if (!a.favorited && b.favorited) return 1;

          return 0;
        } else if (sort.type && sort.type === true) {
          if (a.type > b.type) return 1;
          if (a.type < b.type) return -1;

          return 0;
        } else {
          return 0;
        }
      }

      return 0;
    })
    .map(recipe => {
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
  }, [filter, handleCardClick, recipes, sort, theme]);

    // make width and wrap elements
    // |---- item --- item ----|
    // |-----------------------|
    // |---- item --- item ----|

  const subGrid = useMemo(() => {
    const grid: JSX.Element[] = [];
    for (let i = 0; i < recipeCards.length; i += 2) {
      let subGridItems: any = [];
      const firstItem = recipeCards[i];
      const secondItem = recipeCards[i + 1];
      if (firstItem) subGridItems.push(firstItem);
      if (secondItem) subGridItems.push(secondItem);
  
      grid.push(
        <Grid container item justifyContent='center' spacing={1} key={`subgrid-${grid.length}`}>
          {subGridItems}
        </Grid>
      );

    };
    return grid;
  }, [recipeCards])
  
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
