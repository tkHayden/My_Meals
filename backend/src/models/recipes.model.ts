interface IObjectKeys {
  [key: string]:
    | string
    | number
    | IngredientsNutrients[]
    | Nutrients
    | string[]
    | Instructions[]
    | undefined;
}
export interface RecipeInterface extends IObjectKeys {
  id: string;
  title: string;
  image?: string;
  imageType?: string;
}

export type FeatureResults = {
  recipes: RecipeInterface[];
};

export interface SearchResults {
  results: RecipeInterface[];
  offset: number;
  number: number;
  totalResults: number;
}

interface SpoonacularBasicRecipe extends RecipeInterface {
  extendedIngredients: IngredientsNutrients[];
  readyInMinutes: number;
  servings: number;
  nutrition: Nutrients;
}
export interface SpoonacularRecipe extends SpoonacularBasicRecipe {
  cuisines: string[];
  diets: string[];
  analyzedInstructions: Instructions[];
}

type Nutrients = {
  nutrients: IngredientsNutrients[];
};

type Instructions = {
  steps: InstructionStep[];
};
type InstructionStep = {
  number: number;
  step: string;
};

export interface IngredientsNutrients {
  name: string;
  amount: number;
  unit: string;
  meta: string[];
}

export interface RecipeResult extends SpoonacularBasicRecipe {
  cuisines: string;
  diets: string;
  instructions: string[];
}
