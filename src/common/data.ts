import { IRecipe, RecipeType, RecipeDifficulty, IIngredient, IngredientUnit, IStep, TimeUnit, StepType } from './types';
import { tacoOverview, emptyImage } from '../utilities/imageBase64';

export const exampleIngredients: IIngredient[] = [
  {
    name: 'Chicken',
    measurement: 1,
    units: IngredientUnit.POUND
  },
  {
    name: 'Tortillas',
    measurement: 3,
    units: IngredientUnit.NONE
  },
  {
    name: 'Onion',
    measurement: 0.5,
    units: IngredientUnit.NONE
  }
];

export const exampleSteps: IStep[] = [
  {
    stepNumber: 1,
    description: 'Cook chicken',
    time: 20,
    timeUnit: TimeUnit.MINUTES,
    stepType: StepType.BOIL
  },
  {
    stepNumber: 2,
    description: 'Shred chicken',
    time: 5,
    timeUnit: TimeUnit.MINUTES,
    stepType: StepType.SHRED
  },
];

export const emptyRecipe: IRecipe = {
  recipeId: '1',
  name: '',
  type: RecipeType.APPETIZER,
  images: [],
  linkToWebsite: '',
  ingredients: [],
  steps: [],
  difficulty: RecipeDifficulty.EASY,
  keywords: [],
  favorited: false
};

export const exampleRecipe: IRecipe = {
  recipeId: '1',
  name: 'Street Tacos',
  type: RecipeType.DINNER,
  images: [tacoOverview],
  linkToWebsite: 'https://cookingwithcocktailrings.com/2016-mexican-chicken-street-tacos/',
  ingredients: exampleIngredients,
  steps: exampleSteps,
  difficulty: RecipeDifficulty.MEDIUM,
  keywords: [
    'tacos',
    'mexican',
    'chicken'
  ],
  favorited: true
};

export const exampleRecipeNoImages: IRecipe = {
  recipeId: '1',
  name: 'Street Tacos',
  type: RecipeType.DINNER,
  images: [emptyImage],
  linkToWebsite: 'https://cookingwithcocktailrings.com/2016-mexican-chicken-street-tacos/',
  ingredients: exampleIngredients,
  steps: exampleSteps,
  difficulty: RecipeDifficulty.MEDIUM,
  keywords: [
    'tacos',
    'mexican',
    'chicken'
  ],
  favorited: true
};
