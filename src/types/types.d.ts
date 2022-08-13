export type Nutrient = {
  nutriendId: number
  nutrientName: string
  value: number
  unitName: string
};

export type Ingredient = {
  description: string
  fdcId: number
  foodNutrients: Nutrient[]
};

export type IngredientList = Ingredient[];
