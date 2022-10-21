import React, { useContext } from 'react';
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
  } = useContext(MyContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
        onClick={ callbackBtnFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
