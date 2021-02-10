import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import FilterTable from './FilterTable';
import columns from '../../../consts/columns';
import bookingsFake from '../../../consts/bookingsFake';

const table=()=>render(<FilterTable columns={columns} data={bookingsFake}/>);

test('load table with fake bookings', async () => {
  const tableEle = table();
  const columnsheader = await tableEle.getAllByRole('columnheader');
  const cells = await tableEle.getAllByRole('cell');
  expect(columnsheader.length).toBeTruthy();
  expect(cells.length).toBeTruthy();
});

test('can filter the price of booking', () => {
  const tableEle = table();
  expect(tableEle.getAllByRole('row').length).toEqual(3);
  const inputMin = tableEle.getByTestId('min-number');
  const inputMax = tableEle.getByTestId('max-number');
  expect(inputMax).toBeInTheDocument();
  expect(inputMin).toBeInTheDocument();
// Se filtra los precios minimo 11
  fireEvent.change(inputMin,{target:{value:11}});
  expect(tableEle.getAllByRole('row').length).toEqual(2);
// Se filtra los precios maximo 99
  fireEvent.change(inputMax,{target:{value:99}});
  expect(tableEle.getAllByRole('row').length).toEqual(1);
});

test('can search the id of booking', () => {
  const tableEle = table();
  expect(tableEle.getAllByRole('row').length).toEqual(3);
  const inputSearch = tableEle.getByTestId('search-number');
  expect(inputSearch).toBeInTheDocument();
// Se busca el id 1
  fireEvent.change(inputSearch,{target:{value:1}});
  expect(tableEle.getAllByRole('row').length).toEqual(2);
// Se busca el id 99
  fireEvent.change(inputSearch,{target:{value:99}});
  expect(tableEle.getAllByRole('row').length).toEqual(1);
});