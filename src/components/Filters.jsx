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
    setColumn,
    option,
    setOption,
    handleSortSelect,
    handleSortRadio,
    handleClickSort,
    sortSelect,
    sortRadio,
  } = useContext(MyContext);

  const sortOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  function mapSortOptions() {
    return sortOptions.map((e) => (
      <option key={ e } value={ e }>
        {e}
      </option>
    ));
  }

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
          name="column-filter"
          onChange={ handleColumn }
        >
          {option.map((e) => (
            <option key={ e } value={ e }>
              {e}
            </option>
          ))}
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

      <label htmlFor="column-sort">
        Ordenar
        <select
          data-testid="column-sort"
          id="column-sort"
          name="column=sort"
          onChange={ handleSortSelect }
        >
          {mapSortOptions()}
        </select>
      </label>

      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="column-sort-input-asc"
          name="sort"
          value="ASC"
          onChange={ handleSortRadio }
        />
        ASC
      </label>

      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="column-sort-input-desc"
          name="sort"
          value="DESC"
          onChange={ handleSortRadio }
        />
        DESC
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleClickSort(sortSelect, sortRadio) }
      >
        ORDENAR
      </button>

    </form>
  );
}

export default Filters;
