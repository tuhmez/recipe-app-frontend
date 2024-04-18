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

import { IStep, TimeUnit } from '../../common/types';
import { useStyles } from './styles';
import { RecipeStep } from './RecipeStep';

export interface Props {
  onAddStep: (step: IStep) => Promise<boolean>;
  onRemoveStep: (event: React.MouseEvent<HTMLLIElement>) => void;
  onEditStep: (step: IStep, index: number) => Promise<boolean>;
  data: IStep[];
  error?: string
}

const defaultStepState: IStep = {
  description: '',
  time: 0,
  timeUnit: TimeUnit.MINUTES
}

const timeUnitOptions = Object.keys(TimeUnit).map(type => <option key={`timeUnitOption-${type}`} value={type}>{type}</option>);

export const RecipeStepTable = (props: Props) => {
  // Destructure props
  const { onAddStep, onRemoveStep, onEditStep, data, error } = props;
  // States
  const [stepElements, setStepElements] = useState<JSX.Element[]>([]);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [dialogStepData, setDialogStepData] = useState<IStep>(defaultStepState);
  const [isNewStep, setIsNewStep] = useState(true);
  const [editStepIndex, setEditStepIndex] = useState(0);
  // Styles
  const classes = useStyles();
  // Handlers
  const onStepDialogToggle = () => setIsStepDialogOpen(prevState => !prevState);
  const onDialogStepDataDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDialogStepData(prevState => ({ ...prevState, description: event.target.value as string }));
  const onDialogStepDataTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setDialogStepData(prevState => ({ ...prevState, time: parseFloat(event.target.value) }));
  const onDialogStepDataTimeUnitChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => setDialogStepData(prevState => ({ ...prevState, timeUnit: event.target.value as TimeUnit }));
  const onCancelDialogStep = () => {
    setDialogStepData(defaultStepState);
    onStepDialogToggle();
  };
  const onAddDialogStep = async () => {
    const isOnAddStepSuccessful = await onAddStep(dialogStepData);
    if (isOnAddStepSuccessful) {
      onStepDialogToggle();
      setDialogStepData(defaultStepState);
    }
  };
  const onEditDialogStep = async () => {
    const isEditStepSuccessful = await onEditStep(dialogStepData, editStepIndex);
    if (isEditStepSuccessful) {
      onStepDialogToggle();
      setIsNewStep(true);
      setDialogStepData(defaultStepState);
    }
  };
  // Handlers - Callbacks Hooks
  const handleRemoveStep = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    onRemoveStep(event);
  }, [onRemoveStep])
  // Effects
  useEffect(() => {
    setStepElements(data.map((step, index) =>
      <RecipeStep
        step={step}
        index={index}
        handleRemoveStep={handleRemoveStep}
        onStepDialogToggle={onStepDialogToggle}
        setDialogStepData={setDialogStepData}
        setEditStepIndex={setEditStepIndex}
        setIsNewStep={setIsNewStep}
      />
    ))
  }, [handleRemoveStep, data]);
  // Subcomponents
  const errorComponent = (
    !!error
      ? <Typography className={classes.errorHelperText}>{error}</Typography>
      : undefined
  );

  return (
    <div>
      <Grid container direction='row' justifyContent='space-between' className={classes.table}>
        <Grid item key='step-header-text'>
          <Typography variant='h5' className={!!error ? classes.errorText : undefined}>Steps*</Typography>
        </Grid>
        <Grid item key='add-step-button'>
          <Button variant='outlined' color='primary' startIcon={<Add />} onClick={onStepDialogToggle}>
            Add Step
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.elementContainer}>
        {stepElements}
      </Grid>
      {errorComponent}
      <Dialog
        open={isStepDialogOpen}
      >
        <DialogTitle>{isNewStep ? 'Add' : 'Edit'} Step</DialogTitle>
        <DialogContent className={classes.stepDialog}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <TextField
                label='Description'
                id='new-step-description'
                key='new-step-description'
                variant='filled'
                value={dialogStepData.description}
                onChange={onDialogStepDataDescriptionChange}
                multiline
                fullWidth
                minRows={3}
                maxRows={3}
                autoFocus
              />
            </Grid>
              <Grid item>
                <TextField
                  label='Time'
                  id='new-step-time'
                  key='new-step-time'
                  variant='filled'
                  value={dialogStepData.time}
                  type='number'
                  onChange={onDialogStepDataTimeChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FormControl variant='filled' fullWidth>
                  <InputLabel id='recipe-step-time-unit-label'>Time Unit</InputLabel>
                  <Select
                    native
                    name='new-step-timeUnit'
                    key='new-step-timeUnit'
                    value={dialogStepData.timeUnit}
                    onChange={onDialogStepDataTimeUnitChange}
                  >
                    {timeUnitOptions}
                  </Select>
                </FormControl>
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={onCancelDialogStep}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={isNewStep ? onAddDialogStep : onEditDialogStep}
            disabled={dialogStepData.description === ''}
          >
            {isNewStep ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
