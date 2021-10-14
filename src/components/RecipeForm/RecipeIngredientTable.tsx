import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { IIngredient, IngredientUnit } from '../../common/types';
import { useStyles } from './styles';

export interface Props {
  onIngredientItemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIngredientUnitChange: (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (event: React.MouseEvent<HTMLButtonElement>) => void;
  data: IIngredient[];
}

export const RecipeIngredientTable = (props: Props) => {
  // Deconstruct props
  const { onAddIngredient, onRemoveIngredient, onIngredientItemChange, onIngredientUnitChange, data } = props;
  // States
  const [ ingredientElements, setIngredientElements ] = useState<JSX.Element[]>([])
  // Styles
  const classes = useStyles();

  // Effects
  useEffect(() => {
    const ingredientUnitItems = () => {
      const returnItems: JSX.Element[] = [];
      Object.keys(IngredientUnit).forEach(type => {
        returnItems.push((
          <MenuItem key={`ingredient-unit-${type}`} value={type}>{type}</MenuItem>
        ));
      });
      return returnItems;
    };
    const makeIngredientElement = (ingredient: IIngredient, index: number) => {
      return (
        <Grid container item alignItems='center' direction='row' spacing={2} key={`ingredient-element-${index}`}>
          <Grid item>
            <TextField
              label='Name'
              id={`name-${index}`}
              value={ingredient.name}
              onChange={onIngredientItemChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Amount'
              id={`measurement-${index}`}
              value={ingredient.measurement}
              onChange={onIngredientItemChange}
            />
          </Grid>
          <Grid item>
            <FormControl variant='standard' className={classes.ingredientGrid}>
              <InputLabel id='ingredient-units-label'>Unit</InputLabel>
              <Select
                name={`unit-${index}`}
                value={ingredient.units}
                onChange={onIngredientUnitChange}
              >
                {ingredientUnitItems()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton id={`ingredient-${index}`} onClick={onRemoveIngredient}><Delete/></IconButton>
          </Grid>
        </Grid>
      );
    };
    setIngredientElements(data.map((d, i) => makeIngredientElement(d, i)));
    return () => {
      setIngredientElements([]);
    }
  },
  [
    data,
    onIngredientItemChange,
    onIngredientUnitChange,
    onRemoveIngredient,
    classes.ingredientGrid,
  ]);

  return (
    <div>
      <Grid container direction='row' justifyContent='space-between' className={classes.table}>
        <Grid item>
          <Typography variant='h5'>Ingredients</Typography>
        </Grid>
        <Grid>
          <Button variant='outlined' color='primary' startIcon={<Add/>} onClick={onAddIngredient}>
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {ingredientElements}
      </Grid>
    </div>
  );
};
