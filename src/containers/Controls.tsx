import { useState } from 'react';
import styled from 'styled-components';
import AddPill, { Pill } from '../components/ingredient/AddPill';
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

  // const handleIngredientRemove = (removeIngredient: Ingredient) => {
  //   setIngredients(ingredients.filter((i) => i.description !== removeIngredient.description));
  // };
  console.log(ingredients);

  return (
    <ControlDiv>
      {ingredients.map((i) => (
        <Pill>
          <h4>
            {' '}
            {i.description}
          </h4>
          <div>
            Serving Size:
            {' '}
            {i.servingSize}
            {' '}
            (
            {i.servingSizeUnit}
            )
          </div>
          <div>
            Total Protein:
            {i.foodNutrients.find((d) => d.nutrientName === 'Protein')?.value}
          </div>
        </Pill>
      ))}
      {ingredients.length < 4
        && <AddPill ingredientAdd={handleIngredientAdd} />}
    </ControlDiv>
  );
}
