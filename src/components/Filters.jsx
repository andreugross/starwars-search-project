import React, { useContext, useState } from 'react';
import MyContext from '../context/myContext';

function Filters() {
  const {
    name,
    handleName,
    column,
    handleColumn,
    comparison,
    handleComparison,
    value,
    handleValue,
    callbackBtnFilter,
    setColumn,
  } = useContext(MyContext);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [option, setOption] = useState(columnOptions);

  function deleteOptionFilter() {
    const newOptions = option.filter((e) => e !== column);
    setOption(newOptions);
    setColumn(newOptions[0]);
    // console.log(newOptions);
  }

  return (
    <form>
      <label htmlFor="planet-filter">
        <textarea
          data-testid="name-filter"
          id="planet-filter"
          name="planet"
          value={ name }
          onChange={ handleName }
        />
      </label>

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          id="column-filter"
          name="column"
          value={ column }
          onChange={ handleColumn }
        >
          {option.map((e) => <option key={ e } value={ e }>{e}</option>)}
        </select>
      </label>

      <label htmlFor="comparison-filte">
        Operador
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ handleComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        Valor
        <input
          type="number"
          data-testid="value-filter"
          id="vvalue-filter"
          name="value"
          value={ value }
          onChange={ handleValue }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          callbackBtnFilter();
          deleteOptionFilter();
        } }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
