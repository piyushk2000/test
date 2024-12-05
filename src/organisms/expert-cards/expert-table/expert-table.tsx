import { useEffect, useMemo, useState } from 'react';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

//MRT Imports
import {
  MRT_RowSelectionState,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';

//Icons Imports
import { rowsPerPage } from '../../../common';
import Tooltip from "@mui/material/Tooltip";
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import { EllipsisBox } from '../../../atoms/ellipsis-box';
import { filterPayload } from '../../../pages/Experts/types';
import PaginationComponent from '../../../atoms/pagination';
import { isClient } from '../../../utils/role';
import { AppRoutes } from '../../../constants';
import ExpertCallDetailTooltip, { NumericData } from '../../../atoms/profile-cardV1/expert-call-detail-tooltip';
import { ExpertNameCell, ExpertTableActions } from './helper';
import { useSnackbar } from 'notistack';
import { ApprovedByValue, CreatorValue, Meta, UpdatedByValue, Work_ex } from '../types';
import { confirmedOrUpdateTooltip, updatedByTooltip } from '../../../atoms/profile-cardV1/helper';
import IconButton from '@mui/material/IconButton';
import { ExpertWorkEx } from '../../../atoms/expert-work-ex';
import { ExpertActions } from "./Actions";
import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ViewListIcon from '@mui/icons-material/ViewList';
import { changeSettings, settingsConfigTypeOptions } from '../../../utils/settings';
import { useFullPageLoading } from '../../../atoms/full-page-loading/loadingContext';
import LabeledComponent from '../../../molecules/nav-bars/expert-cards-page/labeledComponent';
import DropDownFilter from '../../../atoms/drop-down-filter';
import { useGetParams } from '../../../utils/hooks/useGetParams';


export type ExpertTable = {
  id: number;
  name: string;
  type: string;
  current_company_name: string;
  current_company_designation: string;
  current_company_date: string;
  relevant_company: string;
  primary_email: string;
  primary_mobile: string;
  headline: string;
  base_location: string;
  honorarium: string;
  domains: string;
  functions: string;
  project_id_name: string;
  status: string;
  confirmed_on: string | null,
  updated_at: string | null,
  updated_by_value: UpdatedByValue,
  fk_creator_value: CreatorValue,
  approved_by_value: ApprovedByValue,
  premium_expert: boolean,
  dnd_enabled: boolean,
  badge: "Ace" | "Champion" | "Pro" | null,
  work_experiences: Work_ex[],
  expert_geographies_value: string[],
  calls_count: number;
  project_count_data: {
    projectCount: number;
    projects: string;
  };
  actions: string;
  meta: Meta;
  bio: string | null;
  domain_l0: number | null;
  domain_l1: number | null;
  domain_l2: number | null;
  price_per_hour: number | null;
  price_per_hour_currency: string | null;
  added_on: string;
}

type Props = {
  data: ExpertTable[],
  apiData: any,
  expert_url: string,
  paginationHandler: (event: React.ChangeEvent<unknown>, page: number) => void;
  setFilterPayload: any;
  filterPayload: filterPayload;
  getProfileDetails(): Promise<void>;
  isLoading: any;
  actions: ExpertTableActions;
  selectedCards: any;
  setSelectedCards: any;
  selectExpert: boolean;
  openTimeline(id: number): void;
  handleOpenProfileLink(id: number): Promise<void>;
  editExpertClickHandler: any;
  tableInititalState: Record<string, any>;
  mode: string;
}


const ExpertTable = ({ data, expert_url, apiData, paginationHandler, setFilterPayload, filterPayload, isLoading, actions, selectedCards, setSelectedCards, selectExpert, openTimeline, handleOpenProfileLink, editExpertClickHandler, tableInititalState, mode }: Props) => {

  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] = useState({ toggleColumnActions: false });
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState(tableInititalState.columnVisibility || {});
  const [columnOrder,setColumnOrder] = useState(tableInititalState.columnOrder || []);
  const [columnPinning, setColumnPinning] = useState<{ left?: string[], right?: string[] }>(tableInititalState.columnPinning);
  const [defaultView, setDefaultView] = useState(mode);
  const { setLoading } = useFullPageLoading();
  const ce_mapping = useGetParams("ce_mapping") || null;
  const page = useGetParams("page") || null;

  const columns = useMemo<MRT_ColumnDef<ExpertTable>[]>(
    () => [
      { accessorKey: 'id', header: 'Expert ID' },
      {
        accessorKey: 'name', header: 'Expert Name', minSize: 250, Cell: ({ renderedCellValue, row }) => (
          <ExpertNameCell row={row} apiData={apiData} openTimeline={openTimeline} handleOpenProfileLink={handleOpenProfileLink} />
        )
      },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'primary_email', header: 'Primary Email', enableClickToCopy: true },
      { accessorKey: 'primary_mobile', header: 'Primary Mobile', enableClickToCopy: true },
      {
        accessorKey: 'headline', header: 'Headline', Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      { accessorKey: "type", header: "Type" },
      {
        accessorKey: "current_company_name", header: "Current Company", Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      {
        accessorKey: "current_company_designation", header: "Current Designation", Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      {
        accessorKey: "current_company_date", header: "From - To (Current Workex)", Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      {
        accessorKey: "relevant_company", header: 'Relevant Company', minSize: 220, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      {
        accessorKey: "call_count", id: "call_count", header: "Calls Count", Cell: ({ renderedCellValue, row }) => (
          <NumericData
            value={row.original.calls_count}
            valueClass="green"
            isLink={row.original.calls_count && row.original.calls_count > 0 ? true : false}
            expert_id={row.original.id}
            expert_name={row.original.name}
          />
        )
      },
      {
        accessorKey: "project_count_data", id: "project_count_data", header: "Project Count", Cell: ({ renderedCellValue, row }) => (
          <NumericData
            value={row.original.project_count_data.projectCount}
            isLink={row.original.project_count_data.projectCount && row.original.project_count_data.projectCount > 0 ? true : false}
            link={AppRoutes.PROJECTS + "/all" + "?page=1" + "&projectIds=" + row.original.project_count_data.projects}
            valueClass="green"
          />
        )
      },
      { accessorKey: 'base_location', header: 'Base Location' },
      {
        accessorKey: "expert_geographies_value", header: "Expertise Geography", Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={row.original.expert_geographies_value.join(", ")} />)
      },
      { accessorKey: 'honorarium', header: 'Honorarium', minSize: 120 },
      {
        accessorKey: 'domains', header: 'Domains', minSize: 300, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />)
      },
      {
        accessorKey: 'functions', header: 'Functions', minSize: 250, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />)
      },
      {
        accessorKey: 'project_id_name', header: 'Project Id - Project Name', minSize: 300, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />)
      },
      {
        accessorKey: 'updated_or_approved_by', header: 'Updated By / Approved By', minSize: 250, Cell: ({ renderedCellValue, row }) => {

          const [title, text] = updatedByTooltip(row.original.status, row.original.updated_by_value, row.original.fk_creator_value, row.original.approved_by_value);

          return (
            <Tooltip title={title} arrow>
              <p>{text}</p>
            </Tooltip>
          )
        }
      },
      {
        accessorKey: 'updated_or_approved_on', header: 'Updated On / Approved On', Cell: ({ renderedCellValue, row }) => {

          const [title, text] = confirmedOrUpdateTooltip(row.original.status, row.original.confirmed_on || "", row.original.updated_at || "");

          return (
            <Tooltip title={title} arrow>
              <p>{text}</p>
            </Tooltip>
          )
        }
      },
      { accessorKey: "added_on", header: "Added On" },
      {
        accessorKey: "actions", header: "Actions", minSize: 400, Cell: ({ renderedCellValue, row }) => (
          <ExpertActions
            row={row.original}
            actions={actions}
            enqueueSnackbar={enqueueSnackbar}
            editExpertClickHandler={editExpertClickHandler}
          />
        )
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableGlobalFilter: false,
    enableColumnFilters: filters.toggleColumnActions,
    enableColumnActions: filters.toggleColumnActions,
    enableColumnDragging: filters.toggleColumnActions,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableHiding: !ce_mapping,
    enableRowPinning: true,
    rowPinningDisplayMode: 'select-sticky',
    getRowId: (row) => row.id?.toString(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectExpert ? (row => row.original.status === "Confirmed") : false,
    enablePagination: false,
    initialState: {
      density: "compact",
      showGlobalFilter: true,
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '55vh',
      }
    },
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    renderBottomToolbarCustomActions: (row) => {
      console.log({apiData})
      return (
        <PaginationComponent
          page={page ? +page : 1}
          totalPages={apiData?.totalPages}
          totalResult={apiData?.total}
          paginationHandler={paginationHandler}
          hideRowsPerPage={isClient()}
          dropdownFilterProps={{
            link: expert_url,
            setFilterPayload(page) {
              setFilterPayload((prev: filterPayload) => {
                prev = {
                  ...prev,
                  rowsPerPage: parseInt(page),
                  isFilterChange: true,
                };
                return prev;
              })
            },
            dropDownItems: rowsPerPage,
            filterValue: filterPayload.rowsPerPage.toString()
          }}
        />
      )
    },
    renderDetailPanel: ({ row }) => {
      return (
        <ExpertWorkEx
          work_experiences={row.original.work_experiences}
        />
      )
    },
    renderTopToolbarCustomActions: () => {
      return (<BoxFlex>
        <Tooltip title="Show/Hide options in each column" arrow>
          <IconButton
            sx={filters.toggleColumnActions ? {
              color: "var(--green-color)", "&:hover": {
                color: "var(--green-color)"
              }
            } : {}}
            onClick={() => setFilters((prev) => ({
              ...prev,
              toggleColumnActions: !prev.toggleColumnActions
            }))}>
            <DisplaySettingsIcon />
          </IconButton>
        </Tooltip>

        {!ce_mapping &&
          <>
            <Tooltip title="Save this tabular view for me" arrow>
              <IconButton onClick={async () => {
                await changeSettings(settingsConfigTypeOptions.ExpertsTabDefaultColumns, {columnVisibility, columnOrder, columnPinning}, enqueueSnackbar, setLoading);
              }}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
            <p style={{ fontSize: "12px", marginLeft: "1rem", fontWeight: "500" }}>Save Default View:</p>
            <LabeledComponent label="" component={
              <DropDownFilter
                link={null}
                filterValue={defaultView}
                setFilterPayload={async (type: string) => {
                  await changeSettings(settingsConfigTypeOptions.ExpertsTabDefaultView, { type }, enqueueSnackbar, setLoading)
                  setDefaultView(type);
                }
                }
                dropDownItems={[
                  { label: <p>Table</p>, value: "list" },
                  { label: <p>Card</p>, value: "card" }
                ]}
              />
            }
            />
          </>
        }
      </BoxFlex>)
    }
    ,
    state: {
      isLoading,
      showProgressBars: isLoading,
      rowSelection,
      columnVisibility,
      columnOrder,
      columnPinning
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning
  });

  useEffect(() => {
    const columnVisibility = table.getState().columnVisibility;
    const columnOrder = table.getState().columnOrder;
    const columnPinning = table.getState().columnPinning;

    if(!ce_mapping) {
      localStorage.setItem("expert_table_columns", 
        JSON.stringify({
        columnVisibility,
        columnOrder,
        columnPinning
      }));
    }
    
    setColumnVisibility(columnVisibility);
    setColumnOrder(columnOrder);
    setColumnPinning(columnPinning);
  }, [columnVisibility,columnOrder,columnPinning]);

  const fontTheme = createTheme({

    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 12,
      fontWeightRegular: "500"
    },
    palette: {
      primary: {
        main: "#EC9324",
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            marginTop: "1rem"
          }
        }
      }
    }
  });

  //added to selected Cards when the row selection changes...
  useEffect(() => {

    if (selectExpert) {
      const expert_ids = Object.keys(table.getState().rowSelection);

      if (expert_ids?.length) {
        let selectedCards_arr = [];

        for (let expert_id of expert_ids) {
          const expert_data = data.find(d => d.id === +expert_id);

          if (expert_data) {
            selectedCards_arr.push({
              label: expert_data.name,
              value: expert_data.id
            })
          }
        }

        setSelectedCards(selectedCards_arr);
      } else {
        setSelectedCards((prev: any) => {
          if (prev.length === 0) {
            return prev;
          } else {
            return [];
          }
        })
        setRowSelection((prev: any) => {
          if (Object.keys(prev).length === 0) {
            return prev;
          } else {
            return {};
          }
        });
      }
    } else {
      setSelectedCards((prev: any) => {
        if (prev.length === 0) {
          return prev;
        } else {
          return [];
        }
      })
      setRowSelection((prev: any) => {
        if (Object.keys(prev).length === 0) {
          return prev;
        } else {
          return {};
        }
      });
    }

  }, [rowSelection, selectExpert]);

  return (
    <ThemeProvider theme={fontTheme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>)
    ;
};

export default ExpertTable;