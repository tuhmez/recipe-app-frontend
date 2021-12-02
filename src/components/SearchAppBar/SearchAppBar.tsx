import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  InputBase,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Home, Search } from '@material-ui/icons';

import { useStyles } from './styles';
import { useLocation, useNavigate } from 'react-router';
import { possibleRoutes } from '../../routes/routeConstants';

interface SearchAppBarProps {
  searchFunction: (searchTerm: string) => void;
  searchHeader: string;
  theme: Theme;
}

const SearchAppBar = (props: SearchAppBarProps) => {
  // Props deconstruction
  const { searchFunction, searchHeader, theme } = props;
  // States
  const [ search, setSearch ] = useState('');
  // Navigation
  const navigate = useNavigate();
  // Styles
  const classes = useStyles(theme);
  // Handlers
  const changeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const searchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchFunction(search);
    }
  };
  const onHomeButtonClick = () => {
    navigate(possibleRoutes.main);
  };

  return (
    <div className={classes.root}>
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          <IconButton
            onClick={onHomeButtonClick}
            color='inherit'
            className={classes.menuButton}
          >
            <Home />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            {searchHeader}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
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
