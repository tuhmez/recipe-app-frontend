import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import { theme } from '../app-styles';
import { IngredientUnit } from '../common/types';
import { exampleIngredients } from '../common/data';
import { RecipeIngredientTable } from '../components/RecipeForm/RecipeIngredientTable';

const storyExport = {
  title: 'RecipeIngredientTable',
  component: RecipeIngredientTable
};

export default storyExport;

export const BaseTable = () => {
  const [ ingredientData, setIngredientData] = useState(exampleIngredients);
  const onIngredientItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIngredientData(prevState => {
      const newState = [...prevState];
      const elementId = event.target.id;
      const property = elementId.split('-')[0];
      const index = Number(elementId.split('-')[1]);
      const newItem = event.target.value;
      if (property === 'name') {
        newState[index].name = newItem;
      } else {
        newState[index].measurement = Number(newItem);
      }
      return newState;
    });
  };

  const onIngredientUnitChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setIngredientData(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].units = newItem as IngredientUnit;
      return newState;
    });
  };

  const onAddIngredient = () => {
    setIngredientData(prevState => {
      const newState = [...prevState];
      newState.push({name: '', measurement: 0, units: IngredientUnit.NONE});
      return newState;
    });
  };

  const onRemoveIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIngredientData(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <RecipeIngredientTable
        onIngredientItemChange={onIngredientItemChange}
        onIngredientUnitChange={onIngredientUnitChange}
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
        data={ingredientData}
      />
    </ThemeProvider>
  )
};
