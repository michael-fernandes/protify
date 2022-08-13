import { ChangeEventHandler, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useQuery } from 'react-query';
import { Autocomplete } from '@mui/material';
import { Ingredient } from '../../types/types';
import searchFoods from '../../api/searchFoods';

type Props = {
  ingredientAdd: (newIngredient: Ingredient) => void
};

export default function SearchPill({ ingredientAdd }: Props) {
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounce] = useState('');

  const { data = [], status } = useQuery(['search', searchDebounced], searchFoods, {
    enabled: !!search,
  });

  console.log(
    searchDebounced,
    status,
    data.map((food: Ingredient) => ({ title: food.description, id: food.fdcId })),
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchDebounce(search), 1000);
    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <div>
      {' '}
      <Autocomplete
        id="free-solo-2-demo"
        disableClearable
        options={data.map((food: Ingredient) => ({ title: food.description, id: food.fdcId }))}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onChange={(e: React.SyntheticEvent<any>) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
            label="Search input"
            InputProps={{
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
}
