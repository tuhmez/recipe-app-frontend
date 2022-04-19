import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { SocketClient } from '../../socket';
import { theme } from '../../app-styles';
import {
  IAddRecipeResponse,
  IEditRecipeResponse,
  IDeleteRecipeResponse,
  IGetRecipesResponse,
  IAddIssueResponse,
  IDeleteIssueResponse,
  IGetIssueResponse,
} from '../../socket/interfaces';
import { Routes } from '../../routes/routes';
import { possibleRoutes } from '../../routes/routeConstants';
import SearchAppBar from '../SearchAppBar';
import { useStyles } from './styles';
import './App.css';
import { ADD_ISSUE_FAILURE, ADD_ISSUE_SUCCESS, ADD_RECIPE_FAILURE, ADD_RECIPE_SUCCESS, DELETE_ISSUE_FAILURE, DELETE_ISSUE_SUCCESS, DELETE_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS, GET_ISSUE_FAILURE, GET_ISSUE_SUCCESS, GET_RECIPES_FAILURE, GET_RECIPES_REQUEST, GET_RECIPES_SUCCESS, GET_RECIPE_BY_SEARCH, UPDATE_RECIPE_FAILURE, UPDATE_RECIPE_SUCCESS } from '../../redux/reducer';
import { selectIsLoading } from '../../redux/selectors';

export const App = () => {
  // App constants
  const serverAddress = process.env.SERVER_ADDRESS || window.location.hostname;
  const serverPort = process.env.SERVER_PORT || '3001';
  const { issues, recipes } = possibleRoutes;
  // States
  const [ socket, setSocket ] = useState<SocketClient | undefined>(undefined);
  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const isLoading = useSelector(selectIsLoading);
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
          navigation(recipes);
        }
      },
      editRecipeResponseFn: (res: IEditRecipeResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: UPDATE_RECIPE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.recipe!.name} updated!`, { variant: 'success' });
          dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.recipe });
          navigation(recipes);
        }
      },
      deleteRecipeResponseFn: (res: IDeleteRecipeResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: DELETE_RECIPE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.recipe!.name} deleted!`, { variant: 'success' });
          dispatch({ type: DELETE_RECIPE_SUCCESS, payload: res.recipe });
          navigation(recipes);
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
      },
      addIssueResponseFn: (res: IAddIssueResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: ADD_ISSUE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar('Issue successfully submitted!', { variant: 'success' });
          dispatch({ type: ADD_ISSUE_SUCCESS, payload: res.issue });
          navigation(issues);
        }
      },
      deleteIssueResponseFn: (res: IDeleteIssueResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: DELETE_ISSUE_FAILURE, payload: res.error });
        } else {
          enqueueSnackbar(`${res.issue!.name} resolved!`, { variant: 'success' });
          dispatch({ type: DELETE_ISSUE_SUCCESS, payload: res.issue });
          navigation(issues);
        }
      },
      getIssuesResponseFn: (res: IGetIssueResponse) => {
        if (res.error) {
          enqueueSnackbar(res.error, { variant: 'error' });
          dispatch({ type: GET_ISSUE_FAILURE, payload: res.error });
        } else {
          if (res.issueId) {
            enqueueSnackbar(`${res.issues![0].name} retrieved!`, { variant: 'success' });
          } else {
            enqueueSnackbar('Retrieved issues!', { variant: 'success' });
          }
          dispatch({ type: GET_ISSUE_SUCCESS, payload: res });
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
      dispatch({ type: GET_RECIPES_REQUEST });
      socket.getIssues();
      socket.getRecipes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  // Navigation
  const navigation = useNavigate();
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
  // Styles
  const classes = useStyles();
  // Subcomponents
  const LoadingComponent = () => <div className={classes.loading}><CircularProgress /></div>
  // Handlers
  const onRecipeSearch = (searchTerm: string) => {
    dispatch({ type: GET_RECIPE_BY_SEARCH, payload: searchTerm });
  };

  return (
    <div>
      <CssBaseline />
      <SearchAppBar
        searchFunction={onRecipeSearch}
        theme={theme}
      />
      <Container className={classes.container}>
        {!socket || isLoading ? <LoadingComponent /> : <Routes socket={socket}/>}
      </Container>
    </div>
  );
};
