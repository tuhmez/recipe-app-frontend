import React, { useState } from 'react';
import {
  AppBar,
  InputBase,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './styles';

interface SearchAppBarProps {
  searchFunction: (searchTerm: string) => void;
  searchHeader: string;
  theme: Theme;
}

const SearchAppBar = (props: SearchAppBarProps) => {
  const { searchFunction, searchHeader, theme } = props;

  const classes = useStyles(theme);
  const [ search, setSearch ] = useState('');

  const changeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const searchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchFunction(search);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            {searchHeader}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={changeSearchInput}
              onKeyDown={searchKeyPress}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SearchAppBar;
