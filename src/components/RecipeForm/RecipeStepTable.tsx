import React, { useEffect, useState } from 'react';
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, Select, TextField, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

import { IStep, StepType, TimeUnit } from '../../common/types';
import { useStyles } from './styles';

export interface Props {
  onAddStep: () => void;
  onRemoveStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onStepItemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStepTimeUnitChange: (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => void;
  onStepTypeChange: (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => void;
  data: IStep[];
  error?: string
}

export const RecipeStepTable = (props: Props) => {
  // Destructure props
  const { onAddStep, onRemoveStep, onStepItemChange, onStepTimeUnitChange, onStepTypeChange, data, error } = props;
  // States
  const [ stepElements, setStepElements ] = useState<JSX.Element[]>([]);
  // Styles
  const classes = useStyles();
  // Effects
  useEffect(() => {
    const recipeTimeUnitItems = () => {
      const returnItems: JSX.Element[] = [];
      Object.keys(TimeUnit).forEach(type => {
        returnItems.push((
          <option key={`recipe-time-unit-${type}`} value={type}>{type}</option>
        ));
      });
      return returnItems;
    };
    const recipeStepTypeItems = () => {
      const returnItems: JSX.Element[] = [];
      Object.keys(StepType).forEach(type => {
        returnItems.push((
          <option key={`recipe-time-unit-${type}`} value={type}>{type}</option>
        ));
      });
      return returnItems;
    };
    const makeStepElement = (step: IStep, index: number) => {
      return (
        <Grid container item direction='column' spacing={2}>
          <Grid
            container
            item
            alignItems='flex-start'
            direction='row'
            spacing={1}
            key={`step-element-${index}`}
            className={classes.element}
          >
            <Grid item xs={3}>
              <TextField
                label='Number'
                id={`number-${index}`}
                variant='filled'
                type='number'
                value={step.stepNumber}
                onChange={onStepItemChange}
                className={classes.stepNumber}
              />
            </Grid>
            <Grid item container direction='column' xs={8} spacing={1} className={classes.stepDetails}>
              <Grid item>
                <TextField
                  label='Description'
                  id={`description-${index}`}
                  variant='filled'
                  value={step.description}
                  onChange={onStepItemChange}
                  className={classes.ingredientDescription}
                  multiline
                />
              </Grid>
              <Grid item>
                <FormControl variant='filled' className={classes.recipeStepType}>
                  <InputLabel id='recipe-step-type-label'>Step Type</InputLabel>
                  <Select
                    native
                    name={`stepType-${index}`}
                    value={step.stepType}
                    onChange={onStepTypeChange}
                  >
                    {recipeStepTypeItems()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container item direction='row' spacing={1}>
                <Grid item>
                  <TextField
                    label='Time'
                    id={`time-${index}`}
                    variant='filled'
                    value={step.time}
                    type='number'
                    onChange={onStepItemChange}
                    className={classes.stepNumber}
                  />
                </Grid>
                <Grid item>
                  <FormControl variant='filled'>
                    <InputLabel id='recipe-step-time-unit-label'>Time Unit</InputLabel>
                    <Select
                      native
                      name={`timeUnit-${index}`}
                      value={step.timeUnit}
                      onChange={onStepTimeUnitChange}
                    >
                      {recipeTimeUnitItems()}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <IconButton id={`step-${index}`} onClick={onRemoveStep} size='small'><Delete /></IconButton>
            </Grid>
          </Grid>
          {index !== data.length - 1 ? (<Grid item><Divider variant='middle'/></Grid>) : undefined}
        </Grid>
      )
    };
    setStepElements(data.map((d, i) => makeStepElement(d, i)));
    return () => {
      setStepElements([]);
    }
  },
  [
    data,
    onRemoveStep,
    onStepItemChange,
    onStepTimeUnitChange,
    onStepTypeChange,
    classes.element,
    classes.stepNumber,
    classes.ingredientDescription,
    classes.recipeStepType,
    classes.stepDetails
  ]);

  const errorComponent = (
    !!error
    ? <Typography className={classes.errorHelperText}>{error}</Typography>
    : undefined
  );

  return (
    <div>
      <Grid container direction='row' justifyContent='space-between' className={classes.table}>
        <Grid item>
          <Typography variant='h5' className={!!error ? classes.errorText : undefined}>Steps*</Typography>
        </Grid>
        <Grid item>
          <Button variant='outlined' color='primary' startIcon={<Add/>} onClick={onAddStep}>
            Add Step
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.elementContainer}>
        {stepElements}
      </Grid>
      {errorComponent}
    </div>
  )
};
