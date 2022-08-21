import { useState } from 'react';
import styled from 'styled-components';
import { FOOD_NAME } from '../../constants/Text';
import pillStyles from '../../containers/PillStyle';
import { Ingredient } from '../../types/types';
import SearchPill from './SearchPill';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
};

export const Pill = styled.div`
  ${pillStyles}
`;

function AddContent() {
  return (
    <>
      {' '}
      +Add
      {' '}
      {FOOD_NAME}
    </>
  );
}
export default function AddPill({ ingredientAdd }: Props) {
  const [clicked, setClick] = useState(false);

  return (
    <Pill onClick={() => setClick(true)}>
      {!clicked
        ? <AddContent />
        : <SearchPill ingredientAdd={ingredientAdd} hideSearch={() => setClick(false)} />}
    </Pill>
  );
}
