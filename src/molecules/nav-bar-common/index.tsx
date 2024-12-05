import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { isClient, isExpert } from "../../utils/role";
import { selectedButtonStyle, clearAllFilterStyle, insideWrapperStyle, selectBtnStyles, selectWrapperStyle, selectedStyle, wrapperStyle, mobileNavItemsBoxStyle, filterSelectOuterBoxStyle } from "./style";
import { useBoolean } from "../../utils/hooks/useBoolean";
import SelectAnActionDialog from "./select-an-action";
import { IconButton, SxProps, Theme } from "@mui/material";
import SelectedAction from "./selected-action";
import BoxSpaceBtw, { BoxFlex } from "../../atoms/boxSpaceBtw";

type Props = {
    isSelectClicked?: boolean;
    Actions?: Array<{ title: string, label: React.ReactNode, onClick(): void }>,
    ActionsLength?: number;
    NavbarItems: React.JSX.Element;
    resetFilters(): void;
    isFilterApplied: boolean;
    isNavbarFilterChanged?: boolean;
    totalSelected?: number;
    selectClickHandler?(): void;
    onActionSelect?: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction?: { title: string, label: React.ReactNode, onClick(): void } | null;
    selectActionSubmitBtnName?: string;
    isSelectApplied?: boolean;
    outerBoxStylesx?: SxProps<Theme>;
}

const NavbarCommon = ({
    isSelectClicked = false,
    ActionsLength,
    Actions = [],
    NavbarItems,
    resetFilters,
    isFilterApplied,
    totalSelected,
    selectClickHandler,
    onActionSelect = (s) => { },
    selectedAction,
    selectActionSubmitBtnName = "",
    isSelectApplied = true,
    isNavbarFilterChanged = false,
    outerBoxStylesx = {}
}: Props) => {
    const isMobile = useIsMobile();
    const { value: filterSelect, setTrue: openFilterSelect, setFalse: closeFilterSelect } = useBoolean();
    const { value: isSelectAnActionOpen, setTrue: selectAnActionOpen, setFalse: selectAnActionClosed } = useBoolean();

    useEffect(() => {
        if (ActionsLength !== 1 && isSelectClicked) {
            selectAnActionOpen();
        } else if (ActionsLength !== 1 && !isSelectClicked) {
            onActionSelect(null);
        } else if (ActionsLength === 1 && isSelectClicked) {
            onActionSelect(Actions[0])
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelectClicked, ActionsLength])

    return (
        <>
            <Box sx={{
                ...wrapperStyle(isSelectClicked, isMobile),
                ...outerBoxStylesx
            }}>
                {/* Only in Mobile View, When Filter Btn is clicked */}
                {filterSelect &&
                    <Box sx={filterSelectOuterBoxStyle}>
                        <IconButton
                            onClick={closeFilterSelect}
                            sx={{ padding: "4px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box sx={mobileNavItemsBoxStyle}>
                            {NavbarItems}
                            {!isSelectClicked &&
                                <Button
                                    sx={selectBtnStyles}
                                    onClick={selectClickHandler}
                                >
                                    Select
                                </Button>
                            }
                        </Box>

                    </Box>
                }


                {!filterSelect &&
                    <BoxSpaceBtw>
                        <Box sx={insideWrapperStyle}>
                            {isMobile && !isExpert() ?
                                <IconButton
                                    onClick={openFilterSelect}
                                    sx={{
                                        backgroundColor: isNavbarFilterChanged ? "var(--green-color)" : "initial",
                                        borderRadius: "50%",
                                        padding: "4px"
                                    }}
                                >
                                    <FilterListIcon sx={{
                                        color: isNavbarFilterChanged ? "white" : "initial",

                                    }} />
                                </IconButton>
                                :
                                <>
                                    {NavbarItems}
                                </>
                            }
                        </Box>
                        <Box
                            sx={selectWrapperStyle}
                        >
                            {isFilterApplied && (
                                <Button
                                    sx={clearAllFilterStyle}
                                    onClick={resetFilters}
                                >
                                    Clear All
                                </Button>
                            )}
                            {isSelectApplied &&
                                <>
                                    {!isSelectClicked &&
                                        <Button
                                            sx={selectBtnStyles}
                                            onClick={selectClickHandler}
                                        >
                                            Select
                                        </Button>
                                    }
                                </>
                            }
                        </Box>
                    </BoxSpaceBtw>
                }

                {isSelectClicked &&
                    <BoxSpaceBtw sx={{ mt: "0.2rem"}}>
                        {selectedAction &&
                            <SelectedAction selectedAction={selectedAction} />
                        }
                        <BoxFlex>
                            {isSelectClicked &&
                                <Typography
                                    sx={selectedStyle(isMobile)}
                                >
                                    {totalSelected} Selected
                                </Typography>}
                            {
                                !isClient() &&
                                    isMobile && isSelectClicked ?
                                    <IconButton
                                        onClick={selectClickHandler}
                                        sx={{ padding: "4px" }}
                                    >
                                        <CloseIcon />
                                    </IconButton> :
                                    <Button
                                        sx={selectBtnStyles}
                                        onClick={selectClickHandler}
                                    >
                                        Cancel
                                    </Button>
                            }

                        </BoxFlex>
                    </BoxSpaceBtw>
                }
            </Box>

            {/* Select An Action Dialog */}
            {isSelectAnActionOpen &&
                <SelectAnActionDialog
                    handleClose={() => {
                        selectAnActionClosed()
                        selectClickHandler && selectClickHandler()
                    }}
                    handleSubmitClose={() => {
                        selectAnActionClosed();
                    }}
                    Actions={Actions}
                    isOpen={isSelectAnActionOpen}
                    onActionSelect={onActionSelect}
                    selectActionSubmitBtnName={selectActionSubmitBtnName}
                />
            }
        </>

    )
}

export default NavbarCommon