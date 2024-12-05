import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { dropdownBoxStyle } from "./style";
import { useState } from 'react';
import DropDownDrawerList from './list';
import { toggleDrawer } from './helper';

type Props = {
    chipLabel: string;
    listArr: (string | { label: React.ReactNode, value: string })[];
    onItemSelect: (values: string[]) => void;
    selectedValues: string[];
    isClearDisabled?: boolean;
}

const DropDownDrawerWithChipMultiple = ({ chipLabel, listArr, onItemSelect, selectedValues, isClearDisabled = false }: Props) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const ChipValue = selectedValues.map(value => {
        const item = listArr.find(item => (typeof item === "string" ? item === value : item.value === value));
        return typeof item === "string" ? item : item?.label;
    }).join(", ");

    const isValueNotNull = selectedValues.length > 0;

    return (
        <>
            {/* Chip Label */}
            <Box
                sx={dropdownBoxStyle(isValueNotNull)}
                onClick={toggleDrawer(!isDrawerOpen, setDrawerOpen)}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p>{isValueNotNull ? `${chipLabel} : ${typeof ChipValue === "string" ? ChipValue : ""}` : chipLabel}</p>
                    <div>{typeof ChipValue !== "string" ? ChipValue : ""}</div>
                </div>
                <KeyboardArrowDownIcon sx={{ fontSize: "12px", color: isValueNotNull ? "white" : "initial" }} />
            </Box>

            {/* Dropdown Drawer */}
            <Drawer
                anchor={"bottom"}
                open={isDrawerOpen}
                onClose={toggleDrawer(false, setDrawerOpen)}
                sx={{
                    zIndex: "12000 !important"
                }}
            >
                <DropDownDrawerList
                    listArr={listArr}
                    chipLabel={chipLabel}
                    onClick={() => toggleDrawer(false, setDrawerOpen)}
                    onClose={() => setDrawerOpen(false)}
                    onItemSelect={onItemSelect}
                    selectedValues={selectedValues}
                    isClearDisabled={isClearDisabled}
                />
            </Drawer>
        </>

    )
}

export default DropDownDrawerWithChipMultiple