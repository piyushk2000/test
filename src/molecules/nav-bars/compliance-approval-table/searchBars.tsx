import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { useComplianceApproval } from "../../../pages/compliance-approval-table/context"
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import SearchBar from "../../app-bar-common/search-bar";

export function SearchBars() {

    const { setFilters, filters } = useComplianceApproval();
    const isMobile = useIsMobile();

    return (
        <BoxFlex sx={{ marginTop: isMobile ? "0.5rem" : "1.5rem", gap: "1rem" }}>
            <SearchBar
                onSearch={(text) => setFilters((prev) => ({
                    ...prev,
                    isFilterApplied: text ? true : false,
                    isFilterChange: true,
                    client_contact_name: text
                }))}
                placeholder="Client Contact"
                searchValue={filters.client_contact_name || ""}
                maxWidth="200px"
                minWidth={"100px"}
                p="10px"
                m={
                    {
                        sm: "0",
                        xs: "0"
                    }
                }
            />
            <SearchBar
                onSearch={(text) => setFilters((prev) => ({
                    ...prev,
                    isFilterApplied: text ? true : false,
                    isFilterChange: true,
                    expert_name: text
                }))}
                placeholder="Expert Name"
                searchValue={filters.expert_name || ""}
                maxWidth="200px"
                minWidth={"100px"}
                p="10px"
                m={
                    {
                        sm: "0",
                        xs: "0"
                    }
                }
            />
            <SearchBar
                onSearch={(text) => setFilters((prev) => ({
                    ...prev,
                    isFilterApplied: text ? true : false,
                    isFilterChange: true,
                    expert_id: text
                }))}
                placeholder="Expert ID"
                searchValue={filters.expert_id || ""}
                maxWidth="200px"
                minWidth={"100px"}
                p="10px"
                m={
                    {
                        sm: "0",
                        xs: "0"
                    }
                }
            />
        </BoxFlex>
    )
}