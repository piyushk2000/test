import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import SearchBar from "../../../../molecules/app-bar-common/search-bar";
import { useIsMobile } from "../../../../utils/hooks/useIsMobile";
import { apiDataState, setApiDataContactState } from "../types";



type Props = {
    filters: apiDataState["filter"];
    setData: setApiDataContactState;
};

const SearchBars = ({ filters, setData }: Props) => {
    const isMobile = useIsMobile();
    return (

        <BoxFlex sx={{ml:isMobile?'0em':'2em', mt: isMobile?'1em':"0rem",mb:'0.3em', flexWrap: "wrap", gap: "1rem" }}>
            <SearchBar
                onSearch={(text) => {
                    setData((prev: apiDataState) => {
                      prev = {
                        ...prev,
                        filter: {
                          ...prev.filter,
                          id: text || "",
                          isFilterChange: true,
                        },
                      };
                      return prev;
                    })
                  }}
                placeholder="ID"
                searchValue={filters.id || ""}
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
                onSearch={(text) => {
                    setData((prev: apiDataState) => {
                      prev = {
                        ...prev,
                        filter: {
                          ...prev.filter,
                          name: text || "",
                          isFilterChange: true,
                        },
                      };
                      return prev;
                    })
                  }}
                placeholder="Name"
                searchValue={filters.name || ""}
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
                onSearch={(text) => {
                    setData((prev: apiDataState) => {
                      prev = {
                        ...prev,
                        filter: {
                          ...prev.filter,
                          email: text || "",
                          isFilterChange: true,
                        },
                      };
                      return prev;
                    })
                  }}
                placeholder="Email"
                searchValue={filters.email || ""}
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
        </BoxFlex>
    )
}

export default SearchBars