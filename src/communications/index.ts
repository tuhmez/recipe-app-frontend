import { Empty, Pong, RecipeClient, RecipeId, RecipeMessage, Status } from '../proto/recipe_grpc_web_pb';

const proxyPort = process.env.GRPC_PROXY || '8082';
const proxyUrl = process.env.GRPC_LOCATION || window.location.hostname;

let client: RecipeClient;

export {
  IngredientUnitEnum,
  RecipeDifficultyEnum,
  RecipeTypeEnum,
  StepTypeEnum
} from './recipeTypes';

export type {
  IIngredients,
  IStatus,
  IStep,
  IRecipeMessage,
} from './recipeTypes';

export const connectClient = () => {
  client = new RecipeClient(
    `http://${proxyUrl}:${proxyPort}`,
    null,
    null
  );
};

export const addRecipe = (recipe: RecipeMessage, callback: (err: any, response: Status) => any) => {
  client.addRecipe(recipe, {}, callback);
};

export const getRecipe = (recipeId: RecipeId, callback: (err: any, response: RecipeMessage) => any) => {
  client.getRecipe(recipeId, {}, callback);
};

export const getAllRecipes = (
  dataCallback: (response: RecipeMessage) => any,
  errorCallback: (error: any) => any,
  closeCallback: () => any
) => {
  const call = client.getAllRecipes(new Empty(), {});
  call.on('data', (response: RecipeMessage) => {
    dataCallback(response);
  });
  call.on('error', (err: any) => {
    errorCallback(err);
  });
  call.on('close', () => {
    closeCallback();
  });
};

export const updateRecipe = (recipe: RecipeMessage, callback: (err: any, response: Status) => any) => {
  client.updateRecipe(recipe, {}, callback);
};

export const deleteRecipe = (recipeId: RecipeId, callback: (err: any, response: Status) => any) => {
  client.deleteRecipe(recipeId, {}, callback);
};

export const ping = () => {
  client.ping(new Empty(), {}, (err: any, response: Pong) => {
    console.info(response.toObject());
  });
};
