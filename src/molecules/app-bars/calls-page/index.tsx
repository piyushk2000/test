import React from "react";
import CallsFilter from "../../../organisms/call-page-filter";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { isAdmin, isClient, isExpert, isFinance, isSuperAdmin } from "../../../utils/role";
import AppBarCommon from "../../app-bar-common";
import { AppbarToggleOptions } from "../../app-bar-common/types";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

type Props = { searchValue: string, setQueryString(queryString: string): void, isAdvanceFilter: boolean, searchFilter(text: string): void, filterFormRef: React.MutableRefObject<any> ; downloadBtnClickHandler: () => void; mode: "card" | "list" | "kanban";  setToggle: (option: AppbarToggleOptions) => void;
};

const CallsHeader = ({ searchValue, setQueryString, isAdvanceFilter, searchFilter, filterFormRef , downloadBtnClickHandler, mode, setToggle}: Props) => {
  const {
    value: openFilter,
    setTrue: setFilerOpen,
    setFalse: setFilerClose,
  } = useBoolean();

  const is_expert = isExpert();

  return (
    <>
      <CallsFilter
        filterFormRef={filterFormRef}
        openDialog={openFilter}
        handleClose={setFilerClose}
        setQueryString={setQueryString}
      />
      <AppBarCommon
        title={is_expert ? "Completed Calls" : "Calls"}
        isSearch={!isClient()}
        searchLabel="Search by call title, call medium, status"
        onSearch={(text) => {
          searchFilter(text);
        }}
        searchValue={searchValue}
        isFilter={!isExpert() && !isClient()}
        onFilterClick={setFilerOpen}
        isUserIcon
        onAddIconClick={() => { }}
        isToggle={true}
        toggleOptions={(isAdmin() || isSuperAdmin()) ? ["card", "list"] : ["card"]}
        selectedToggleOption={mode}
        onToggleOptionChange={setToggle}
        // toggleOptions={["card"]}
        // selectedToggleOption="card"
        // onToggleOptionChange={() => { }}
        isIconDefine={false}
        isAdvanceFilter={isAdvanceFilter}
        downloadBtnClickHandler={(isSuperAdmin() || isFinance()) ? downloadBtnClickHandler: undefined}
      />
    </>
  );
};

export default CallsHeader;
