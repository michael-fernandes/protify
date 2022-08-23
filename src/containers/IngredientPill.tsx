import { Button } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import AddPill, { Pill } from '../components/ingredient/AddPill';
import { Ingredient } from '../types/types';

type Props = {
  ingredient: Ingredient
  handleDelete: (id: string | number) => void
  ingredientAdd: (newIngredient: Ingredient) => void
};

const DeleteContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export default function IngredientPill({ ingredient, handleDelete, ingredientAdd }: Props) {
  const [isEditing, setEditing] = useState(false);
  return (
    isEditing ? (
      <AddPill
        hideAdd={() => setEditing(false)}
        isVisible={isEditing}
        defaultIngredient={ingredient}
        ingredientAdd={ingredientAdd}
      />
    ) : (
      <Pill onClick={() => setEditing(true)} cursor>
        <h4>
          {ingredient.description}
        </h4>
        <div>
          {ingredient.foodNutrients.find((d) => d.nutrientName === 'Protein')?.value}
          {' '}
          grams per 100
        </div>
        <DeleteContainer>
          <Button onClick={() => handleDelete(ingredient.fdcId)}>
            X
          </Button>
        </DeleteContainer>
      </Pill>
    )
  );
}
