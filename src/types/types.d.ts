export type Nutrient = {
  nutriendId: number
  nutrientName: string
  value: number
  unitName: string
};

export type Ingredient = {
  description: string
  fdcId: number | string
  foodNutrients: Nutrient[]
  additionalDescriptions: 'other beans;tofu;with vegetables;chickpea'
  allHighlightFields: string
  commonNames: string
  dataType: string
  foodCategory: string
  foodCategoryId: number
  foodCode: number
  label: string
  servingSize: string
  servingSizeUnit: string
  id: string | number
};

export interface IngredientOption extends Ingredient {
  id: string | number
  label: string
}

export type IngredientList = Ingredient[];
