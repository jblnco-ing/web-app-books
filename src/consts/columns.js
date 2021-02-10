import NumberEqualColumnFilter from "../components/shared/filtersTables/NumberEqualColumnFilter";
import NumberRangeColumnFilter from "../components/shared/filtersTables/NumberRangeColumnFilter";

const columns=[
    {
      Header: 'BookingId',
      accessor: 'bookingId',
      Filter: NumberEqualColumnFilter,
      filter: 'equal',
    },
    {
      Header: 'Cliente',
      accessor: 'client',
      disableFilters: true,
    },
    {
      Header: 'Fecha de Creación',
      accessor: 'bookingTime',
      disableFilters: true,
    },
    {
      Header: 'Dirección',
      accessor: 'streetAddress',
      disableFilters: true,
    },
    {
      Header: 'Precio',
      accessor: 'bookingPrice',
      Filter: NumberRangeColumnFilter,
      filter: 'between',
    },
  ];

  export default columns;