import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import appContext from '../appContext';

type Props = {};

const ChartContainer = styled.div`
`;
export default function Chart({ }: Props) {
  const { ingredients, setIngredients } = useContext(appContext);

  return (
    <ChartContainer>Chart</ChartContainer>
  );
}
