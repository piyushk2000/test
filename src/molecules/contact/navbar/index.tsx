import Box from "@mui/material/Box";
import DropDownFilter from "../../../atoms/drop-down-filter";
import DatePickerField from "../../../atoms/date-picker-field";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { useState } from "react";
import { SortBy, calenderDialogTitles } from "./helper";
import { allClientNavbarContainer } from "../../client/client-navbar/style";
import {
  apiDataState,
  setToggleCardState,
  setApiDataContactState,
  AppbarToggleOptions,
} from "../../../organisms/contacts/allContacts/types";
import { dataRangeFilter } from "../../../organisms/contacts/allContacts/helper";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import SearchBars from "../../../organisms/contacts/allContacts/contacts-page/searchbars";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { addIconStyle, addOfficeBtn } from "../../client/client-page/style";
import ConditionallyRender from "../../../atoms/conditional-render";
import { ClientHeaderIcons, ClientMenuIcons } from "../../client-profile-header";
import MenuListIcon from "../../../assets/images/client/list.png";
import MenuListIconWhite from "../../../assets/images/client/list_white.png";
import MenuIcon from "../../../assets/images/client/menu.png";
import MenuIconBlack from "../../../assets/images/client/menu_black.png";
import { Dayjs } from "dayjs";
import { LocalDayjs } from "../../../utils/timezoneService";

const listBtnStyle = {
  backgroundColor: "#EC9324",
};
const menuBtnStyle = {
  backgroundColor: "#ffffff",
};


type Props = {
  filters: apiDataState["filter"];
  setData: setApiDataContactState;
  contained?: boolean;
  openAddContactDialog?: () => void;
  selectedToggleOption: AppbarToggleOptions;
  onToggleOptionChange: setToggleCardState;
};

export type IsCalenderTypes = {
  open: boolean;
  value: string;
  type: string | null;
  select: "between" | "on" | "before" | "after" | null;
  date: Dayjs | null;
  tDate: Dayjs | null;
}

const AllContactsNavbar = ({ filters, setData, contained, openAddContactDialog, selectedToggleOption, onToggleOptionChange }: Props) => {
  const isMobile = useIsMobile();
  const [isCalender, setCalender] = useState<IsCalenderTypes>({
    open: false,
    value: "",
    type: null,
    select: null,
    date: null,
    tDate: null
  });

  const calenderCloseBtnClickHandler = () => {
    setCalender((prev: any) => ({
      open: false,
      value: "",
      type: null,
      select: null,
      date: null,
      tDate: null
    }));
    setData((prev: apiDataState) => ({
      ...prev,
      filter: {
        ...prev.filter,
        calender: null,
        isFilterChange: true,
      },
    }));
  };

  const calenderOpenClickHandler = () => {
    setCalender((prev: any) => ({ ...prev, open: true }));
  };

  return (
    <>
      <Box sx={allClientNavbarContainer} mt={"24px"} >
        {/* Sort By Filter */}
        {isMobile ?
          <DropDownDrawerWithChip
            chipLabel="Sort By"
            isClearDisabled
            value={filters.sort_by}
            listArr={SortBy}
            onItemSelect={(sort: string | null) => {
              setData((prev: apiDataState) => {
                prev = {
                  ...prev,
                  filter: {
                    ...prev.filter,
                    sort_by: sort || "",
                    isFilterChange: true,
                  },
                };
                return prev;
              })
            }}
          /> :
          <>
            <p className="sort">Sort By:</p>
            <DropDownFilter
              setFilterPayload={(sort: string) =>
                setData((prev: apiDataState) => {
                  prev = {
                    ...prev,
                    filter: {
                      ...prev.filter,
                      sort_by: sort,
                      isFilterChange: true,
                    },
                  };
                  return prev;
                })
              }
              dropDownItems={SortBy}
              filterValue={filters.sort_by}
            />
            <hr />
          </>
        }


        {/* Calender Filter */}
        <DatePickerField
          label={
            isCalender.type === "updated_at" || !isCalender.type
              ? "Updated: "
              : "Created: "
          }
          isCalenderValue={isCalender.value}
          calenderOpenClickHandler={calenderOpenClickHandler}
          calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
          isMobile={isMobile}
        />
        {contained && isMobile ? <Tooltip title={"Add Client Contact"} arrow>
          <IconButton sx={addOfficeBtn}
            onClick={openAddContactDialog}
          >
            <AddIcon sx={addIconStyle} />
          </IconButton>
        </Tooltip> : ''}


        {/* Add Searches */}
        {isMobile ? <br></br> : ''}
        <SearchBars filters={filters} setData={setData}></SearchBars>
        {contained && !isMobile ? <Tooltip title={"Add Client Contact"} arrow>
          <IconButton sx={{
            backgroundColor: "#EC9324", height: '34px', width: '34px', "&:hover, &:focus": {
              backgroundColor: "#EC9324",
            },
          }}
            onClick={openAddContactDialog}
          >
            <AddIcon sx={addIconStyle} />
          </IconButton></Tooltip> : ''}
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
      </Box>

      {/* Calender Picker Dialog */}
      <CalenderPickerDialog
        isOpen={isCalender.open}
        handleClose={() =>
          setCalender((prev: any) => ({ ...prev, open: false }))
        }
        setCalender={setCalender}
        okBtnApiCalls={(
          date: Date | null,
          tDate: Date | null,
          select: "between" | "on" | "before" | "after" | null,
          calenderType: string
        ) => {
          dataRangeFilter(date, tDate, select, calenderType, setData);
          setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))
        }}
        calenderType={isCalender.type}
        titleRadioBtns={calenderDialogTitles}
        resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
      />
    </>
  );
};

export default AllContactsNavbar;
