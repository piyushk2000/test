import { useComplianceApproval } from "../../../pages/compliance-approval-table/context";
import NavbarCommon from "../../nav-bar-common"
import { SelectedAction } from "../../nav-bar-common/type";
import { NavbarActions, NavbarActionsLength } from "./navbarActions";
import ComplianceApprovalTableItems from "./navbarItems"
import { SearchBars } from "./searchBars";


type Props = {
    bulkCompliances: (a: "Approve" | "Reject") => void;
}

const ComplianceApprovalTableNavbar = ({bulkCompliances}: Props) => {
    const { filters, resetFilters, select, setSelect, selectedAction, setSelectedAction , setDialog} = useComplianceApproval();

    const onActionSelect=(action: SelectedAction) => setSelectedAction(action);

    return (
        <>
            <SearchBars />
            <NavbarCommon
                NavbarItems={<ComplianceApprovalTableItems />}
                resetFilters={resetFilters}
                Actions={NavbarActions(() => bulkCompliances("Approve"),() => bulkCompliances("Reject"))}
                totalSelected={select.selectedCards.length}
                selectClickHandler={() => {
                    setSelect((prev) => ({
                        selectedCards: [],
                        isClicked: !prev.isClicked,
                        callAction: null
                    }))
                }}
                isSelectClicked={select.isClicked}
                ActionsLength={NavbarActionsLength}
                isFilterApplied={filters.isFilterApplied}
                selectedAction={selectedAction}
                onActionSelect={onActionSelect}
                isSelectApplied={true}
                selectActionSubmitBtnName='Select'
                outerBoxStylesx={{ marginTop: "0.2rem" }}
            />
        </>

    )
}

export default ComplianceApprovalTableNavbar