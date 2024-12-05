import { usePaymentsContext } from '../../../pages/payments/context'
import { generatePaymentsDownloadUrl, seperatorStyle, sortByOptions, typeFilterOptions } from './helper';
import DropDownFilter from '../../../atoms/drop-down-filter';
import SearchBar from '../../app-bar-common/search-bar';
import { defaultFilterValues, getRefetchUrl } from '../../../pages/payments/helper';
import { useIsMobile } from '../../../utils/hooks/useIsMobile';
import DropDownDrawerWithChip from '../../dropdown-drawer-with-chip';
import DownloadBtn from '../../../atoms/download-btn';
import { isSuperAdmin } from '../../../utils/role';

const PaymentsNavbarItems = () => {
    const { filters, setFilters } = usePaymentsContext();
    const isMobile = useIsMobile();

    return (
        <>

            {/* Expert ID */}
            <SearchBar
                onSearch={(text) => setFilters((prev) => ({
                    ...prev,
                    isFilterApplied: text ? true : false,
                    isFilterChange: true,
                    expertID: text
                }))}
                placeholder="Expert ID"
                searchValue={filters.expertID || ""}
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

            {!isMobile && <hr style={seperatorStyle} />}

            {/* Sort by Filters */}
            {isMobile ?
                <DropDownDrawerWithChip
                    chipLabel="Sort By"
                    isClearDisabled
                    value={filters.sortBy}
                    listArr={sortByOptions}
                    onItemSelect={(filter: string | null) => {
                        setFilters((prev) => ({
                            ...prev,
                            sortBy: filter || "",
                            isFilterApplied: filter === defaultFilterValues.sortBy ? false : true,
                            isFilterChange: true
                        }))
                    }}
                />
                :
                <>
                    <p style={{ fontSize: "12px" }}>Sort By:</p>
                    <DropDownFilter
                        setFilterPayload={(filter) => {
                            setFilters((prev) => ({
                                ...prev,
                                sortBy: filter,
                                isFilterApplied: filter === defaultFilterValues.sortBy ? false : true,
                                isFilterChange: true
                            }))
                        }}
                        filterValue={filters.sortBy}
                        dropDownItems={sortByOptions}
                    />

                    <hr style={seperatorStyle} />
                </>
            }

            {/* Type Filters */}
            {isMobile ?
                <DropDownDrawerWithChip
                    chipLabel="Type"
                    isClearDisabled
                    value={filters.type}
                    listArr={typeFilterOptions}
                    onItemSelect={(filter: string | null) => {
                        setFilters((prev) => ({
                            ...prev,
                            type: filter || "",
                            isFilterApplied: filter === defaultFilterValues.type ? false : true,
                            isFilterChange: true
                        }))
                    }}
                />
                : <>
                    <p style={{ fontSize: "12px" }}>Type:</p>
                    <DropDownFilter
                        setFilterPayload={(filter) => {
                            setFilters((prev) => ({
                                ...prev,
                                type: filter,
                                isFilterApplied: filter === defaultFilterValues.type ? false : true,
                                isFilterChange: true
                            }))
                        }}
                        filterValue={filters.type}
                        dropDownItems={typeFilterOptions}
                    />
                </>
            }

            {/* Download Btn */}
            {isSuperAdmin() &&
                <DownloadBtn
                    link={generatePaymentsDownloadUrl(getRefetchUrl(filters))}
                />
            }
        </>
    )
}

export default PaymentsNavbarItems