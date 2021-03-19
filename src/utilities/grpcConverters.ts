/* eslint-disable array-callback-return */
import { IIngredients, IRecipeMessage, IStep } from "../communications";
import { Ingredient, IngredientUnits, RecipeDifficulty, RecipeMessage, RecipeType, Step, StepType } from "../proto/recipe_pb";

export const getRecipeTypeFromProto = (type: RecipeType) => {
  let recipeTypeResult: string = '';
  Object.entries(RecipeType).find((value, key) => {
    if (key === type) recipeTypeResult = value[0];
  });
  return recipeTypeResult;
};

export const getIngredientUnitsFromProto = (unit: IngredientUnits) => {
  let recipeIngrientResult: string = '';
  Object.entries(IngredientUnits).find((value, key) => {
    if (key === unit) recipeIngrientResult = value[0];
  });
  return recipeIngrientResult;
};

export const getStepTypeFromProto = (type: StepType) => {
  let stepTypeResult: string = '';
  Object.entries(StepType).find((value, key) => {
    if (key === type) stepTypeResult = value[0];
  });
  return stepTypeResult;
};

export const getRecipeDifficultyFromProto = (difficulty: RecipeDifficulty) => {
  let recipeDifficultyResult: string = '';
  Object.entries(RecipeDifficulty).find((value, key) => {
    if (key === difficulty) recipeDifficultyResult = value[0];
  });
  return recipeDifficultyResult;
};

export const toRecipeProto = (recipe: IRecipeMessage): RecipeMessage => {
  const ingredients: Ingredient[] = recipe.ingredients.map(ingredient => {
    return new Ingredient()
      .setName(ingredient.name)
      .setMeasurement(ingredient.measurement)
      // @ts-ignore
      .setUnit(IngredientUnits[ingredient.unit]);
  });

  const steps: Step[] = recipe.steps.map(step => {
    return new Step()
      .setStepNumber(step.stepNumber)
      .setDescription(step.description)
      .setTime(step.time)
      // @ts-ignore
      .setStepType(StepType[step.stepType]);
  });

  return new RecipeMessage()
    .setName(recipe.name)
    // @ts-ignore
    .setType(RecipeType[recipe.type])
    .setImagesList(recipe.images)
    .setLinkToWebsite(recipe.linkToWebsite)
    .setIngredientsList(ingredients)
    .setStepsList(steps)
    // @ts-ignore
    .setDifficulty(RecipeDifficulty[recipe.difficulty])
    .setKeywordsList(recipe.keywords)
    .setFavorited(recipe.favorited);
};

export const fromRecipeProto = (recipeProto: RecipeMessage): IRecipeMessage => {
  const ingredientList: IIngredients[] = recipeProto.getIngredientsList().map((ingredient, i, arr) => {
    return {
      name: ingredient.getName(),
      measurement: ingredient.getMeasurement(),
      unit: getIngredientUnitsFromProto(ingredient.getUnit())
    };
  });
  const stepList: IStep[] = recipeProto.getStepsList().map((step, i, arr) => {
    return {
      stepNumber: step.getStepNumber(),
      description: step.getDescription(),
      time: step.getTime(),
      stepType: getStepTypeFromProto(step.getStepType())
    }
  });

  return {
    id: recipeProto.getId(),
    name: recipeProto.getName(),
    type: getRecipeTypeFromProto(recipeProto.getType()),
    images: recipeProto.getImagesList() as Uint8Array[],
    linkToWebsite: recipeProto.getLinkToWebsite(),
    ingredients: ingredientList,
    steps: stepList,
    difficulty: getRecipeDifficultyFromProto(recipeProto.getDifficulty()),
    keywords: recipeProto.getKeywordsList(),
    favorited: recipeProto.getFavorited()
  };
};
