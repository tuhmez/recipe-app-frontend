import { IRecipe } from "../common/types";

export const findRecipe = (searchTerm: string, recipes: IRecipe[]): IRecipe[] => {
  const regex = new RegExp(searchTerm, 'i');
  return recipes.filter(recipe => {
    if (regex.test(recipe.name)) return true;
    if (recipe.keywords.map(keyword => regex.test(keyword)).includes(true)) return true;
    if (regex.test(recipe.type)) return true;
    if (regex.test(recipe.difficulty)) return true;
    return false;
  });
};