import { Ingredient, RecipeMessage, Step, } from "../proto/recipe_pb";

export const toRecipeProto = (recipe: RecipeMessage.AsObject): RecipeMessage => {
  return new RecipeMessage()
    .setName(recipe.name)
    .setType(recipe.type)
    .setImagesList(recipe.imagesList)
    .setLinkToWebsite(recipe.linkToWebsite)
    .setIngredientsList(recipe.ingredientsList.map(ingredient => {
      return new Ingredient()
        .setName(ingredient.name)
        .setMeasurement(ingredient.measurement)
        .setUnit(ingredient.unit)
    }))
    .setStepsList(recipe.stepsList.map(step => {
      return new Step()
        .setDescription(step.description)
        .setStepNumber(step.stepNumber)
        .setTime(step.time)
        .setStepType(step.stepType)
    }))
    .setDifficulty(recipe.difficulty)
    .setKeywordsList(recipe.keywordsList)
    .setFavorited(recipe.favorited);
};
