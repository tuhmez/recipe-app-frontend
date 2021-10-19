import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { theme } from '../app-styles';
import { RecipeKeywordList } from '../components/RecipeForm/RecipeKeywordList';
import { exampleRecipe } from '../common/data';
import { action } from '@storybook/addon-actions';

const storyExport = {
  title: 'RecipeKeywordList',
  component: RecipeKeywordList
};

export default storyExport;

export const BaseList = () => {
  const [ keywords, setKeywords ] = useState(exampleRecipe.keywords);
  const onAddKeyword = (newKeyword: string) => {
    setKeywords(prevState => {
      const newState = [...prevState];
      newState.push(newKeyword);
      return newState;
    });
  };
  const onEditKeyword = (index: number, newKeyword: string) => {
    setKeywords(prevState => {
      const newState = [...prevState];
      newState[index] = newKeyword;
      return newState;
    });
  };
  const onRemoveKeyword = (keyword: string) => {
    setKeywords(prevState => prevState.filter(k => k !== keyword))
  };
  return (
    <ThemeProvider theme={theme}>
      <RecipeKeywordList
        data={keywords}
        onAddKeyword={onAddKeyword}
        onEditKeyword={onEditKeyword}
        onRemoveKeyword={onRemoveKeyword}
      />
    </ThemeProvider>
  );
};
