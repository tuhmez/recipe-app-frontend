import React from 'react';
import { action } from '@storybook/addon-actions';

import { theme } from '../app-styles';
import SearchAppBar from '../components/SearchAppBar';
import { ThemeProvider } from '@material-ui/core';

const storyExport = {
  title: 'SearchAppBar',
  component: SearchAppBar
};

export default storyExport;

export const baseSearchBar = () =>{
  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar
        searchFunction={action('searchFunction')}
        theme={theme}
      />
    </ThemeProvider>
  )
};
