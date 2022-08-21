import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect, useMemo, useState,
} from 'react';

import { useQuery } from 'react-query';
import {
  Autocomplete, CircularProgress, TextField,
} from '@mui/material';
import { throttle } from 'lodash';
import { Ingredient, IngredientOption } from '../../types/types';
import searchFoods from '../../api/searchFoods';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
  hideSearch: () => void
};

export default function SearchPill({ ingredientAdd, hideSearch }: Props) {
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounce] = useState('');

  const { data = [], status } = useQuery(['search', searchDebounced], searchFoods, {
    enabled: !!search,
  });

  const throttleSearch = throttle(setSearchDebounce, 1000);

  useEffect(() => throttleSearch(search), [search]);

  const foodOptions = useMemo((): IngredientOption[] => data?.foods?.map(
    (food: Ingredient) => ({
      ...food,
      label: food.description,
      id: food.fdcId,
    }),
  ) || [], [data]);
  console.log(foodOptions);
  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
  };

  const handleAutocompleteChange = (_: SyntheticEvent<Element, Event>, value: any) => {
    if (value) {
      ingredientAdd(value);
      hideSearch();
    }
  };

  // TODO: should hide search for any click outside of input.
  const onInputBlur = () => !search.length && hideSearch();

  return (
    <div>
      <Autocomplete
        loading={status === 'loading'}
        loadingText={<CircularProgress size={20} />}
        onChange={handleAutocompleteChange}
        filterOptions={(x) => x}
        options={foodOptions}
        clearOnEscape
        inputValue={search}
        getOptionLabel={(option: IngredientOption) => option.label}
        renderOption={(props, option) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onBlur={onInputBlur}
            value={search}
            onChange={handleInputChange}
          />
        )}
      />
    </div>
  );
}
