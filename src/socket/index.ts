import { io, Socket } from 'socket.io-client';
import {
  IRecipe
} from '../common/types';
import {
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_RESPONSE,
  EDIT_RECIPE_REQUEST,
  EDIT_RECIPE_RESPONSE,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_RESPONSE,
  GET_RECIPES_REQUEST,
  GET_RECIPES_RESPONSE,
  GET_RECIPE_BY_ID_REQUEST,
  GET_RECIPE_BY_ID_RESPONSE,
  ERROR,
  PING,
  PONG
} from './constants';
import { IErrorResponse, IPingResponse, IRecipeByIdRequest, IUpdateRecipeRequest } from './interfaces';

export interface ISocketCallbacks {
  addRecipeResponseFn: (res: IRecipe) => void;
  editRecipeResponseFn: (res: IRecipe) => void;
  deleteRecipeResponseFn: (res: IRecipe) => void;
  getRecipesResponseFn: (res: IRecipe[]) => void;
  getRecipeByIdResponseFn: (res: IRecipe) => void;
  errorResponseFn: (err: IErrorResponse) => void;
}

export class SocketClient {
  private socket: Socket;
  constructor(serverAddress: string, serverPort: string, callbacks: ISocketCallbacks) {
    const url = `${serverAddress}:${serverPort}`;
    const {
      addRecipeResponseFn,
      editRecipeResponseFn,
      deleteRecipeResponseFn,
      getRecipesResponseFn,
      getRecipeByIdResponseFn,
      errorResponseFn
    } = callbacks;
    const sock = io(url);

    sock
      .on(ADD_RECIPE_RESPONSE, (res: IRecipe) => {
        addRecipeResponseFn(res);
      })
      .on(EDIT_RECIPE_RESPONSE, (res: IRecipe) => {
        editRecipeResponseFn(res);
      })
      .on(DELETE_RECIPE_RESPONSE, (res: IRecipe) => {
        deleteRecipeResponseFn(res);
      })
      .on(GET_RECIPES_RESPONSE, (res: IRecipe[]) => {
        getRecipesResponseFn(res);
      })
      .on(GET_RECIPE_BY_ID_RESPONSE, (res: IRecipe) => {
        getRecipeByIdResponseFn(res);
      })
      .on(ERROR, (err: IErrorResponse) => {
        errorResponseFn(err);
      })
      .on(PONG, (res: IPingResponse) => {
        console.log(res);
      });
    this.socket = sock;
  }

  getSocket(): Socket {
    return this.socket;
  }

  addRecipe(req: IRecipe) {
    this.socket.emit(ADD_RECIPE_REQUEST, req);
  }

  editRecipe(req: IUpdateRecipeRequest) {
    this.socket.emit(EDIT_RECIPE_REQUEST, req);
  }

  deleteRecipe(req: IRecipeByIdRequest) {
    this.socket.emit(DELETE_RECIPE_REQUEST, req);
  }

  getRecipes() {
    this.socket.emit(GET_RECIPES_REQUEST);
  }

  getRecipeById(req: IRecipeByIdRequest) {
    this.socket.emit(GET_RECIPE_BY_ID_REQUEST, req);
  }

  ping() {
    this.socket.emit(PING);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
