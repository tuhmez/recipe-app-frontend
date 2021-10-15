import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, IconButton, InputLabel, Select, TextField, Typography } from '@material-ui/core';
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
          <option key={`ingredient-unit-${type}`} value={type}>{type}</option>
        ));
      });
      return returnItems;
    };
    const makeIngredientElement = (ingredient: IIngredient, index: number) => {
      return (
        <Grid
          container
          item
          alignItems='center'
          direction='row'
          spacing={1}
          key={`ingredient-element-${index}`}
          className={classes.ingredientElement}
        >
          <Grid item>
            <TextField
              label='Name'
              id={`name-${index}`}
              variant='filled'
              value={ingredient.name}
              onChange={onIngredientItemChange}
              className={classes.ingredientName}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Amount'
              id={`measurement-${index}`}
              variant='filled'
              value={ingredient.measurement}
              onChange={onIngredientItemChange}
              type='number'
              className={classes.ingredientMeasurement}
              
            />
          </Grid>
          <Grid item>
            <FormControl variant='filled' className={classes.ingredientUnit}>
              <InputLabel id='ingredient-units-label'>Unit</InputLabel>
              <Select
                native
                name={`unit-${index}`}
                value={ingredient.units}
                onChange={onIngredientUnitChange}
              >
                {ingredientUnitItems()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton id={`ingredient-${index}`} onClick={onRemoveIngredient} size='small'><Delete/></IconButton>
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
    classes.ingredientContainer,
    classes.ingredientName,
    classes.ingredientMeasurement,
    classes.ingredientUnit,
    classes.ingredientElement
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
      <Grid container className={classes.elementContainer}>
        {ingredientElements}
      </Grid>
    </div>
  );
};
