import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  InputBase,
  MenuItem,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import { ArrowBackIos, Info, Menu, MenuBook, Search } from '@material-ui/icons';

import { useStyles } from './styles';
import { useLocation, useNavigate } from 'react-router';
import { possibleRoutes } from '../../routes/routeConstants';

const drawerItems = ['Recipes', 'About'];

interface SearchAppBarProps {
  searchFunction: (searchTerm: string) => void;
  theme: Theme;
}

const SearchAppBar = (props: SearchAppBarProps) => {
  // Props deconstruction
  const { searchFunction, theme } = props;
  // States
  const [ search, setSearch ] = useState('');
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ searchHeader, setSearchHeader ] = useState('');
  // Navigation
  const navigate = useNavigate();
  // Location
  const location = useLocation();
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
  const onMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  const onGoBackClick = () => {
    navigate(-1);
  };

  // Effects
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchHeader('Recipes');
      return;
    }
    const strippedLocationPathname = location.pathname.substring(1);
    drawerItems.forEach(i => {
      if (strippedLocationPathname.includes(i)) {
        setSearchHeader(i);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navButton = () => {
    const strippedPathname = location.pathname.substring(1);
    if (location.pathname === '/' || drawerItems.map(i => i.toLowerCase()).includes(strippedPathname)) {
      return (
        <IconButton
        onClick={onMenuToggle}
        color='inherit'
        className={classes.menuButton}
      >
        <Menu />
      </IconButton>
      )
    } else {
      return (
        <IconButton
        onClick={onGoBackClick}
        color='inherit'
        className={classes.menuButton}
      >
        <ArrowBackIos />
      </IconButton>
      );
    }
  };

  const drawerMenuItemIcons: { [key: string]: JSX.Element } = {
    recipes: <MenuBook />,
    about: <Info />
  };

  const drawerMenuItems = drawerItems.map(i => {
    const itemLowerCase = i.toLowerCase();
    const onItemClick = () => {
      navigate(`/${itemLowerCase}`);
      setSearchHeader(i);
      setIsMenuOpen(false);
    };
    return (
      <MenuItem key={`${i}-listitem`} onClick={onItemClick}>
        {drawerMenuItemIcons[itemLowerCase]} {i}
      </MenuItem>
    );
  });

  return (
    <div className={classes.root}>
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          {navButton()}
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
      <Drawer
        open={isMenuOpen}
        anchor='left'
        onClose={onMenuToggle}
      >
        {drawerMenuItems}
      </Drawer>
    </div>
  );
};

export default SearchAppBar;
