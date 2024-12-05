import { Dispatch, SetStateAction, useState } from "react";
import NavbarCommon from "../../nav-bar-common"
import { NavbarActions, NavbarActionsLength } from "./navbarActions"
import ExpertCardsNavbarItems from "./navbarItems";
import { SetFilterPayload, filterPayload } from "../../../pages/Experts/types";
import { checkObjectValuesSame } from "../../../utils/utils";
import { defaultFilterPayload } from "../../../pages/Experts/helper";
import { getNavbarFilters } from "./helper";
import { Dayjs } from "dayjs";

export type IsCalenderTypes = {
    open: boolean;
    value: string;
    type: string | null;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null,
    tDate: Dayjs | null,
}

export type SetCalenderTypes = Dispatch<SetStateAction<IsCalenderTypes>>

type Props = {
    isSelectedClicked: boolean;
    addToProjectClickHandler: () => void;
    addToStagingClickHandler: () => void;
    isFilterApplied: boolean;
    resetFilters(): void;
    totalSelected: number;
    selectClickHandler(): void;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null;
    filterPayload: filterPayload;
    setFilterPayload: SetFilterPayload;
    okBtnApiCalls: (
        date: Date | null,
        tDate: Date | null,
        select: string | null,
        calenderType: string | null
    ) => void;
    setTypeFilter: (type: string) => void;
    getUrlPayload: () => Promise<{
        url: string;
        payload: any;
    } | undefined>
}


const ExpertCardsNavbar = ({
    isSelectedClicked,
    addToProjectClickHandler,
    resetFilters,
    isFilterApplied,
    totalSelected,
    selectClickHandler,
    onActionSelect,
    selectedAction,
    filterPayload,
    setFilterPayload,
    okBtnApiCalls,
    setTypeFilter,
    addToStagingClickHandler,
    getUrlPayload
}: Props) => {
    const [isCalender, setCalender] = useState<IsCalenderTypes>({
        open: false,
        value: "",
        type: null,
        select: null,
        date: null,
        tDate: null
    });

    const isNavbarFilterChanged = !checkObjectValuesSame(getNavbarFilters(filterPayload), getNavbarFilters(defaultFilterPayload));
    return (
        <NavbarCommon
            isSelectClicked={isSelectedClicked}
            Actions={NavbarActions(addToProjectClickHandler,addToStagingClickHandler)}
            ActionsLength={NavbarActionsLength}
            NavbarItems={
                <ExpertCardsNavbarItems
                    filterPayload={filterPayload}
                    setFilterPayload={setFilterPayload}
                    okBtnApiCalls={okBtnApiCalls}
                    setTypeFilter={setTypeFilter}
                    isCalender={isCalender}
                    setCalender={setCalender}
                    getUrlPayload={getUrlPayload}
                />
            }
            resetFilters={resetFilters}
            isFilterApplied={isFilterApplied}
            totalSelected={totalSelected}
            selectClickHandler={selectClickHandler}
            onActionSelect={onActionSelect}
            selectedAction={selectedAction}
            selectActionSubmitBtnName='Select'
            isNavbarFilterChanged={isNavbarFilterChanged}
            outerBoxStylesx={{ marginTop: "0.2rem" }}
        />
    )
}

export default ExpertCardsNavbar