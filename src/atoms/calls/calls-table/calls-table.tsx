import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import { IconButton, Tooltip, Typography } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PaginationComponent from '../../pagination';
import { isAdmin, isClient } from '../../../utils/role';
import { AppRoutes } from '../../../constants';
import { useGetParams } from '../../../utils/hooks/useGetParams';
import { rowsPerPage } from '../../../common';
import { EllipsisBox } from '../../ellipsis-box';
import { Link } from 'react-router-dom';
import { ThreeDotItems } from '../calls-card/helper';
import ThreeDotMenu from '../../three-dot-menu';
import { getTotalAmount, isAdminAllowed, priceFormatter } from '../../../pages/Calls/helpers';
import { CallDetails } from '../../../pages/Calls/types';
import { GroupDataItem } from '../../../organisms/groups/types';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useSnackbar } from 'notistack';
import { changeSettings, settingsConfigTypeOptions, settingsConfigTypeOptionsCalls } from '../../../utils/settings';
import { useFullPageLoading } from '../../full-page-loading/loadingContext';




type Props = {
  data: any[];
  tableInititalState: Record<string, any>;
  isLoading: any;
  paginationHandler: (event: React.ChangeEvent<unknown>, page: number) => void;
  setFilterPayload: any;
  filterPayload: any;
  paginationData: any;
  adminUsers: any;
  setPdfLink: any;
  setExpertForBd: any;
  isExpert: any;
  onEditCallClick: (callObj: any) => void;
  onDeleteCallClick: (call_id: number) => void;
  onConfirmByExpert: (call_id: number) => Promise<void>;
  onPaidCallClick: (call_id: number) => Promise<void>;
  onUnPaidCallClick: (call_id: number) => Promise<void>;
  requestPayment: (expert_name: string, callid: number) => Promise<void>;
  onZoomreportsClick: (zoom_meeting_id: string) => void
  clientContactNames: any;
  onViewReviewClickHandler: (original: any, review_type: "FINANCE" | "CALL" | null) => void;
  viewSoAClickHandler: (original: any) => void;
  viewPaymentReceiptClickHandler: (original: any) => void;
  addRemarkClickHandler: (original: any) => void;
  groupData: GroupDataItem[] | null;
};

