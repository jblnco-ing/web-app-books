import React from 'react'

const NumberEqualColumnFilter=({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const count = preFilteredRows.length;
    return (
      <input
        data-testid="search-number"
        type="number"
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  };
  export default NumberEqualColumnFilter;