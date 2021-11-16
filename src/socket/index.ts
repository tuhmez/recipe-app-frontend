import { io, Socket } from 'socket.io-client';
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
  PING,
  PONG
} from './constants';
import {
  IAddRecipeResponse,
  IEditRecipeResponse,
  IDeleteRecipeResponse,
  IGetRecipesResponse,
  IPingResponse,
  IAddRecipeRequest,
  IEditRecipeRequest,
  IDeleteRecipeRequest,
  IGetRecipeByIdRequest
} from './interfaces';

export interface ISocketCallbacks {
  addRecipeResponseFn: (res: IAddRecipeResponse) => void;
  editRecipeResponseFn: (res: IEditRecipeResponse) => void;
  deleteRecipeResponseFn: (res: IDeleteRecipeResponse) => void;
  getRecipesResponseFn: (res: IGetRecipesResponse) => void;
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
    } = callbacks;
    const sock = io(url);

    sock
      .on(ADD_RECIPE_RESPONSE, (res: IAddRecipeResponse) => {
        addRecipeResponseFn(res);
      })
      .on(EDIT_RECIPE_RESPONSE, (res: IEditRecipeResponse) => {
        editRecipeResponseFn(res);
      })
      .on(DELETE_RECIPE_RESPONSE, (res: IDeleteRecipeResponse) => {
        deleteRecipeResponseFn(res);
      })
      .on(GET_RECIPES_RESPONSE, (res: IGetRecipesResponse) => {
        getRecipesResponseFn(res);
      })
      .on(PONG, (res: IPingResponse) => {
        console.log(res);
      });
    this.socket = sock;
  }

  getSocket(): Socket {
    return this.socket;
  }

  addRecipe(req: IAddRecipeRequest) {
    this.socket.emit(ADD_RECIPE_REQUEST, req);
  }

  editRecipe(req: IEditRecipeRequest) {
    this.socket.emit(EDIT_RECIPE_REQUEST, req);
  }

  deleteRecipe(req: IDeleteRecipeRequest) {
    this.socket.emit(DELETE_RECIPE_REQUEST, req);
  }

  getRecipes() {
    this.socket.emit(GET_RECIPES_REQUEST);
  }

  getRecipeById(req: IGetRecipeByIdRequest) {
    this.socket.emit(GET_RECIPE_BY_ID_REQUEST, req);
  }

  ping() {
    this.socket.emit(PING);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
