import { HeadCell } from "../../../molecules/table-view-common/types";
export const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Name",
      isSort: true,
    },
    {
      id: "entityName",
      numeric: true,
      disablePadding: false,
      label: "Entity Name",
      isSort: true,
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Address",
      isSort: true,
    },
    {
      id: "city",
      numeric: false,
      disablePadding: false,
      label: "City",
      isSort: true,
    },
    {
      id: "country",
      numeric: false,
      disablePadding: false,
      label: "Country",
      isSort: true,
    },
    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Actions",
      isSort: false,
    },
];