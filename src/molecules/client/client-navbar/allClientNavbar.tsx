import Box from "@mui/material/Box";
import { allClientNavbarContainer } from "./style";
import DropDownFilter from "../../../atoms/drop-down-filter";
import { AppRoutes } from "../../../constants";
import {
  apiDataState,
  filter,
  setApiDataState,
} from "../../../organisms/client/all-clients/types";
import { SortBy, calenderDialogTitles, clientType, generateClientsDownloadUrl } from "./helper";
import DatePickerField from "../../../atoms/date-picker-field";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { useState } from "react";
import { dataRangeFilter } from "../../../organisms/client/all-clients/helper";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import DownloadBtn from "../../../atoms/download-btn";
import { isSuperAdmin } from "../../../utils/role";
import { Dayjs } from "dayjs";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
  filters: filter;
  setData: setApiDataState;
};

const AllClientsNavbar = ({ filters, setData }: Props) => {
  const isMobile = useIsMobile();
  const [isCalender, setCalender] = useState<{
    open: boolean;
    value: string;
    type: any;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null,
    tDate: Dayjs | null,
  }>({
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
      <Box sx={allClientNavbarContainer}>
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
          /> : <>
            {/* Sort By Filter */}
            <p className="sort">Sort By:</p>
            <DropDownFilter
              link={AppRoutes.CLIENTS + "/all"}
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

        {/* Type Filter */}
        {isMobile ?
          <DropDownDrawerWithChip
            chipLabel="Client Type"
            isClearDisabled
            value={filters.type}
            listArr={clientType}
            onItemSelect={(type: string | null) => {
              setData((prev: apiDataState) => {
                prev = {
                  ...prev,
                  filter: {
                    ...prev.filter,
                    type: type || "",
                    isFilterChange: true,
                  },
                };
                return prev;
              })
            }}
          />
          :
          <>
            <hr />
            <p className="sort">Client Type:</p>
            <DropDownFilter
              link={AppRoutes.CLIENTS + "/all"}
              setFilterPayload={(type: string) =>
                setData((prev: apiDataState) => {
                  prev = {
                    ...prev,
                    filter: {
                      ...prev.filter,
                      type: type,
                      isFilterChange: true,
                    },
                  };
                  return prev;
                })
              }
              dropDownItems={clientType}
              filterValue={filters.type}
            />
          </>
        }


        {isSuperAdmin() &&
          <DownloadBtn
            link={generateClientsDownloadUrl(filters)}
          />
        }
      </Box>


      {/* Calender Picker Dialog */}
      <CalenderPickerDialog
        isOpen={isCalender.open}
        handleClose={() =>
          setCalender((prev: any) => ({ ...prev, open: false }))
        }
        setCalender={setCalender}
        select={isCalender.select}
        startDate={isCalender.date}
        endDate={isCalender.tDate}
        okBtnApiCalls={(
          date: Date | null,
          tDate: Date | null,
          select: "between" | "on" | "before" | "after" | null,
          calenderType: string
        ) => {
          dataRangeFilter(date, tDate, select, calenderType, setData);
          setCalender((prev) => ({ ...prev, date: date ? LocalDayjs(date) : null, tDate: tDate ? LocalDayjs(tDate) : null, select }))
        }}
        calenderType={isCalender.type}
        titleRadioBtns={calenderDialogTitles}
        resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
      />
    </>
  );
};

export default AllClientsNavbar;
