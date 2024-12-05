import React from 'react'
import { BoxFlex } from '../../atoms/boxSpaceBtw'
import SearchBar from '../app-bar-common/search-bar'
import { filterPayload, setFilterPayload } from '../../pages/Calls/types';

type Props = {
    setFilterPaylod: setFilterPayload;
    filterPayload: filterPayload;
}

const SearchBars = ({ setFilterPaylod, filterPayload }: Props) => {
    return (

        <BoxFlex sx={{ mt: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <SearchBar
                onSearch={(text) => setFilterPaylod((prev) => ({
                    ...prev,
                    search_by_id: text,
                    isFilterChange: true,
                }))}
                placeholder="Call ID"
                searchValue={filterPayload.search_by_id || ""}
                maxWidth="120px"
                minWidth={"100px"}
                p="5px"
                m={
                    {
                        sm: "0 0.75rem 0 0",
                        xs: "0 0.75rem 0 0"
                    }
                }
            />
            <SearchBar
                onSearch={(text) => setFilterPaylod((prev) => ({
                    ...prev,
                    search_by_project_id: text,
                    isFilterChange: true,
                }))}
                placeholder="Project ID"
                searchValue={filterPayload.search_by_project_id || ""}
                maxWidth="120px"
                minWidth={"100px"}
                p="5px"
                m={
                    {
                        sm: "0 0.75rem 0 0",
                        xs: "0 0.75rem 0 0"
                    }
                }
            />
            <SearchBar
                onSearch={(text) => setFilterPaylod((prev) => ({
                    ...prev,
                    search_by_expert_id: text,
                    isFilterChange: true,
                }))}
                placeholder="Expert ID"
                searchValue={filterPayload.search_by_expert_id || ""}
                maxWidth="120px"
                minWidth={"100px"}
                p="5px"
                m={
                    {
                        sm: "0 0.75rem 0 0",
                        xs: "0 0.75rem 0 0"
                    }
                }
            />
            <SearchBar
                onSearch={(text) => setFilterPaylod((prev) => ({
                    ...prev,
                    casecode: text,
                    isFilterChange: true,
                }))}
                placeholder="Case Code"
                searchValue={filterPayload.casecode || ""}
                maxWidth="130px"
                minWidth={"130px"}
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

export default SearchBars