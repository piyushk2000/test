import Grid from "@mui/material/Grid";
import { containerCommonStyles, headingStyles, tableRowStyles } from "./style";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { useEffect, useState } from "react";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { BCGData, headCells, TableData } from "./types";
import { BCGClientFilters, formatDataClientTable, getBCGData, getBCGDataBymonth } from "./helper";
import { Skeleton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { useClientPageContext } from "../../../pages/Client/helper";
import DropDownFilter from "../../../atoms/drop-down-filter";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalDayjs } from "../../../utils/timezoneService";
import { DateRangePicker } from "@mui/lab";
import DatePickerField from "../../../atoms/date-picker-field";
import CalenderPickerDialog from "../../../molecules/calender-picker-dialog/calenderPickerDialog";
import TableViewCommon from "../../../molecules/table-view-common";
import TableCellsRow from "./tableCells";

type Props = {
  clientId: any;
  clientName: any;
  data: BCGData;
  setData: any;
};

type DateType = Dayjs | null;

const calenderDialogTitles = [
  {
    label: "Updated at",
    value: "updated_at",
  },
  {
    value: "created_at",
    label: "Created at",
  },
]


const BcgOverview = ({ clientId, clientName, data, setData }: Props) => {

  const isMobile = useIsMobile();
  // const [data, setData] = useState<BCGData>(null);
  const [isCalender, setCalender] = useState<any>({
    open: false,
    value: "",
    type: null,
  });
  const {isLoading, setLoading } = useFullPageLoading();
  const { filterPayload, setFilterPayload } = useClientPageContext();
  const navigate = useNavigate();
  let now = new Date();
  const [dateFirst, setDateFirst] = useState<DateType>(LocalDayjs(new Date(now.getFullYear(), now.getMonth() - 5)).startOf('month'))
  const [dateLast, setDateLast] = useState<DateType>(LocalDayjs().endOf('month'))


  useEffect(() => {
    if (filterPayload.isFilterChange) {
      if (filterPayload.bcgTab !== 0) {
        getBCGData(clientId, setData, setLoading, filterPayload.bcgTab);
        setFilterPayload((prev) => ({
          ...prev,
          isFilterChange: false
        }))
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayload.isFilterChange])


  const calenderOpenClickHandler = () => {
    setCalender((prev: any) => ({ ...prev, open: true }));
  };

  const calenderCloseBtnClickHandler = () => {
    setCalender((prev: any) => ({
      open: false,
      value: "",
      type: null,
    }));
  };

  const dataRangeFilter = (
    date: Date,
    tDate: Date,
    select: string | null,
    calenderType: string | null
  ) => {
    getBCGDataBymonth(clientId, setData, setLoading, date, tDate);
    setDateFirst(LocalDayjs(date));
    setDateLast(LocalDayjs(tDate));
    console.log('data time ', date, tDate);
  }



  return (
    <Grid container sx={containerCommonStyles}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          component="p"
        >
          <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "600", padding: "10px 0" }}>
            #{clientId} {clientName}
          </span>
          {" "}
          <span
            style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "500", padding: isMobile ? "0" : "10px 0", display: isMobile ? "inline-block" : "inline" }}
          >
            ( Total POCs: {data?.total_POCs ?
              <Typography
                component={"span"}
                sx={{
                  // color: "rgb(35, 174, 73)",
                  // textDecoration: "underline",
                  fontWeight: '500',
                  cursor: "pointer",
                  width: "fit-content",
                  fontSize: "16px"
                }}
              >{data?.total_POCs}</Typography> : "0"
            } ) ( Total Revenue: {data?.total_revenue ?
              <Typography
                component={"span"}
                sx={{
                  // color: "rgb(35, 174, 73)",
                  // textDecoration: "underline",
                  fontWeight: '500',
                  cursor: "pointer",
                  width: "fit-content",
                  fontSize: "16px"
                }}
              >$ {data?.total_revenue.toFixed(2)}</Typography> : "$ 0"
            } )
            ( Total Calls: {data?.total_calls ?
              <Typography
                component={"span"}
                sx={{
                  // color: "rgb(35, 174, 73)",
                  // textDecoration: "underline",
                  fontWeight: '500',
                  cursor: "pointer",
                  width: "fit-content",
                  fontSize: "16px"
                }}
              >{data?.total_calls}</Typography> : "0"
            } )
          </span>
        </Typography>

        {filterPayload.bcgTab == 0 ? <div style={{ background: '#f5f4f4', padding: '5px', margin: '5px 0', borderRadius: '8px' }}>

          {/* Calender Filter */}
          <DatePickerField
            label={'Custom Date Range'}
            isCalenderValue={isCalender.value}
            calenderOpenClickHandler={calenderOpenClickHandler}
            calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
            isMobile={isMobile}
          />


          {/* Calender Picker Dialog */}
          <CalenderPickerDialog
            isOpen={isCalender.open}
            handleClose={() =>
              setCalender((prev: any) => ({ ...prev, open: false }))
            }
            setCalender={setCalender}
            okBtnApiCalls={(
              date: Date,
              tDate: Date,
              select: string | null,
              calenderType: string
            ) => {
              dataRangeFilter(date, tDate, select, calenderType);
            }}
            calenderType={isCalender.type}
            titleRadioBtns={calenderDialogTitles}
            resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
            singleTitle={'Select Date Range'}
            isOnClientDetails={true}
            startDate={dateFirst}
            endDate={dateLast}
          />
        </div> :
          <DropDownFilter
            link={`${AppRoutes.CLIENTS}/client-profile?id=${clientId}&name=${clientName}`}
            filterValue={filterPayload.bcgTab.toString()}
            setFilterPayload={(s: string) =>
              setFilterPayload((prev) => ({
                ...prev,
                bcgTab: parseInt(s),
                isFilterChange: true
              }))
            }
            dropDownItems={BCGClientFilters}
          />}
      </Grid>

      {data &&!isLoading ? <Grid container item xs={12} sx={{ mt: isMobile ? "0.25rem" : "0", position: 'relative', top: '-1em' }}>
        <TableViewCommon<TableData>
          rows={formatDataClientTable(data?.data || [])}
          totalSelected={0}
          title={``}
          headCells={headCells}
          isSelected={false}
          selectAllowed={(row) => false}
          handleTableRowClick={(e, row) => { }}
          tableCells={(row, labelId, isSelected) => <TableCellsRow
            row={row}
            labelId={labelId}
            isSelected={isSelected}
            clientId={clientId}
            clientName={clientName}
          />}
          isItemSelected={(id) => false}
          handleSelectAllClick={(e) => { }}
        />
      </Grid> : <>
        {[1, 2, 3, 4, 5].map(() => (
          <>
            <Grid item xs={2} sx={{ ...tableRowStyles, paddingLeft: "1rem" }}>
              <Skeleton />
            </Grid>
            <Grid item xs={2} sx={{ ...tableRowStyles }}>
              <Skeleton />
            </Grid>
            <Grid item xs={2} sx={{ ...tableRowStyles }}>
              <Skeleton />
            </Grid>
            <Grid item xs={2} sx={{ ...tableRowStyles }}>
              <Skeleton />
            </Grid>
            <Grid item xs={2} sx={{ ...tableRowStyles }}>
              <Skeleton />
            </Grid>
            <Grid item xs={2} sx={{ ...tableRowStyles }}>
              <Skeleton />
            </Grid>
          </>
        ))}
      </>
      }
    </Grid >
  );
};

export default BcgOverview;
