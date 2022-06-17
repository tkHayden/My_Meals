type Keys<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type Nutrients = {
  nutrients: IngredientsNutrients[];
};

export type Instructions = {
  steps: InstructionStep[];
};
type InstructionStep = {
  number: number;
  step: string;
};

interface BasicRecipeInterface {
  id: string;
  title: string;
  image: string;

}

export interface IngredientsNutrients {
  name: string;
  amount: number;
  unit: string;
}
interface SpoonacularRecipeInterface extends BasicRecipeInterface {
  analyzedInstructions: Instructions[];
  extendedIngredients: IngredientsNutrients[];
  cuisines: string[];
  diets: string[];
  nutrition: Nutrients;
  readyInMinutes: number;
  servings: number;
}

interface DetailedRecipeInterface extends BasicRecipeInterface {
  readyInMinutes: number;
  servings: number;
  ingredients: IngredientsNutrients[];
  cuisines: string;
  diets: string;
  nutrients: IngredientsNutrients[];
  instructions: string[];
 }

type SpoonaculatResponseInterface = {
  recipes: SpoonacularRecipeInterface []

}
export type BasicRecipe = Keys<BasicRecipeInterface>;
export type SpoonacularResponse = Keys<SpoonaculatResponseInterface>;
export type DetailedRecipe = Keys<DetailedRecipeInterface>;
export type SpoonacularRecipes = Keys<SpoonacularRecipeInterface>;
