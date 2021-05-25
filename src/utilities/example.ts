import { Ingredient, IngredientUnits, RecipeDifficulty, RecipeMessage, RecipeType, Step, StepType } from '../proto/recipe_pb';
import { tacoCloseup, tacoOverview, emptyImage } from './imageBase64';

export const recipeIngredientListExample = [
  new Ingredient().setName('Chicken').setMeasurement(1).setUnit(IngredientUnits.POUND),
  new Ingredient().setName('Jalapeno').setMeasurement(1).setUnit(IngredientUnits.NONE),
  new Ingredient().setName('Tortillas').setMeasurement(20).setUnit(IngredientUnits.NONE)
];

export const recipeStepsListExample = [
  new Step().setDescription('Cook chicken').setStepNumber(1).setStepType(StepType.COOK).setTime(5),
  new Step().setDescription('Chop jalapeno').setStepNumber(2).setStepType(StepType.CHOP).setTime(1),
  new Step().setDescription('Eat').setStepNumber(3).setStepType(StepType.BAKE).setTime(2)
];

export const recipeImages = [
  tacoOverview,
  tacoCloseup
];

export const emptyRecipeImages = [
  emptyImage
];

export const recipeExample = new RecipeMessage()
  .setName('Example Recipe')
  .setType(RecipeType.DINNER)
  .setLinkToWebsite("https://cookingwithcocktailrings.com/2016-mexican-chicken-street-tacos/")
  .setDifficulty(RecipeDifficulty.MEDIUM)
  .setFavorited(true)
  .setKeywordsList(['tacos', 'street tacos', 'chicken', 'mexican'])
  .setIngredientsList(recipeIngredientListExample)
  .setStepsList(recipeStepsListExample)
  .setImagesList(recipeImages);

  export const recipeExampleNoImages = new RecipeMessage()
  .setName('Example Recipe')
  .setType(RecipeType.DINNER)
  .setLinkToWebsite("https://cookingwithcocktailrings.com/2016-mexican-chicken-street-tacos/")
  .setDifficulty(RecipeDifficulty.MEDIUM)
  .setFavorited(true)
  .setKeywordsList(['tacos', 'street tacos', 'chicken', 'mexican'])
  .setIngredientsList(recipeIngredientListExample)
  .setStepsList(recipeStepsListExample)
  .setImagesList(emptyRecipeImages);