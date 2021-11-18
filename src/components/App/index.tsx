import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { SocketClient } from '../../socket';
import { theme } from '../../app-styles';
import { IRecipe } from '../../common/types';
import {
  IAddRecipeResponse,
  IEditRecipeResponse,
  IDeleteRecipeResponse,
  IGetRecipesResponse,
} from '../../socket/interfaces';
import { Routes } from '../../routes/routes';
import SearchAppBar from '../SearchAppBar';
import { useStyles } from './styles';
import './App.css';

export const App = () => {
  // App constants
  const serverAddress = process.env.SERVER_ADDRESS || 'localhost';
  const serverPort = process.env.SERVER_PORT || '3001';
  // States
  const [ socket, setSocket ] = useState<SocketClient | undefined>(undefined);
  // Dispatch
  const dispatch = useDispatch();
  // Effects
  useEffect(() => {
    const createdSocket = new SocketClient(serverAddress, serverPort, {
      addRecipeResponseFn: (res: IAddRecipeResponse) => {
        if (res.error) {
          // dispatch failure
        } else {
          // dispatch success
        }
      },
      editRecipeResponseFn: (res: IEditRecipeResponse) => console.log(res),
      deleteRecipeResponseFn: (res: IDeleteRecipeResponse) => console.log(res),
      getRecipesResponseFn: (res: IGetRecipesResponse) => console.log(res)
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
    <div>
      <CssBaseline />
      <SearchAppBar
        searchFunction={(searchTerm: string) => console.log(searchTerm)}
        searchHeader='Recipes'
        theme={theme}
      />
      <Container className={classes.container}>
        <Routes socket={socket}/>
      </Container>
    </div>
  );
};
