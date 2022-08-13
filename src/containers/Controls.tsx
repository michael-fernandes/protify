import { useState } from 'react';
import styled from 'styled-components';
import AddPill from '../components/ingredient/AddPill';
import { Ingredient } from '../types/types';

const ControlDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 2;
  max-width: 1100px;
  margin: 20px auto;
`;

export default function Controls() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleIngredientAdd = (newIngredient: Ingredient) => {
    setIngredients([newIngredient, ...ingredients]);
  };

  const handleIngredientRemove = (removeIngredient: Ingredient) => {
    setIngredients(ingredients.filter((i) => i.description !== removeIngredient.description));
  };

  return (
    <ControlDiv><AddPill ingredientAdd={handleIngredientAdd} /></ControlDiv>
  );
}
