import PropTypes from 'prop-types';
import { useEffect, useState, useMemo, useCallback } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  // Estados da aplicação
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [sortSelect, setSortSelect] = useState('population');
  const [sortRadio, setSortRadio] = useState('');
  const [sortInfo, setSortInfo] = useState({});
  const [option, setOption] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // funções de handle
  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleValue = ({ target }) => {
    setValue(target.value);
  };

  const handleSortSelect = ({ target }) => {
    setSortSelect(target.value);
  };

  const handleSortRadio = ({ target }) => {
    setSortRadio(target.value);
  };

  // referenciar ajuda dos meus colegas Sérgio Ruza e Anderson Nunes, sem ele não conseguiria.
  const handleClickSort = useCallback((sortColumn, radioSort) => {
    setSortInfo({ sortColumn, radioSort });
    const MINUS_ONE = -1;
    switch (sortRadio) {
    case 'ASC': return planets.sort((a, b) => {
      if (b[sortSelect] === 'unknown') { return MINUS_ONE; }
      if (Number(a[sortSelect] < Number(b[sortSelect]))) { return MINUS_ONE; }
      return true;
    });
    case 'DESC': return planets.sort((a, b) => {
      if (b[sortSelect] === 'unknown') { return MINUS_ONE; }
      if (Number(a[sortSelect] > Number(b[sortSelect]))) { return MINUS_ONE; }
      return true;
    });
    default: return planets;
    }
  }, [planets, sortRadio, sortSelect]);

  const handleBtnFilter = () => {
    const filterPlanets = planets.filter((e) => {
      switch (comparison) {
      case 'maior que':
        return Number(e[column]) > Number(value);
      case 'menor que':
        return Number(e[column]) < Number(value);
      default:
        return Number(e[column]) === Number(value);
      }
    });
    setPlanets(filterPlanets);
  };

  const callbackBtnFilter = useCallback(
    handleBtnFilter,
    [planets, comparison, column, value],
  );

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const data = results.map((e) => {
        delete e.residents;
        return e;
      });
      setPlanets(data);
    };
    requestAPI();
  }, []);

  const context = useMemo(
    () => ({
      planets,
      name,
      column,
      comparison,
      value,
      option,
      sortSelect,
      sortRadio,
      sortInfo,
      handleName,
      handleColumn,
      handleComparison,
      handleValue,
      handleSortSelect,
      handleSortRadio,
      handleClickSort,
      callbackBtnFilter,
      setColumn,
      setOption,
    }),
    [planets,
      name,
      column,
      comparison,
      value,
      option,
      sortSelect,
      sortRadio,
      sortInfo,
      callbackBtnFilter,
      handleClickSort],
  ); // é daqui que vai sair o negócio
  console.log('log do context atual', context);

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
