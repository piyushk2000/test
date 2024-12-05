import SearchBar from "../../molecules/app-bar-common/search-bar"
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { BoxFlex } from "../boxSpaceBtw";


export const SearchFields = () => {

    const {
        filters,
        setFilters,
    } = useMyCalenderContext();

    return (
        <BoxFlex>
            <SearchBar
                onSearch={(text) => setFilters((prev) => ({
                    ...prev,
                    search_by_expert: text
                }))}
                placeholder="Expert"
                searchValue={filters.search_by_expert}
                maxWidth="150px"
                minWidth={"100px"}
                p="5px"
                m={
                    {
                        sm: "0 0.75rem 0 0",
                        xs: "0 0.75rem 0 0"
                    }
                }
            />
        </BoxFlex>

    )
}
