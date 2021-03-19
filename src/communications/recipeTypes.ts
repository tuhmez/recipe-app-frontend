export enum RecipeTypeEnum {
  BREAKFAST,
  LUNCH,
  DINNER,
  APPETIZER,
  SNACK,
  DRINK
};

export enum IngredientUnitEnum {
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
};

export enum StepTypeEnum {
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
};

export enum RecipeDifficultyEnum {
  EASY,
  MEDIUM,
  HARD
};

export interface IIngredients {
  name: string;
  measurement: number;
  unit: string;
};

export interface IStep {
  stepNumber: number;
  description: string;
  time: number;
  stepType: string;
};

export interface IRecipeMessage {
  id: string;
  name: string;
  type: string;
  images: Uint8Array[];
  linkToWebsite: string;
  ingredients: IIngredients[];
  steps: IStep[];
  difficulty: string;
  keywords: string[];
  favorited: boolean;
};

export interface IStatus {
  description: string;
  code: number;
  isError: boolean;
};
