// eslint-disable-next-line max-len
const sumProteins = (proteins: { key: number }) => Object.values(proteins).reduce((sum: number, curr: number) => {
  // eslint-disable-next-line no-param-reassign
  sum += curr;
  return sum;
}, 0);

export default sumProteins;
