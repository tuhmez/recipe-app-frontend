import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  Fab,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction ,
  ListItemText,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core';
import { Add, Close, Check, ExpandMore } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectFilters, selectRecipes, selectSearchTerm, selectSort } from '../../redux/selectors';
import { possibleRoutes, viewRecipePageNavigator } from '../../routes/routeConstants';
import { RecipeCardGrid } from '../../components/RecipeCardGrid';
import { useStyles } from './styles';
import { IRecipe } from '../../common/types';
import React, { useEffect, useState } from 'react';
import { findRecipe } from '../../utilities/findRecipe';
import { IFilter } from '../../components/RecipeCardGrid/RecipeCardGrid';
import { RESET_SELECTED_FILTERS, RESET_SELECTED_SORT, UPDATE_SELECTED_FILTERS, UPDATE_SELECTED_SORT } from '../../redux/reducer';

const sortTypes = ['Alphabetical', 'Difficulty', 'Favorites', 'Type'];
const filterTypes: { [key: string]: string[] } = {
  Favorites: ['Favorited', 'Not Favorited'],
  Difficulty: ['Easy', 'Medium', 'Hard'],
  Type: ['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Snack', 'Drink']
};

export const RecipesMain = () => {
  // States
  const [recipeData, setRecipeData] = useState<IRecipe[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Selectors
  const recipes = useSelector(selectRecipes);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedFilters = useSelector(selectFilters);
  const selectedSort = useSelector(selectSort);

  // Dispatch
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();

  // Styles
  const classes = useStyles();
  const theme = useTheme();
  
  // Constants
  const { createRecipePage } = possibleRoutes;
  
  // Effects
  useEffect(() => {
    setRecipeData(recipes);
    return () => {
      setRecipeData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);
  useEffect(() => {
    if (searchTerm !== '') {
      setRecipeData(findRecipe(searchTerm, recipes));
    } else {
      setRecipeData(recipes);
    }
  }, [searchTerm, recipes]);

  // Handlers
  const onClickAddRecipe = () => {
    navigate(createRecipePage);
  };
  const onCardClick = (recipe: IRecipe) => {
    navigate(viewRecipePageNavigator(recipe.recipeId));
  };
  const handleToggleDialogOpen = () => setDialogOpen(prevState => !prevState);

  const handleSortItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newState = {...selectedSort};
    const { id } = event.currentTarget;
    if (newState[id.toLowerCase()]) {
      newState[id.toLowerCase()] = false;
    } else {
      Object.keys(newState).forEach(key => newState[key] = false);
      newState[id.toLowerCase()] = true;
    }

    dispatch({ type: UPDATE_SELECTED_SORT, payload: newState });
  }

  const handleFilterItemClick = (checked: boolean, specificFilter: string, filterType: string) => {
    const newState = {...selectedFilters};
    newState[filterType][specificFilter] = checked;
    dispatch({ type: UPDATE_SELECTED_FILTERS, payload: newState });
  };
  const onResetClick = () => {
    dispatch({ type: RESET_SELECTED_FILTERS });
    dispatch({ type: RESET_SELECTED_SORT });
  };

  // Sub-components
  const sortItems = sortTypes.map(item => (
    <ListItem
      dense
      button
      onClick={handleSortItemClick}
      key={item}
      id={item}
      className={selectedSort[item] ? classes.listItem : undefined}
    >
      <ListItemText primary={item}/>
      {selectedSort[item.toLowerCase()] && <ListItemSecondaryAction><Check /></ListItemSecondaryAction>}
    </ListItem>
  ));
  const filterItems = Object.keys(filterTypes).map(item => {
    const options = filterTypes[item].map(f => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedFilters[item][f] || false}
              onChange={(e, checked) => handleFilterItemClick(checked, f, item)}
              name={f}
              id={f}
              color='primary'
            />
          }
          label={f}
        />
      )
    })
    return (
      <Accordion square elevation={0} classes={{ expanded: classes.expandedAccordion }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id={`${item}-filter-accordion`}
        >
          <Typography>{item}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {options}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    );
  });


  return (
    <div>
      <Button onClick={handleToggleDialogOpen} size='small' variant='outlined' className={classes.topButtonGroup}>Options</Button>
      <RecipeCardGrid
        recipes={recipeData}
        theme={theme}
        handleCardClick={onCardClick}
        filter={selectedFilters as IFilter}
        sort={selectedSort}
      />
      <Fab
        color='primary'
        aria-label='add'
        size='large'
        className={classes.fab}
        onClick={onClickAddRecipe}
      >
        <Add />
      </Fab>
      <Dialog fullScreen open={dialogOpen}>
        <AppBar>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleToggleDialogOpen}>
              <Close />
            </IconButton>
            <Typography variant='h5'>Grid Options</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <Typography variant='h6'>
            Sort
          </Typography>
          <Divider className={classes.divider} />
          <List>
            {sortItems}
          </List>
          <Typography variant='h6'>
            Filter
          </Typography>
          <Divider className={classes.divider}/>
          <div className={classes.chipList}>
            {filterItems}
          </div>
          <Button
            color='secondary'
            variant='outlined'
            onClick={onResetClick}
            className={classes.resetButton}
          >Reset</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
};