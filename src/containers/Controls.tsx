import { useState } from 'react';
import styled from 'styled-components';
import AddPill from '../components/ingredient/AddPill';
import { Ingredient } from '../types/types';
import IngredientPill from './IngredientPill';

const ControlDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1100px;
  margin: 20px auto;
`;

export default function Controls() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleIngredientAdd = (newIngredient: Ingredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const handleDelete = (fdcId: string | number) => {
    setIngredients(
      ingredients.filter((ing) => ing.fdcId === fdcId),
    );
  };

  return (
    <ControlDiv>
      {ingredients.map((ingredient: Ingredient, index) => (
        <IngredientPill
          ingredientAdd={handleIngredientAdd}
          key={`${ingredient.label} + ${index % 5}`}
          ingredient={ingredient}
          handleDelete={handleDelete}
        />
      ))}
      {ingredients.length < 4
        && <AddPill ingredientAdd={handleIngredientAdd} key={ingredients.length} />}
    </ControlDiv>
  );
}
