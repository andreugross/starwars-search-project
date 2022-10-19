const END_POINT = 'https://swapi.dev/api/planets';

const getStarWarsPlanets = async () => {
  const response = await fetch(END_POINT);
  const { results } = await response.json();
  return results;
};

export default getStarWarsPlanets;
