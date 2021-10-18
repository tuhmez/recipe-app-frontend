import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import { theme } from '../app-styles';
import { StepType, TimeUnit} from '../common/types';
import { exampleSteps } from '../common/data';
import { RecipeStepTable } from '../components/RecipeForm/RecipeStepTable';

const storyExport = {
  title: 'RecipeStepTable',
  component: RecipeStepTable
};

export default storyExport;

export const BaseTable = () => {
  const [ stepData, setStepData ] = useState(exampleSteps);
  const onStepItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStepData(prevState => {
      const newState = [...prevState];
      const elementId = event.target.id;
      const property = elementId.split('-')[0];
      const index = Number(elementId.split('-')[1]);
      const newItem = event.target.value;
      if (property === 'number') {
        newState[index].stepNumber = newItem as any;
      } else {
        newState[index].description = newItem;
      }
      return newState;
    });
  };

  const onAddStep = () => {
    setStepData(prevState => {
      const newState = [...prevState];
      newState.push({
        stepNumber: newState.length + 1,
        description: '',
        time: 0,
        timeUnit: TimeUnit.MINUTES,
        stepType: StepType.NONE
    });
      return newState;
    });
  };

  const onRemoveStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStepData(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      newState.filter(s => s.stepNumber > index + 1).forEach(s => s.stepNumber = s.stepNumber - 1);
      return newState;
    });
  };

  const onStepTimeUnitChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setStepData(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].timeUnit = newItem as TimeUnit;
      return newState;
    });
  };

  const onStepTypeChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setStepData(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].stepType = newItem as StepType;
      return newState;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <RecipeStepTable
        data={stepData}
        onAddStep={onAddStep}
        onRemoveStep={onRemoveStep}
        onStepItemChange={onStepItemChange}
        onStepTimeUnitChange={onStepTimeUnitChange}
        onStepTypeChange={onStepTypeChange}
      />
    </ThemeProvider>
  )
};
