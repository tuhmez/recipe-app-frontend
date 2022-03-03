import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import { theme } from '../app-styles';
import { IIngredient } from '../common/types';
import { exampleIngredients } from '../common/data';
import { RecipeIngredientTable } from '../components/RecipeForm/RecipeIngredientTable';

const storyExport = {
  title: 'RecipeIngredientTable',
  component: RecipeIngredientTable
};

export default storyExport;

export const BaseTable = () => {
  const [ ingredientData, setIngredientData] = useState(exampleIngredients);

  const onAddIngredient = (ingredient: IIngredient): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setIngredientData(prevState => [...prevState, ingredient]);
      resolve(true);
    });
  };
  const onEditIngredient = (ingredient: IIngredient, index: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setIngredientData(prevState => {
        const newState = [...prevState];
        newState[index] = ingredient;
        return newState;
      });
      resolve(true);
    });
  };
  const onRemoveIngredient = (event: React.MouseEvent<HTMLLIElement>) => {
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
        onAddIngredient={onAddIngredient}
        onRemoveIngredient={onRemoveIngredient}
        onEditIngredient={onEditIngredient}
        data={ingredientData}
      />
    </ThemeProvider>
  )
};
