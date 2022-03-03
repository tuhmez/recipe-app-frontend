import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import { theme } from '../app-styles';
import { IStep, TimeUnit} from '../common/types';
import { exampleSteps } from '../common/data';
import { RecipeStepTable } from '../components/RecipeForm/RecipeStepTable';

const storyExport = {
  title: 'RecipeStepTable',
  component: RecipeStepTable
};

export default storyExport;

export const BaseTable = () => {
  const [ stepData, setStepData ] = useState(exampleSteps);

  const onAddStep = (step: IStep): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setStepData(prevState => [...prevState, step]);
      resolve(true);
    });
  };

  const onEditStep = (step: IStep, index: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setStepData(prevState => {
        const newState = [...prevState];
        newState[index] = step;
        return newState;
      });
      resolve(true);
    });
  }

  const onRemoveStep = (event: React.MouseEvent<HTMLLIElement>) => {
    setStepData(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <RecipeStepTable
        data={stepData}
        onAddStep={onAddStep}
        onEditStep={onEditStep}
        onRemoveStep={onRemoveStep}
      />
    </ThemeProvider>
  )
};