const CallsTable = ({ data = [], tableInititalState, isLoading, paginationHandler, setFilterPayload, filterPayload, paginationData,
  adminUsers, setPdfLink, isExpert, onConfirmByExpert, onEditCallClick, requestPayment, onDeleteCallClick, onPaidCallClick, onUnPaidCallClick,
  onZoomreportsClick, setExpertForBd, clientContactNames, onViewReviewClickHandler, viewSoAClickHandler,
  viewPaymentReceiptClickHandler, addRemarkClickHandler, groupData }: Props) => {

  const [columnVisibility, setColumnVisibility] = useState(tableInititalState?.columnVisibility || {});
  const [columnOrder, setColumnOrder] = useState(tableInititalState?.columnOrder || []);
  const [columnPinning, setColumnPinning] = useState<{ left?: string[], right?: string[] }>(tableInititalState.columnPinning);
  const [filters, setFilters] = useState({ toggleColumnActions: false });
  const page = useGetParams("page") || null;
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();

  const findNameFromId = (id: any, adminData: any) => {
    const admin = adminData?.find((i: any) => i.id == id);
    return admin ? admin.name : "N/A";
  };


  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: 'id', header: 'Call ID', size: 85 },
      { accessorKey: 'call_date', header: 'Call Date', size: 180 },
      { accessorKey: 'expert_name', header: 'Expert Name' },
      {
        accessorKey: 'expert_id', header: 'Expert Id', size: 100, Cell: ({ renderedCellValue, row }) => (
          <Link to={`${AppRoutes.EXPERT_PROFILE}?id=${renderedCellValue}`} >{renderedCellValue}</Link>
        )
      },
      { accessorKey: 'client_name', header: 'Client Name' },
      {
        accessorKey: 'project_id', header: 'Project Id', size: 110, Cell: ({ renderedCellValue, row }) => (
          <Link to={`${AppRoutes.PROJECT_DETAILS}?page=1&id=${renderedCellValue}`}>{renderedCellValue}</Link>
        )
      },
      {
        accessorKey: 'call_status', header: 'Call Status', size: 120, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue} />
        )
      },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'call_medium', header: 'Call Medium' },
      { accessorKey: 'chargeable_mins', header: 'Chargeable Minutes', size: 150 },
      { accessorKey: 'payable_mins', header: 'Payable Minutes' },
      { accessorKey: 'selling_price', header: 'Selling Price' },
      { accessorKey: 'exchange_rate_chargeable', header: 'ER Chargable', size: 130, },
      { accessorKey: 'exchange_rate_payable', header: 'ER Payable', size: 110, },
      { accessorKey: 'cost_price', header: 'Cost Price', },
      { accessorKey: 'casecode', header: 'Case Code', },
      { accessorKey: 'gst_amout', header: 'Gst Amount ₹', },
      { accessorKey: '15ca', header: '15 CA', },
      { accessorKey: 'revenueINR', header: 'Revenue ₹', },
      { accessorKey: 'revenueUSD', header: 'Revenue $', },
      {
        accessorKey: 'payment_date', header: 'Payment Date', Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue ? renderedCellValue : ''} />
        )
      },
      {
        accessorKey: 'account_manager', header: 'Account Manager', Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={findNameFromId(renderedCellValue, adminUsers)} />
        )
      },
      {
        accessorKey: 'research_analyst', header: 'Research Analyst', Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={findNameFromId(renderedCellValue, adminUsers)} />
        )
      },
      {
        accessorKey: 'remark', header: 'Remark', size: 145, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue ? renderedCellValue : ''} />
        )
      },
      {
        accessorKey: 'financeRemark', header: 'Finance Remark', size: 145, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue ? renderedCellValue : ''} />
        )
      },
      {
        accessorKey: 'client_contact', header: 'Client contact', size: 145, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={renderedCellValue ? clientContactNames?.find((i: any) => String(i.id) === renderedCellValue)?.name : 'N/A'} />
        )
      },
      {
        accessorKey: 'payableAmount', header: 'Payable', size: 130, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={`${row.original?.cost_price_currency} ${~~(getTotalAmount((row.original?.cost_price.split(' '))?.[1], row.original?.payable_mins, true))}`} />
        )
      },
      {
        accessorKey: 'payableAmountINR', header: 'Payable ₹', size: 130, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={`${~~((row.original?.exchange_rate_payable)*(Number(getTotalAmount((row.original?.cost_price.split(' '))?.[1], row.original?.payable_mins, true))))}`} />
        )
      },
      {
        accessorKey: 'chargeableAmount', header: 'Revenue', size: 140, Cell: ({ renderedCellValue, row }) => (
          <EllipsisBox text={`${row.original?.selling_price_currency} ${~~(getTotalAmount((row.original?.selling_price.split(' '))?.[1], row.original?.chargeable_mins, true))}`} />
        )
      },
      {
        accessorKey: 'bank_location', header: 'Expert Type', size: 140, Cell: ({ renderedCellValue, row }) => (
          <Typography> {renderedCellValue === "IND" ? "Domestic" : "International"} </Typography>
        )
      },
      {
        accessorKey: 'expert_bank', header: 'Expert Bank', size: 120, Cell: ({ renderedCellValue, row }) => (
          <Typography sx={{ ...(renderedCellValue ? { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } } : {}) }}
            onClick={() => renderedCellValue && setExpertForBd({ expertId: (row.original?.expert_id), primary_bank_id: row.original?.exper_primary_bank })} color={renderedCellValue ? 'green' : 'red'}>
            {renderedCellValue ? 'Yes' : 'No'} </Typography>)
      },
      {
        accessorKey: 'fk_pe', header: 'PE', size: 80, Cell: ({ renderedCellValue, row }) => (
          <Typography sx={{ ...(renderedCellValue ? { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } } : {}) }}
            onClick={() => renderedCellValue && setPdfLink(renderedCellValue)} color={renderedCellValue ? 'green' : 'red'}>
            {renderedCellValue ? 'Yes' : 'No'}</Typography>
        )
      },
      {
        accessorKey: 'action', header: 'Action', size: 90, Cell: ({ renderedCellValue, row }) => {
          const callObj = row.original.call
          const adminAllowed = (isAdmin() && callObj) ? isAdminAllowed(callObj?.fk_project_value.fk_group, parseInt(callObj?.account_manager), [callObj?.research_analyst], groupData) : true;
          const threeDotItemsArr = ThreeDotItems(
            row.original?.status,
            isExpert,
            () => onConfirmByExpert(row.original?.id),
            () => onEditCallClick(callObj),
            () => requestPayment(row.original?.fk_expert_value?.name || "", row.original?.id),
            () => onDeleteCallClick(row.original?.id),
            () => onPaidCallClick(row.original?.id),
            () => onUnPaidCallClick(row.original?.id),
            row.original?.zoom_meeting_id,
            () => onZoomreportsClick(row.original?.zoom_meeting_id),
            callObj?.invoice_url,
            () => {
              if (callObj?.invoice_url) {
                window.open(callObj?.invoice_url, "_blank", 'noopener,noreferrer');
              }
            },
            {
              //@ts-ignore
              reviewed_by: callObj?.reviewed_by, review_remarks: callObj?.review_remarks, reviewed_on: callObj?.reviewed_on,
              call_review:callObj?.remark
            },
            (type) => onViewReviewClickHandler(callObj,type),
            () => viewSoAClickHandler(callObj),
            () => viewPaymentReceiptClickHandler(callObj),
            adminAllowed,
            () => addRemarkClickHandler(callObj)
          );
          return (
            <>
              {threeDotItemsArr.length > 0 && (
                <ThreeDotMenu items={threeDotItemsArr} />)}
            </>
          )
        }
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
    enableHiding: true,
    enableRowPinning: true,
    getRowId: (row) => row.id?.toString(),
    enablePagination: false,
    rowPinningDisplayMode: 'select-sticky',
    initialState: {
      density: "compact",
      showGlobalFilter: true,
    },
    state: {
      isLoading,
      showProgressBars: isLoading,
      // rowSelection,
      columnVisibility,
      columnOrder,
      columnPinning
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
      return (
        <PaginationComponent
          page={paginationData?.page || 1}
          totalResult={paginationData?.total || 0}
          totalPages={paginationData.totalPages || 0}
          paginationHandler={paginationHandler}
          dropdownFilterProps={{
            link: AppRoutes.CALLS + "?page=1",
            setFilterPayload: (page) => {
              setFilterPayload((prev: any) => {
                return {
                  ...prev,
                  rowsPerPage: parseInt(page),
                };
              })
            },
            dropDownItems: rowsPerPage,
            filterValue: filterPayload.rowsPerPage.toString()
          }}
          hideRowsPerPage={isClient()}
        />
      )
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
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
        <Tooltip title="Save this tabular view for me" arrow>
          <IconButton
            onClick={async () => {
              await changeSettings(settingsConfigTypeOptionsCalls.CallTabDefaultColumns, { columnVisibility, columnOrder, columnPinning }, enqueueSnackbar, setLoading);
            }}
          >
            <ManageAccountsIcon />
          </IconButton>
        </Tooltip>


      </BoxFlex>)
    }
  });

  const theme = createTheme({
    typography: {
      fontFamily: ['Montserrat'].join(','),
      fontSize: 12,
      fontWeightRegular: '500',
    },
    palette: {
      primary: {
        main: '#EC9324',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default CallsTable;