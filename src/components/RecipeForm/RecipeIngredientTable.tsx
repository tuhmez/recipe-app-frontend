import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IIngredient, IngredientUnit } from '../../common/types';
import { useStyles } from './styles';
import { RecipeIngredient } from './RecipeIngredient';

export interface Props {
  onAddIngredient: (ingredient: IIngredient) => Promise<boolean>;
  onRemoveIngredient: (event: React.MouseEvent<HTMLLIElement>) => void;
  onEditIngredient: (ingredient: IIngredient, index: number) => Promise<boolean>;
  data: IIngredient[];
  error?: string
}

const defaultIngredientState: IIngredient = {
  name: '',
  measurement: 0,
  units: IngredientUnit.NONE
};

const ingredientUnitOptions = Object.keys(IngredientUnit).map(type => <option key={`ingredientUnitOption-${type}`} value={type}>{type}</option>);

export const RecipeIngredientTable = (props: Props) => {
  // Deconstruct props
  const { onAddIngredient, onRemoveIngredient, onEditIngredient, data, error } = props;
  // States
  const [ingredientElements, setIngredientElements] = useState<JSX.Element[]>([]);
  const [dialogIngredientData, setDialogIngredientData] = useState(defaultIngredientState);
  const [isIngredientDialogOpen, setIsIngredientDialogOpen] = useState(false);
  const [isNewIngredient, setIsNewIngredient] = useState(true);
  const [editIngredientIndex, setEditIngredientIndex] = useState(0);
  // Styles
  const classes = useStyles();
  // Handlers
  const onIngredientDialogToggle = () => setIsIngredientDialogOpen(prevState => !prevState);
  const onDialogIngredientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setDialogIngredientData(prevState => ({ ...prevState, name: event.target.value }));
  const onDialogIngredientMeasurementChange = (event: React.ChangeEvent<HTMLInputElement>) => setDialogIngredientData(prevState => ({ ...prevState, measurement: parseFloat(event.target.value) }));
  const onDialogIngredientUnitTypeChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => setDialogIngredientData(prevState => ({ ...prevState, units: event.target.value as IngredientUnit }));
  const onCancelDialogIngredient = () => {
    setDialogIngredientData(defaultIngredientState);
    onIngredientDialogToggle();
  };
  const onAddDialogIngredient = async () => {
    const isOnAddIngredientSuccessful = await onAddIngredient(dialogIngredientData);
    if (isOnAddIngredientSuccessful) {
      onIngredientDialogToggle();
      setDialogIngredientData(defaultIngredientState);
    }
  };
  const onEditDialogIngredient = async () => {
    const isEditIngredientSuccessful = await onEditIngredient(dialogIngredientData, editIngredientIndex);
    if (isEditIngredientSuccessful) {
      onIngredientDialogToggle();
      setIsNewIngredient(true);
      setDialogIngredientData(defaultIngredientState);
    }
  };
  // Handlers - Callback Hooks
  const handleRemoveIngredient = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    onRemoveIngredient(event);
  }, [onRemoveIngredient]);
  // Effects
  useEffect(() => {
    setIngredientElements(data.map((ingredient, index) =>
      <RecipeIngredient
        ingredient={ingredient}
        index={index}
        handleRemoveIngredient={handleRemoveIngredient}
        onIngredientDialogToggle={onIngredientDialogToggle}
        setDialogIngredientData={setDialogIngredientData}
        setEditIngredientIndex={setEditIngredientIndex}
        setIsNewIngredient={setIsNewIngredient}
      />
    ));
  }, [handleRemoveIngredient, data]);
  // Subcomponents  
  const errorComponent = (
    !!error
      ? <Typography className={classes.errorHelperText}>{error}</Typography>
      : undefined
  );

  return (
    <div>
      <Grid container direction='row' justifyContent='space-between' className={classes.table}>
        <Grid item>
          <Typography
            variant='h5'
            className={!!error ? classes.errorText : undefined}
          >
            Ingredients*
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<Add />}
            onClick={onIngredientDialogToggle}
          >
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.elementContainer}>
        {ingredientElements}
      </Grid>
      {errorComponent}
      <Dialog
        open={isIngredientDialogOpen}
      >
        <DialogTitle>{isNewIngredient ? 'Add' : 'Edit'} Ingredient</DialogTitle>
        <DialogContent className={classes.ingredientDialog}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <TextField
                label='Name'
                id='new-ingredient-name'
                key='new-ingredient-name'
                variant='filled'
                value={dialogIngredientData.name}
                onChange={onDialogIngredientNameChange}
                fullWidth
                autoFocus
              />
            </Grid>
              <Grid item>
                <TextField
                  label='Amount'
                  id='new-ingredient-measurement'
                  key='new-ingredient-measurement'
                  variant='filled'
                  value={dialogIngredientData.measurement}
                  onChange={onDialogIngredientMeasurementChange}
                  type='number'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FormControl variant='filled' fullWidth>
                  <InputLabel id='ingredient-units-label'>Unit</InputLabel>
                  <Select
                    native
                    name={`new-ingredient-unit`}
                    value={dialogIngredientData.units}
                    onChange={onDialogIngredientUnitTypeChange}
                  >
                    {ingredientUnitOptions}
                  </Select>
                </FormControl>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={onCancelDialogIngredient}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={isNewIngredient ? onAddDialogIngredient : onEditDialogIngredient}
            disabled={dialogIngredientData.name === ''}
          >
            {isNewIngredient ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
