export interface IRecipe {
  id: string;
  name: string;
  type: RecipeType;
  images: string[];
  linkToWebsite: string;
  ingredients: IIngredient[];
  steps: IStep[];
  difficulty: RecipeDifficulty;
  keywords: string[];
  favorited: boolean;
}

export enum RecipeType {
  BREAKFAST,
  LUNCH,
  DINNER,
  APPETIZER,
  SNACK,
  DRINK
}

export interface IIngredient {
  name: string;
  measurement: number;
  units: IngredientUnit;
}

export enum IngredientUnit {
  BOTTLE,
  CAN,
  CLOVE,
  CUP,
  GALLON,
  NONE,
  OUNCE,
  PINCH,
  PINT,
  POUND,
  QUART,
  SHOT,
  TABLESPOON,
  TEASPOON
}

export interface IStep {
  stepNumber: number;
  description: string;
  time: number;
  timeUnit: TimeUnit;
  stepType: StepType;
}

export enum TimeUnit {
  SECONDS,
  MINUTES,
  HOURS
}

export enum StepType {
  BAKE,
  BOIL,
  BROIL,
  COOK,
  CUT,
  CHOP,
  DICE,
  FREEZE,
  FRY,
  GRILL,
  JUICE,
  MICROWAVE,
  MIX,
  POUR,
  PREPARE,
  ROAST,
  SEASON,
  SEPARATE,
  SIMMER,
  SHRED,
  STEW,
  STEAM,
  STIR,
  TOP,
  WASH,
  ZEST
}

export enum RecipeDifficulty {
  EASY,
  MEDIUM,
  HARD
}
