import { ESSENTIAL_AMINO_ACID_NAMES } from '../constants/Nutrients';
import { Ingredient, Nutrient } from '../types/types';

const getProtein = (food: Ingredient) => food?.foodNutrients?.filter(
  ({ nutrientName }: Nutrient) => ESSENTIAL_AMINO_ACID_NAMES.includes(nutrientName),
);

export default getProtein;
