import {
  ChangeEvent,
  SyntheticEvent,
  useEffect, useMemo, useState,
} from 'react';

import { useQuery } from 'react-query';
import {
  Autocomplete, CircularProgress, TextField,
} from '@mui/material';
import { throttle } from 'lodash';
import { Ingredient, IngredientOption as IngredientOpt } from '../../types/types';
import searchFoods from '../../api/searchFoods';
import getProtein from '../../utilities/getProtein';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
  hideSearch: () => void
  defaultIngredient?: Ingredient | undefined
};

export default function SearchPill({ ingredientAdd, hideSearch, defaultIngredient }: Props) {
  const [search, setSearch] = useState(defaultIngredient?.description || '');
  const [searchDebounced, setSearchDebounce] = useState('');

  const { data = [], status } = useQuery(['search', searchDebounced], searchFoods, {
    enabled: !!search,
  });

  const throttleSearch = throttle(setSearchDebounce, 1000);

  useEffect(() => throttleSearch(search), [search]);

  const foodOptions = useMemo((): IngredientOpt[] => {
    const { foods } = data;
    return foods?.reduce((acc: Ingredient[], currItem: Ingredient): IngredientOpt[] => {
      const proteins = getProtein(currItem);
      if (Object.keys(proteins).length) {
        acc.push({
          ...currItem,
          label: currItem.description || '',
          id: currItem.fdcId,
        });
      }
      return acc;
    }, []);
  }, [data]) || [];

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
    <div>
      <Autocomplete
        loading={status === 'loading'}
        loadingText={<CircularProgress size={20} />}
        onChange={handleAutocompleteChange}
        filterOptions={(x) => x}
        options={foodOptions}
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
    </div>
  );
}
