import Box from "@mui/material/Box";
import DropDownFilter from "../../../atoms/drop-down-filter";
import DatePickerField from "../../../atoms/date-picker-field";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { useState } from "react";
import { calenderDialogTitles } from "./helper";
import { allClientNavbarContainer } from "../../client/client-navbar/style";
import {
  apiDataState,
  setToggleCardState,
  setApiDataComplianceState,
  AppbarToggleOptions,
} from "../../../organisms/compliances/allCompliances/types";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import AddIcon from "@mui/icons-material/Add";
import ConditionallyRender from "../../../atoms/conditional-render";
import { ClientHeaderIcons, ClientMenuIcons } from "../../client-profile-header";
import MenuListIcon from "../../../assets/images/client/list.png";
import MenuListIconWhite from "../../../assets/images/client/list_white.png";
import MenuIcon from "../../../assets/images/client/menu.png";
import MenuIconBlack from "../../../assets/images/client/menu_black.png";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { getComplianceDataBymonth } from "../../../organisms/compliances/allCompliances/helper";
import { DateType } from "../../../organisms/my-calendar/types";
import { LocalDayjs } from "../../../utils/timezoneService";
import { BCGClientFilters } from "../../../organisms/client/client-page/helper";

const listBtnStyle = {
  backgroundColor: "#EC9324",
};
const menuBtnStyle = {
  backgroundColor: "#ffffff",
};

type Props = {
  fkClient: string | null,
  filters: apiDataState["filter"];
  setData: setApiDataComplianceState;
  contained?: boolean;
  openAddComplianceDialog?: () => void;
  selectedToggleOption: AppbarToggleOptions;
  onToggleOptionChange: setToggleCardState;
};

const AllComliancesNavbar = ({ fkClient, filters, setData, contained, openAddComplianceDialog, selectedToggleOption, onToggleOptionChange }: Props) => {
  const isMobile = useIsMobile();
  const [isCalender, setCalender] = useState<any>({
    open: false,
    value: "",
    type: null,
  });
  let now = new Date();
  const [dateFirst, setDateFirst] = useState<DateType>(LocalDayjs(new Date(now.getFullYear(), now.getMonth() - 5)).startOf('month'))
  const [dateLast, setDateLast] = useState<DateType>(LocalDayjs().endOf('month'))


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
    getComplianceDataBymonth(fkClient, setData, date, tDate);
    setData((prev: apiDataState) => ({
      ...prev,
      filter: {
        ...prev.filter,
        date:date,
        tDate:tDate,
        isFilterChange: true,
      },
    }))
    setDateFirst(LocalDayjs(date));
    setDateLast(LocalDayjs(tDate));
    console.log('data time ', date, tDate);
  }


  const calenderOpenClickHandler = () => {
    setCalender((prev: any) => ({ ...prev, open: true }));
  };

  return (
    <>
      <Box sx={allClientNavbarContainer} mt={"24px"} >
        {/* Sort By Filter */}



        {/* Calender Filter */}

        <CustomBtnFilled
          label={"Add Compliance"}
          variant="contained"
          onClick={openAddComplianceDialog}
        >
          <AddIcon />
        </CustomBtnFilled>

        <div
          className="expert-header-Menubtns"
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "50%",
            height: "34px",
            alignItems: "center",
            marginLeft: '1em'
          }}
        >
          <ConditionallyRender
            render={true}
          >
            <ClientHeaderIcons
              isIcon={true}
              title="Card View"
              icon={
                selectedToggleOption === "card"
                  ? MenuIcon
                  : MenuIconBlack
              }
              width="80%"
              height="80%"
              style={
                selectedToggleOption === "card"
                  ? null
                  : menuBtnStyle
              }
              handleClick={() => onToggleOptionChange("card")}
            />
          </ConditionallyRender>
          <ConditionallyRender
            render={true}
          >
            <ClientMenuIcons
              isIcon={true}
              title="Table View"
              icon={
                selectedToggleOption === "list"
                  ? MenuListIconWhite
                  : MenuListIcon
              }
              width="80%"
              height="80%"
              style={
                selectedToggleOption === "list"
                  ? listBtnStyle
                  : null
              }
              handleClick={() => onToggleOptionChange("list")}
            />
          </ConditionallyRender></div>

       <p style={{marginLeft:'1em', fontSize: "12px", fontWeight: "500"}}> Created At:</p>
       {filters.bcgTab == 0 ? <div style={{ background: '#f5f4f4', padding: '5px', margin: '5px 0', borderRadius: '8px' }}>

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
            filterValue={filters.bcgTab.toString()}
            setFilterPayload={(s: string) => {

              setData((prev: apiDataState) => ({
                ...prev,
                filter: {
                  ...prev.filter,
                  bcgTab: parseInt(s),
                  isFilterChange: true,
                },
              }))
            }}
            dropDownItems={BCGClientFilters}
          />}
      </Box>
    </>
  );
};

export default AllComliancesNavbar;
