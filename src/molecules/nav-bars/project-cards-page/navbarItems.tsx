
import Stack from "@mui/material/Stack";
import "./project-header-nav.scss";
import SortByFilters from "../../../atoms/drop-down-filter";
import DatePickerField from "../../../atoms/date-picker-field";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import { useIsTablet } from "../../../utils/hooks/useIsMobile";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ProjectContext, dataRangeProjectFilter, useProjectPageContext } from "../../../pages/Projects/helper";
import { useNavigate } from "react-router-dom";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
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
import { filterPayload } from "../../../pages/Projects/types";
import TabFilters from "../../../atoms/tabs-selector";
import { AppRoutes } from "../../../constants";
import { CalenderTypes } from ".";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import SearchBar from "../../app-bar-common/search-bar";
// import groups from "../../../organisms/groups";
import { getGroupsData, status2 } from "../../../organisms/project-filter-dialog/helper";
import DropDownFilter from "../../../atoms/drop-down-filter";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
    isCalender: CalenderTypes;
    setCalender: Dispatch<SetStateAction<CalenderTypes>>
}

const ProjectCardsNavbarItems = ({ isCalender, setCalender }: Props) => {
    const isMobile = useIsTablet();
    const navigate = useNavigate();
    const { filterPayload, setFilterPayload } =
        useContext(ProjectContext);

    return (
      <>
        {!isMobile && <p className="sort">Sort By:</p>}
        {isMobile ? (
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
              });
            }}
          />
        ) : (
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
        )}

        {!isClient() && (
          <>
            {!isMobile && <hr className="divider" />}
            {isMobile && (
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
            )}
            <DatePickerField
              label={calenderLabel(isCalender.type)}
              isCalenderValue={isCalender.value}
              calenderOpenClickHandler={() => calenderOpenClickHandler(setCalender)}
              calenderCloseBtnClickHandler={() => {
                calenderCloseClickhandler(setCalender);
                dataRangeProjectFilter(null, null, null, null, setFilterPayload, filterPayload, navigate);
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
          </>
        )}

            {(isSuperAdmin() || isAdmin()) && (
                <>
                    <SearchBar
                        onSearch={(text) => setFilterPayload((prev: filterPayload) => ({
                            ...prev,
                            isFilterChange: true,
                            search_by_id: text
                        }
                        ))}
                        placeholder="Project ID"
                        searchValue={filterPayload.search_by_id || ""}
                        maxWidth="120px"
                        minWidth={"100px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                    />
                    <SearchBar
                        onSearch={(text) =>

                            setFilterPayload((prev: filterPayload) => ({
                                ...prev,
                                isFilterChange: true,
                                client_case_code_search: text,
                            }))

                        }

                        placeholder="Case Code"
                        searchValue={filterPayload.client_case_code_search || ""}
                        maxWidth="125px"
                        minWidth="100px"
                        p="5px"
                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                    />
                </>
            )}

        {/* Calender Picker Dialog */}

            {isCalender.open &&
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
                        calenderType: string | null
                    ) => {
                        dataRangeProjectFilter(
                            date,
                            tDate,
                            select,
                            calenderType,
                            setFilterPayload,
                            filterPayload,
                            navigate
                        )
                        setCalender((prev) => ({ ...prev, date: date ? LocalDayjs(date) : null, tDate: tDate ? LocalDayjs(tDate) : null, select }))
                    }
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
            }

        {isClient() && (
          <>
            {!isMobile && <hr className="divider" />}
            {isMobile ? (
              <DropDownDrawerWithChip
                chipLabel="Status"
                isClearDisabled
                value={filterPayload.status}
                listArr={status2}
                onItemSelect={(status: string | null) => {
                  setFilterPayload((prev: filterPayload) => ({ ...prev, isFilterChange: true, status: status || "" }));
                }}
              />
            ) : (
              <>
                {/* Call Medium */}
                <p className="sort">Status:</p>
                <DropDownFilter
                  setFilterPayload={(status: string) => {
                    setFilterPayload((prev: filterPayload) => ({ ...prev, isFilterChange: true, status }));
                  }}
                  dropDownItems={status2}
                  filterValue={filterPayload.status}
                />
              </>
            )}
            <SearchBar
              onSearch={(text) =>
                setFilterPayload((prev: filterPayload) => ({
                  ...prev,
                  isFilterChange: true,
                  client_topic_search: text,
                }))
              }
              placeholder="Topic"
              searchValue={filterPayload.client_topic_search || ""}
              maxWidth="120px"
              minWidth={"100px"}
              p="5px"
              m={{
                sm: "0 0.75rem 0 0",
                xs: "0 0.75rem 0 0",
              }}
            />
            <SearchBar
              onSearch={(text) =>
                setFilterPayload((prev: filterPayload) => ({
                  ...prev,
                  isFilterChange: true,
                  client_case_code_search: text,
                }))
              }
              placeholder="Case Code"
              searchValue={filterPayload.client_case_code_search || ""}
              maxWidth="150px"
              minWidth={"120px"}
              p="5px"
              m={{
                sm: "0 0.75rem 0 0",
                xs: "0 0.75rem 0 0",
              }}
            />
          </>
        )}
      </>
    );
}

export default ProjectCardsNavbarItems