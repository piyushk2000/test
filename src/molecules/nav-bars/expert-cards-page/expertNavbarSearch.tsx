import React from 'react';
import SearchBar from "../../app-bar-common/search-bar";
import { SetFilterPayload, filterPayload } from "../../../pages/Experts/types";
import { isClient } from "../../../utils/role";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useIsTablet } from "../../../utils/hooks/useIsMobile";

type Props = {
    filterPayload: filterPayload,
    setFilterPayload: SetFilterPayload,
}

const ExpertNavSearch = ({ filterPayload, setFilterPayload }: Props) => {
    const isMobile = useIsTablet();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                flexWrap: "wrap",
                width: "100%",
                marginTop: isMobile ? "0.5rem" : "1.5rem"
            }}
        >
            {!isMobile ? (
                <>
                    <SearchBar
                        showToolTip
                        onSearch={(text) => setFilterPayload((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            otherSearchFilter: {
                                ...prev.otherSearchFilter,
                                id: text,
                            }
                        }))}
                        placeholder="ID"
                        searchValue={filterPayload.otherSearchFilter.id || ""}
                        maxWidth="110px"
                        minWidth={"110px"}
                        p="5px"
                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                        showSearchIcon={false}
                    />
                    <SearchBar
                        showToolTip
                        showSearchIcon={false}
                        onSearch={(text) => setFilterPayload((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            otherSearchFilter: {
                                ...prev.otherSearchFilter,
                                name: text,
                            }
                        }))}
                        placeholder="Name"
                        searchValue={filterPayload.otherSearchFilter.name || ""}
                        maxWidth="110px"
                        minWidth={"110px"}
                        p="5px"
                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                    />
                    {!isClient() && (
                        <>
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        nick_name: text,
                                    }
                                }))}
                                placeholder="Nick Name"
                                searchValue={filterPayload.otherSearchFilter.nick_name || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        email: text,
                                    }
                                }))}
                                placeholder="Email"
                                searchValue={filterPayload.otherSearchFilter.email || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        mobile: text,
                                    }
                                }))}
                                placeholder="Mobile"
                                searchValue={filterPayload.otherSearchFilter.mobile || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        headline: text,
                                    }
                                }))}
                                placeholder="Headline"
                                searchValue={filterPayload.otherSearchFilter.headline || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        bio: text,
                                    }
                                }))}
                                placeholder="Bio"
                                searchValue={filterPayload.otherSearchFilter.bio || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        functions: text,
                                    }
                                }))}
                                placeholder="Functions"
                                searchValue={filterPayload.otherSearchFilter.functions || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        company: text,
                                    }
                                }))}
                                placeholder="Company"
                                searchValue={filterPayload.otherSearchFilter.company || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        domain: text,
                                    }
                                }))}
                                placeholder="Domain"
                                searchValue={filterPayload.otherSearchFilter.domain || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                        </>
                    )}
                </>
            ) : (
                <Accordion>
                    <AccordionSummary sx={{ background: '#6F696912' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography sx={{ fontSize: '12px', color: '#252b3b' }}>Quick Filters</Typography>
                    </AccordionSummary >
                    <AccordionDetails >
                        <Typography sx={{ display: 'flex', flexWrap: 'wrap', background: '#6f696912', gap: '6px', paddingTop: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>

                            <SearchBar
                                showToolTip
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        id: text,
                                    }
                                }))}
                                placeholder="ID"
                                searchValue={filterPayload.otherSearchFilter.id || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                showSearchIcon={false}
                            />
                            <SearchBar
                                showToolTip
                                showSearchIcon={false}
                                onSearch={(text) => setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    otherSearchFilter: {
                                        ...prev.otherSearchFilter,
                                        name: text,
                                    }
                                }))}
                                placeholder="Name"
                                searchValue={filterPayload.otherSearchFilter.name || ""}
                                maxWidth="110px"
                                minWidth={"110px"}
                                p="5px"
                                m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                            />
                            {!isClient() && (
                                <>
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                nick_name: text,
                                            }
                                        }))}
                                        placeholder="Nick Name"
                                        searchValue={filterPayload.otherSearchFilter.nick_name || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                email: text,
                                            }
                                        }))}
                                        placeholder="Email"
                                        searchValue={filterPayload.otherSearchFilter.email || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                mobile: text,
                                            }
                                        }))}
                                        placeholder="Mobile"
                                        searchValue={filterPayload.otherSearchFilter.mobile || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                headline: text,
                                            }
                                        }))}
                                        placeholder="Headline"
                                        searchValue={filterPayload.otherSearchFilter.headline || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                bio: text,
                                            }
                                        }))}
                                        placeholder="Bio"
                                        searchValue={filterPayload.otherSearchFilter.bio || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                functions: text,
                                            }
                                        }))}
                                        placeholder="Functions"
                                        searchValue={filterPayload.otherSearchFilter.functions || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                company: text,
                                            }
                                        }))}
                                        placeholder="Company"
                                        searchValue={filterPayload.otherSearchFilter.company || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                    <SearchBar
                                        showToolTip
                                        showSearchIcon={false}
                                        onSearch={(text) => setFilterPayload((prev) => ({
                                            ...prev,
                                            isFilterChange: true,
                                            otherSearchFilter: {
                                                ...prev.otherSearchFilter,
                                                domain: text,
                                            }
                                        }))}
                                        placeholder="Domain"
                                        searchValue={filterPayload.otherSearchFilter.domain || ""}
                                        maxWidth="110px"
                                        minWidth={"110px"}
                                        p="5px"
                                        m={{ sm: "0 0.75rem 0 0", xs: "0 0.75rem 0 0" }}
                                    />
                                </>
                            )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </Box>
    );
}

export default ExpertNavSearch;
