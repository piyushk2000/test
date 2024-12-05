import TabFilters from "../../../atoms/tabs-selector"
import { useMyCalenderContext } from "../../../pages/my-calendar/context"
import { groupedByProject } from "./helper"


const MyCalenderNavbarItems = () => {

    const { filters, setFilters } = useMyCalenderContext();

    return (
        <TabFilters
            value={filters.tab}
            options={groupedByProject}
            onChange={(s) => setFilters((prev) => ({
                ...prev,
                tab: s,
                isFilterChange: true,
                isFilterApplied: true,
            }))}
        />
    )
}

export default MyCalenderNavbarItems