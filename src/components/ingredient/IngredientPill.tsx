import React, { useState } from 'react';
import { Ingredient } from '../../types/types';
import AddIngredient from './AddPill';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
};

export default function IngredientPill({ ingredientAdd }: Props) {
  const [isActive, setActive] = useState(false);

  return (
    <div>{isActive && <AddIngredient ingredientAdd={ingredientAdd} />}</div>
  );
}
