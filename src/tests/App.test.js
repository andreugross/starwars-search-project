import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';


describe('Testa os itens da tela inicial', () => {
  // test('modelo', () => {})

  afterEach(() => jest.clearAllMocks());

  test('Testa se os itens do filtro aparecem na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    await act(async () => {
      render(<App />);
    });

    expect(global.fetch).toHaveBeenCalled();

    const name = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    expect(name).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  });

  test('testa o funcionamento do campo de busca pelo nome do planeta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    await act(async () => {
      render(<App />);
    });

    const name = screen.getByTestId('name-filter');
    const naboo = screen.getByRole('cell', { name: /naboo/i })

    userEvent.type(name, 'da')
    expect(naboo).toBeDefined();
    userEvent.clear(name);

  })

  test('testa o funcionamento da busca pelos filtros', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    await act(async () => {
      render(<App />);
    });

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const bespin = screen.getByRole('cell', {  name: /bespin/i});
    const endor = screen.getByRole('cell', {  name: /endor/i});


    userEvent.selectOptions(column, ['rotation_period']);
    userEvent.selectOptions(comparison, ['menor que']);
    userEvent.type(value, '20');
    userEvent.click(btnFilter);
    expect(bespin).toBeDefined();

    userEvent.selectOptions(column, ['surface_water']);
    userEvent.selectOptions(comparison, ['maior que']);
    userEvent.type(value, '5');
    userEvent.click(btnFilter);
    expect(endor).toBeDefined();

  })

  test('testa se os filtros de ordenação aparecem na tela, testa o funcionamento da ordenação ascendente e decrescente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    await act(async () => {
      render(<App />);
    });

    const columnSort = screen.getByTestId('column-sort');
    const radioASC = screen.getByTestId('column-sort-input-asc');
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    const btnOrder = screen.getByRole('button', {  name: /filtrar/i})

    expect(columnSort).toBeInTheDocument;
    expect(radioASC).toBeInTheDocument;
    expect(radioDESC).toBeInTheDocument;
    expect(btnOrder).toBeInTheDocument;

  })

  test('testa o funcionamento da ordenação ascendente e decrescente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    await act(async () => {
      render(<App />);
    });

    const columnSort = screen.getByTestId('column-sort');
    const radioASC = screen.getByTestId('column-sort-input-asc');
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    const btnOrder = screen.getByTestId('column-sort-button')
    // const planetNameId = await screen.findAllByTestId('planet-name');
    const endor = screen.getByRole('cell', {  name: /endor/i})
    const bespin = screen.getByRole('cell', {  name: /bespin/i});

    userEvent.selectOptions(columnSort, 'diameter')
    userEvent.click(radioASC);
    userEvent.click(btnOrder);

    expect(endor).toBeDefined();

    userEvent.selectOptions(columnSort, 'diameter')
    userEvent.click(radioDESC);
    userEvent.click(btnOrder);

    expect(bespin).toBeDefined();

  })
});
