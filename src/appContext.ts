import { createContext } from 'react';
import { Ingredient } from './types/types.d';

const appContext = createContext(
  {
    ingredients: [] as Ingredient[],
    setIngredients: (() => undefined) as (i: Ingredient[]) => void,
  },
);

export default appContext;
