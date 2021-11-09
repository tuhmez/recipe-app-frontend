import React, { useEffect, useState } from 'react';
import { Fab, ThemeProvider } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { SocketClient } from '../../socket';
import { theme } from '../../app-styles';
import { IRecipe } from '../../common/types';
import { IErrorResponse } from '../../socket/interfaces';
import './App.css';
import SearchAppBar from '../SearchAppBar';
import { useStyles } from './styles';

export const App = () => {
  // App constants
  const serverAddress = process.env.SERVER_ADDRESS || 'localhost';
  const serverPort = process.env.SERVER_PORT || '3001';
  // States
  const [ socket, setSocket ] = useState<SocketClient | undefined>(undefined);
  // Effects
  useEffect(() => {
    const createdSocket = new SocketClient(serverAddress, serverPort, {
      addRecipeResponseFn: (res: IRecipe) => console.log(res),
      editRecipeResponseFn: (res: IRecipe) => console.log(res),
      deleteRecipeResponseFn: (res: IRecipe) => console.log(res),
      getRecipesResponseFn: (res: IRecipe[]) => console.log(res),
      getRecipeByIdResponseFn: (res: IRecipe) => console.log(res),
      errorResponseFn: (err: IErrorResponse) => console.log(err)
    });
    setSocket(createdSocket);
    return () => {
      if (!socket) return;
      socket.disconnect();

      setSocket(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Styles
  const classes = useStyles();

  if (!socket) return <div>we loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar
        searchFunction={(searchTerm: string) => console.log(searchTerm)}
        searchHeader='Recipes'
        theme={theme}
      />
      <Fab
        color='primary'
        aria-label='add'
        size='large'
        className={classes.fab}
      >
        <Add />
      </Fab>
    </ThemeProvider>
  );
};
