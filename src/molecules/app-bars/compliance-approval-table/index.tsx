import { useComplianceApproval } from "../../../pages/compliance-approval-table/context";
import AppBarCommon from "../../app-bar-common";

const ComplianceApprovalTableHeader = () => {
    const { setFilters } = useComplianceApproval();

    return (
        <AppBarCommon
            title={"Compliance Approval"}
            isSearch={true}
            onSearch={(query) => setFilters((prev) => ({
                ...prev,
                project_external_topic: query,
                isFilterApplied: query ? true : false,
                isFilterChange: false
            }))}
            searchLabel="Project Topic"
            isUserIcon
            isIconDefine={false}
            isSidebar

        />
    )
}

export default ComplianceApprovalTableHeader;