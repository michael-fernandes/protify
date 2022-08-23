import { useContext } from 'react';
import styled from 'styled-components';
import appContext from '../appContext';
import AddPill from '../components/ingredient/AddPill';
import { Ingredient } from '../types/types';
import IngredientPill from './IngredientPill';

const ControlDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Controls() {
  const { ingredients, setIngredients } = useContext(appContext);
  console.log(ingredients);
  const handleIngredientAdd = (newIngredient: Ingredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const handleDelete = (fdcId: string | number) => {
    setIngredients(
      ingredients.filter((ing) => ing.fdcId !== fdcId),
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
