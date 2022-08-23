import {
  ChangeEvent,
  SyntheticEvent,
  useEffect, useMemo, useRef, useState,
} from 'react';

import { useQuery } from 'react-query';
import {
  Autocomplete, CircularProgress, TextField,
} from '@mui/material';
import { throttle } from 'lodash';
import styled from 'styled-components';
import { Ingredient, IngredientOption as IngredientOpt } from '../../types/types';
import searchFoods from '../../api/searchFoods';
import getProtein from '../../utilities/getProtein';

const SearchContainer = styled.div`
  width: 100%;
  border: 1px solid grey;
`;

const searchClassname = 'search-classname';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
  hideSearch: () => void
  defaultIngredient?: Ingredient | undefined
};

export default function SearchPill({ ingredientAdd, hideSearch, defaultIngredient }: Props) {
  const [search, setSearch] = useState(defaultIngredient?.description || '');
  const [searchThrottled, setSearchThrottle] = useState('');
  const throttleSearch = throttle(setSearchThrottle, 1000);
  const autoCompleteRef = useRef(null);

  const { data = [], status } = useQuery(['search', searchThrottled], searchFoods, {
    enabled: !!search,
  });

  useEffect(() => throttleSearch(search), [search]);

  const foodOpts = useMemo(() => data.foods?.reduce((acc: Ingredient[], currItem: Ingredient) => {
    const proteins = getProtein(currItem);
    if (Object.keys(proteins).length) {
      acc.push({
        ...currItem,
        label: currItem.description || '',
        id: currItem.fdcId,
        proteins,
      });
    }
    return acc;
  }, []), [data]) || [];

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
  };

  const handleAutocompleteChange = (_: SyntheticEvent<Element, Event>, value: any) => {
    if (value) {
      ingredientAdd(value);
      setSearch('');
      hideSearch();
    }
  };

  // TODO: should hide search for any click outside of input.
  const onInputBlur = () => !search.length && hideSearch();

  return (
    <SearchContainer className={searchClassname}>
      <Autocomplete
        className="autocomplete"
        loading={status === 'loading'}
        loadingText={<CircularProgress size={20} />}
        onChange={handleAutocompleteChange}
        filterOptions={(x) => x}
        options={foodOpts}
        inputValue={search}
        getOptionLabel={(option: IngredientOpt) => option.label}
        renderOption={(props, option) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            ref={autoCompleteRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onBlur={onInputBlur}
            value={search}
            onChange={handleInputChange}
          />
        )}
        autoHighlight
        clearOnEscape
        selectOnFocus
      />
    </SearchContainer>
  );
}
