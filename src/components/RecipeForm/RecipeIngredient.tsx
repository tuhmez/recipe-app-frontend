import { useState } from 'react';
import { Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';
import { IIngredient } from '../../common/types';
import { useStyles } from './styles';

export interface Props {
  ingredient: IIngredient;
  index: number;
  doesIngredientHaveDivider?: boolean;
  handleRemoveIngredient: (event: React.MouseEvent<HTMLLIElement>, elementIndex: number) => void;
  onIngredientDialogToggle: () => void;
  setDialogIngredientData: (ingredient: IIngredient) => void;
  setEditIngredientIndex: (index: number) => void;
  setIsNewIngredient: (isNewIngredient: boolean) => void;
}

export const RecipeIngredient = (props: Props) => {
  // Props deconstruction
  const {
    ingredient,
    index,
    doesIngredientHaveDivider,
    handleRemoveIngredient,
    onIngredientDialogToggle,
    setDialogIngredientData,
    setEditIngredientIndex,
    setIsNewIngredient
  } = props;
  // States
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [isIngredientAdditionalActionOpen, setIsIngredientAdditionalActionOpen] = useState(false);
  // Classes
  const classes = useStyles();
  // Handlers
  const handleOpenIngredientAdditionalActionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setIsIngredientAdditionalActionOpen(true);
  };
  const handleCloseIngredientAdditionalActionMenu = () => {
    setMenuAnchorEl(null);
    setIsIngredientAdditionalActionOpen(false);
  };
  const editIngredient = () => {
    setIsNewIngredient(false);
    setEditIngredientIndex(index);
    setDialogIngredientData(ingredient);
    onIngredientDialogToggle();
    handleCloseIngredientAdditionalActionMenu();
  };
  const removeIngredient = (event: React.MouseEvent<HTMLLIElement>) => {
    handleRemoveIngredient(event, index);
    handleCloseIngredientAdditionalActionMenu();
  };
  // Constants
  const ingredientText = `${index + 1}. ${ingredient.name}`;
  const ingredientSupportText = `• ${ingredient.measurement} ${ingredient.units}`;
  return (
    <Grid item container direction='column' alignItems='center' spacing={2} key={`ingredient-${index} + 1`}>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-between'
        direction='row'
        key={`ingredient-element-${index}`}
        className={classes.element}
      >
        <Grid item container direction='column' key={index} xs>
          <Grid item key={`ingredient-name-${index}`}>
            <div style={{ width: '100%', maxWidth: '310px'}}>
              <Typography variant='body1'>{ingredientText}</Typography>
            </div>
          </Grid>
          <Grid item style={{ paddingLeft: '30px' }} key={`ingredient-support-text-${index}`}>
            <Typography variant='body1'>{ingredientSupportText}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1} key='edit-ingredient-item'>
          <IconButton
            id={`ingredient-${index}`}
            onClick={handleOpenIngredientAdditionalActionMenu}
            style={{ float: 'right' }}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id='ingredient-additional-action-menu'
            key='ingredient-additional-action-menu'
            anchorEl={menuAnchorEl}
            getContentAnchorEl={null}
            open={isIngredientAdditionalActionOpen}
            onClose={handleCloseIngredientAdditionalActionMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={editIngredient} key={`ingredient-edit-${index}`}>Edit Ingredient</MenuItem>
            <MenuItem onClick={removeIngredient} id={`ingredient-${index}`} key={`ingredient-remove-${index}`}>Delete Ingredient</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {doesIngredientHaveDivider ? (<Grid item><Divider variant='middle' /></Grid>) : undefined}
    </Grid>
  )
};
