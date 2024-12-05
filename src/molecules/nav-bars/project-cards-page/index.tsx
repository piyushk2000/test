import { useState } from "react";
import NavbarCommon from "../../nav-bar-common"
import { NavbarActions, NavbarActionsLength } from "./navbarActions";
import ProjectCardsNavbarItems from "./navbarItems";
import { useProjectPageContext } from "../../../pages/Projects/helper";
import { filterPayload } from "../../../pages/Projects/types";
import { getNavbarFilters } from "./helper";
import { checkObjectValuesSame } from "../../../utils/utils";
import { isClient } from "../../../utils/role";
import { Dayjs } from "dayjs";

export type CalenderTypes = {
    open: boolean;
    value: string;
    type: any;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null,
    tDate: Dayjs | null,
};

type Props = {
    isSelectedClicked: boolean;
    pickAccManagerHandler: () => void;
    isFilterApplied: boolean;
    resetFilters(): void;
    totalSelected: number;
    selectClickHandler(): void;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null;
}

const ProjectCardsNavbar = ({
    isSelectedClicked,
    pickAccManagerHandler,
    isFilterApplied,
    resetFilters,
    totalSelected,
    selectClickHandler,
    onActionSelect,
    selectedAction,
}: Props) => {
    const {
        filterPayload,
        defaultFilterPayload
    }: { filterPayload: filterPayload, defaultFilterPayload: filterPayload } = useProjectPageContext();

    const [isCalender, setCalender] = useState<CalenderTypes>({
        open: false,
        value: "",
        type: null,
        date: null,
        tDate: null,
        select: null
    });

    function finalResetFilters() {
        resetFilters();
        setCalender({ open: false, value: "", type: null, date: null, tDate: null, select: null });
    }

    const isNavbarFilterChanged = !checkObjectValuesSame(getNavbarFilters(filterPayload), getNavbarFilters(defaultFilterPayload));

    return (
        <NavbarCommon
            isSelectClicked={isSelectedClicked}
            Actions={NavbarActions(pickAccManagerHandler)}
            ActionsLength={NavbarActionsLength}
            NavbarItems={<ProjectCardsNavbarItems isCalender={isCalender} setCalender={setCalender} />}
            resetFilters={finalResetFilters}
            isFilterApplied={isFilterApplied}
            totalSelected={totalSelected}
            selectClickHandler={selectClickHandler}
            onActionSelect={onActionSelect}
            selectedAction={selectedAction}
            selectActionSubmitBtnName='Select'
            isNavbarFilterChanged={isNavbarFilterChanged}
            isSelectApplied={isClient() ? false : true}
        />
    )
}

export default ProjectCardsNavbar