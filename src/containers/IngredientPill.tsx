import { IconButton } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import AddPill, { Pill } from '../components/ingredient/AddPill';
import { Ingredient } from '../types/types';
import SearchPill from '../components/ingredient/SearchPill';

type Props = {
  ingredient: Ingredient
  handleDelete: (id: string | number) => void
  ingredientAdd: (newIngredient: Ingredient) => void
};

const DeleteContainer = styled.div`
  top: 2px;
  right: 4px;
  
`;

const IngredientContainer = styled.div`
 width: 100%;
`;

export default function IngredientPill({ ingredient, handleDelete, ingredientAdd }: Props) {
  const [isEditing, setEditing] = useState(false);
  return (
    isEditing ? (
      <SearchPill
        hideSearch={() => setEditing(false)}
        defaultIngredient={ingredient}
        ingredientAdd={ingredientAdd}
      />
    ) : (
      <Pill onClick={() => setEditing(true)} cursor>
        <IngredientContainer>
          <h4>
            {ingredient.description}
          </h4>
          <div>
            {ingredient.foodNutrients.find((d) => d.nutrientName === 'Protein')?.value}
            {' '}
            grams per 100
          </div>
        </IngredientContainer>
        <DeleteContainer>
          <IconButton aria-label="delete" onClick={() => handleDelete(ingredient.fdcId)} size="small">
            <ClearIcon />
          </IconButton>
        </DeleteContainer>
      </Pill>
    )
  );
}
