import { useState } from 'react';
import styled from 'styled-components';
import { FOOD_NAME } from '../../constants/Text';
import pillStyles from '../../containers/PillStyle';
import { Ingredient } from '../../types/types';
import SearchPill from './SearchPill';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
  defaultIngredient: Ingredient
  isVisible: boolean
  hideAdd: () => void
};

interface PillProps {
  cursor?: boolean
}

export const Pill = styled.div`
  ${pillStyles}
  cursor: ${(props: PillProps) => (props.cursor ? 'text' : 'auto')};
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

export default function AddPill({
  ingredientAdd, defaultIngredient, hideAdd, isVisible = false,
}: Props) {
  const [clicked, setClick] = useState(false);

  return (
    <Pill onClick={() => (hideAdd ? hideAdd() : setClick(true))}>
      {!clicked || !isVisible
        ? <AddContent />
        : (
          <SearchPill
            defaultIngredient={defaultIngredient}
            ingredientAdd={ingredientAdd}
            hideSearch={() => setClick(false)}
          />
        )}
    </Pill>
  );
}

AddPill.defaultProps = {
  isVisible: false
}
