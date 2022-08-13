import key from '../constants/key';
import { fetchData } from './fetch';

interface Params {
  queryKey: string[]
}
export async function searchFoods({ queryKey } : Params) {
  const [, search] = queryKey;
  const food = await fetchData('https://api.nal.usda.gov/fdc/v1/foods/search', { api_key: key, query: search, pageSize: 25 });
  return food;
}

export default searchFoods;
