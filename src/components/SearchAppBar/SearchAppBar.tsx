import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import { ArrowBackIos, InfoOutlined, Menu, MenuBookOutlined, Search } from '@material-ui/icons';

import { useStyles } from './styles';
import { useLocation, useNavigate } from 'react-router';

interface SearchAppBarProps {
  searchFunction: (searchTerm: string) => void;
  theme: Theme;
}
interface IDrawerMenuItemIcons {
  [key: string]: {
    [key: string]: JSX.Element,
  }
}

const drawerItems = ['Recipes', 'About'];
const drawerMenuItemIcons: IDrawerMenuItemIcons = {
  // recipes: <MenuBookOutlined fontSize='small' />,
  // about: <InfoOutlined fontSize='small' />
  recipes: {
    normal: <MenuBookOutlined fontSize='small' />,
    active: <MenuBookOutlined fontSize='small' color='primary' />
  },
  about: {
    normal: <InfoOutlined fontSize='small' />,
    active: <InfoOutlined fontSize='small' color='primary' />,
  }
};


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
      if (strippedLocationPathname.includes(i.toLowerCase())) {
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


  const drawerListItems = drawerItems.map(i => {
    const itemLowerCase = i.toLowerCase();
    const onItemClick = () => {
      navigate(`/${itemLowerCase}`);
      setSearchHeader(i);
      setIsMenuOpen(false);
    };

    const isActive = searchHeader === i;
    const { active, normal } = drawerMenuItemIcons[itemLowerCase];
    const iconToUse = isActive ? active : normal
    const classForText = isActive ? classes.selectedItem : classes.normalItem;
    
    return (
        <ListItem
          button
          key={`${i}-listitem`}
          onClick={onItemClick}
        >
          <ListItemIcon>
            {iconToUse}
          </ListItemIcon>
          <ListItemText className={classForText} primary={i} />
        </ListItem>
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
        {/* need some sort of logo or padding text*/}
        <List>
          {drawerListItems}
        </List>
      </Drawer>
    </div>
  );
};

export default SearchAppBar;
