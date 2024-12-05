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
    onItemSelect: (value: string | null) => void;
    value: string | null;
    isClearDisabled?: boolean;
}

const DropDownDrawerWithChip = ({ chipLabel, listArr, onItemSelect, value, isClearDisabled = false }: Props) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const value_chip = listArr.find((prev) => {
        if (typeof prev === "string") {
            return prev === value;
        } else {
            return prev.value === value;
        }
    })

    const ChipValue = typeof value_chip === "string" ? value_chip : value_chip?.label;
    const isValueNotNull = typeof value === "string";

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
                    value={value}
                    isClearDisabled={isClearDisabled}
                />
            </Drawer>
        </>

    )
}

export default DropDownDrawerWithChip