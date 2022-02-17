import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { SocketClient } from '../../socket';
import { theme } from '../../app-styles';
import {
  IAddRecipeResponse,
  IEditRecipeResponse,
  IDeleteRecipeResponse,
  IGetRecipesResponse,
} from '../../socket/interfaces';
import { Routes } from '../../routes/routes';
import { possibleRoutes } from '../../routes/routeConstants';
import SearchAppBar from '../SearchAppBar';
import { useStyles } from './styles';
import './App.css';
import { ADD_RECIPE_FAILURE, ADD_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS, GET_RECIPES_FAILURE, GET_RECIPES_SUCCESS, UPDATE_RECIPE_FAILURE, UPDATE_RECIPE_SUCCESS } from '../../redux/reducer';

export const App = () => {
  // App constants
  const serverAddress = process.env.SERVER_ADDRESS || window.location.hostname;
  const serverPort = process.env.SERVER_PORT || '3001';
  const { main } = possibleRoutes;
  // States
  const [ socket, setSocket ] = useState<SocketClient | undefined>(undefined);
  // Dispatch
  const dispatch = useDispatch();
  // Effects
  useEffect(() => {
    const createdSocket = new SocketClient(serverAddress, serverPort, {
      addRecipeResponseFn: (res: IAddRecipeResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: ADD_RECIPE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.recipe!.name} added!`, { variant: 'success' });
          dispatch({ type: ADD_RECIPE_SUCCESS, payload: res.recipe });
          navigation(main);
        }
      },
      editRecipeResponseFn: (res: IEditRecipeResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: UPDATE_RECIPE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.recipe!.name} updated!`, { variant: 'success' });
          dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.recipe });
          navigation(main);
        }
      },
      deleteRecipeResponseFn: (res: IDeleteRecipeResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: DELETE_RECIPE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.recipe!.name} deleted!`, { variant: 'success' });
          dispatch({ type: DELETE_RECIPE_SUCCESS, payload: res.recipe });
          navigation(main);
        }
      },
      getRecipesResponseFn: (res: IGetRecipesResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: GET_RECIPES_FAILURE, payload: res.error });
        } else {
          if (res.recipeId) {
            enqueueSnackbar(`${res.recipes![0].name} retrieved!`, { variant: 'success' });
          } else {
            enqueueSnackbar('Retrieved recipes!', { variant: 'success' });
          }
          dispatch({ type: GET_RECIPES_SUCCESS, payload: res });
        }
      }
    });
    setSocket(createdSocket);
    return () => {
      if (!socket) return;
      socket.disconnect();

      setSocket(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (socket) {
      socket.getRecipes();
    }
  }, [socket]);
  // Navigation
  const navigation = useNavigate();
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
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
