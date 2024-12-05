import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";

import "./project-header-nav.scss";
import SortByFilters from "../../atoms/drop-down-filter";
import DatePickerField from "../../atoms/date-picker-field";
import CalenderPickerDialog from "../calender-picker-dialog/calenderPickerDialog";
import { useIsMobile, useIsTablet } from "../../utils/hooks/useIsMobile";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import {
  SortBy,
  calenderCloseClickhandler,
  calenderDialogTitles,
  calenderLabel,
  calenderOpenClickHandler,
  clientQuickFilterOption,
  getQuickFilterPayload,
  getQuickFilterValueFromPayload,
  quickFilterOption,
  sortByClients,
} from "./helper";
import {
  ProjectContext,
  dataRangeProjectFilter,
} from "../../pages/Projects/helper";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";
import { filterPayload } from "../../pages/Projects/types";
import { Select, SetSelect } from "../../organisms/project-cards/helper";
import TabFilters from "../../atoms/tabs-selector";
import { isClient } from "../../utils/role";
import DropDownDrawerWithChip from "../dropdown-drawer-with-chip";

type calenderTypes = {
  open: boolean;
  value: string;
  type: any;
};

type Props = {
  select: Select;
  setSelect: SetSelect;
};

const ProjectHeaderNav = ({ select, setSelect }: Props) => {
  const [isCalender, setCalender] = useState<calenderTypes>({
    open: false,
    value: "",
    type: null,
  });
  // USING TABLET SCREEN as MOBILE SCREEN FOR NOW
  // const isMobile = useIsMobile();
  const isMobile = useIsTablet();
  const navigate = useNavigate();
  const { filterPayload, setFilterPayload, defaultFilterPayload, handleResetFilters } =
    useContext(ProjectContext);


  const isFilterApplied = JSON.stringify(filterPayload) !== JSON.stringify(defaultFilterPayload)

  function resetFilters() {
    handleResetFilters()
    setFilterPayload({ ...defaultFilterPayload, isFilterChange: true })
    setCalender({ open: false, value: "", type: null });
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          borderBottom: "1px solid rgba(112, 112, 112, 0.21)",
          marginTop: "1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            flexWrap: "wrap",
          }}
        >
          <>
            {select.isClicked ? (
              <>
                {/* <CustomBtnFilled
                  label={"Change Status"}
                  variant="contained"
                  styles={{
                    background: "#F7DFC3",
                    color: "#252B3B",
                    marginRight: isMobile ? "0.5rem" : "1rem",
                  }}
                /> */}
                <CustomBtnFilled
                  label={"Pick New Account Manager"}
                  variant="contained"
                  styles={{
                    background: "#F7DFC3",
                    color: "#252B3B",
                  }}
                  onClick={() =>
                    setSelect((prev) => ({
                      ...prev,
                      isAccManagerDialog: {
                        ...prev.isAccManagerDialog,
                        state: true,
                      },
                    }))
                  }
                />
              </>
            ) : (
              <>
                {!isMobile && <p className="sort">Sort By:</p>}
                {isMobile ?
                  <DropDownDrawerWithChip
                    chipLabel="Sort By"
                    isClearDisabled
                    value={filterPayload.sortFilter}
                    listArr={isClient() ? sortByClients : SortBy}
                    onItemSelect={(value: string | null) => {
                      setFilterPayload((prev: filterPayload) => {
                        prev = {
                          ...prev,
                          sortFilter: value,
                          isFilterChange: true,
                        };
                        return prev;
                      })
                    }}
                  /> :
                  <SortByFilters
                    link={AppRoutes.PROJECTS + "/all?page=1"}
                    setFilterPayload={(type: string) =>
                      setFilterPayload((prev: filterPayload) => {
                        prev = {
                          ...prev,
                          sortFilter: type,
                          isFilterChange: true,
                        };
                        return prev;
                      })
                    }
                    dropDownItems={isClient() ? sortByClients : SortBy}
                    filterValue={filterPayload.sortFilter}
                  />
                }

                {!isClient() && <>
                  {!isMobile && <hr className="divider" />}
                  {isMobile &&
                    <DropDownDrawerWithChip
                      chipLabel="Type"
                      value={filterPayload.quickFilter ? getQuickFilterValueFromPayload(filterPayload.quickFilter) : null}
                      listArr={isClient() ? clientQuickFilterOption : quickFilterOption}
                      onItemSelect={(value: string | null) => {
                        setFilterPayload((prev: filterPayload) => {
                          prev = {
                            ...prev,
                            quickFilter: getQuickFilterPayload(value || ""),
                            isFilterChange: true,
                          };
                          return prev;
                        });
                      }}
                    />
                  }
                  <DatePickerField
                    label={calenderLabel(isCalender.type)}
                    isCalenderValue={isCalender.value}
                    calenderOpenClickHandler={() =>
                      calenderOpenClickHandler(setCalender)
                    }
                    calenderCloseBtnClickHandler={() => {
                      calenderCloseClickhandler(setCalender);
                      dataRangeProjectFilter(
                        null,
                        null,
                        null,
                        null,
                        setFilterPayload,
                        filterPayload,
                        navigate
                      );
                    }}
                    isMobile={isMobile}
                  />
                  {!isMobile && <hr className="divider" />}
                  {!isMobile && (
                    <Stack direction={"row"} alignItems={"center"}>
                      <TabFilters
                        onChange={(s: string) => {
                          setFilterPayload((prev: filterPayload) => {
                            prev = {
                              ...prev,
                              quickFilter: getQuickFilterPayload(s),
                              isFilterChange: true,
                            };
                            return prev;
                          });
                        }}
                        value={filterPayload.quickFilter ? getQuickFilterValueFromPayload(filterPayload.quickFilter) : ""}
                        options={isClient() ? clientQuickFilterOption : quickFilterOption}
                      />
                    </Stack>
                  )}
                </>}

                {/* {isMobile ? (
                  <Tooltip title="Download" arrow>
                    <IconButton
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        "&:hover": {
                          backgroundColor: "var(--primary-color)",
                        },
                      }}
                    >
                      <img
                        src={Download}
                        alt="Download"
                        width="14px"
                        height="14px"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button className="download-btn">
                    <img
                      src={Download}
                      alt="Download"
                      width="14px"
                      height="14px"
                    />
                    Download
                  </Button>
                )} */}
              </>
            )}
          </>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            marginLeft: isMobile ? "1rem" : "0",
          }}
        >
          {isFilterApplied ? (
            <Button
              sx={{
                textTransform: "capitalize",
                color: "#252B3B",
                marginRight: "0.3rem",
              }}
              onClick={resetFilters}
            >
              Clear All Filters
            </Button>
          ) : null}
          {select.isClicked && (
            <Typography
              style={{
                fontSize: "12px",
                color: "#252B3B",
                fontWeight: "400",
                marginRight: isMobile ? "0" : "16px",
                whiteSpace: "nowrap",
                marginLeft: isMobile ? "0" : "10px",
              }}
            >
              {select.selectedCards.length} Selected
            </Typography>
          )}
          {!isClient() &&
            <Button
              sx={{
                textTransform: "capitalize",
                color: "#252B3B",
                fontWeight: "400",
                fontSize: "12px",
              }}
              onClick={() =>
                setSelect((prev) => ({ ...prev, isClicked: !prev.isClicked }))
              }
            >
              {select.isClicked ? "Cancel" : "Select"}
            </Button>
          }
        </Box>
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
          select: string | null,
          calenderType: string | null
        ) =>
          dataRangeProjectFilter(
            date,
            tDate,
            select,
            calenderType,
            setFilterPayload,
            filterPayload,
            navigate
          )
        }
        calenderType={isCalender.type}
        titleRadioBtns={calenderDialogTitles}
        resetCalenderBtnClickHandler={() => {
          calenderCloseClickhandler(setCalender);
          dataRangeProjectFilter(
            null,
            null,
            null,
            null,
            setFilterPayload,
            filterPayload,
            navigate
          );
        }}
      />
    </>
  );
};
export default ProjectHeaderNav;
