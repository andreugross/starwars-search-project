import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setState(results);
    };
    requestAPI();
  }, []);

  const context = useMemo(() => ({ state }), [state]);
  console.log(context);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
