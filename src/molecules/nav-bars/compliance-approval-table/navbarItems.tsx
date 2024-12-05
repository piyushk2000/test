import Stack from "@mui/material/Stack";
import { statusTabFilterOptions } from "./helper"
import MultiTabFilters from "../../../atoms/tabs-selector/multi";
import { useComplianceApproval } from "../../../pages/compliance-approval-table/context";


const MyCalenderNavbarItems = () => {

    const { filters, setFilters } = useComplianceApproval();

    return (
        <>
            <Stack direction={"row"} alignItems={"center"}>
                <MultiTabFilters
                    setFormats={(s: string[]) => {
                        setFilters((prev) => ({
                            ...prev,
                            status: s,
                            isFilterApplied: true,
                            isFilterChange: true
                        }))
                    }}
                    formats={filters.status}
                    options={statusTabFilterOptions}
                />
            </Stack>
        </>
    )
}

export default MyCalenderNavbarItems