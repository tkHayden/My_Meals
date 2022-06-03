interface IObjectKeys {
  [key: string]:
    | string
    | string[]
    | IngredientsNutrients[]
    | number
    | undefined;
}

export interface BasicRecipe extends IObjectKeys {
  id: string;
  title: string;
  image?: string;
  imageType?: string;
}

export interface RecipeInterface extends BasicRecipe {
  cuisines: string;
  diets: string;
  readyInMinutes: number;
  servings: number;
  instructions: string[];
  ingredients: IngredientsNutrients[];
  nutrients: IngredientsNutrients[];
}

interface IngredientsNutrients {
  name: string;
  amount: number;
  unit: string;
  meta: string[];
}
