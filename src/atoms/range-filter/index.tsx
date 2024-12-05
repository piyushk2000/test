import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useBoolean } from '../../utils/hooks/useBoolean';
import { BoxFlex } from '../boxSpaceBtw';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton, TextField } from '@mui/material';
import CustomBtnFilled from '../form-molecules/CustomBtnFilled';

function valuetext(value: number) {
    return `${value}`;
}

type Props = {
    min?: number;
    max?: number;
    setInput: (value: number[]) => void;
    input: number[];
    label: string;
}

export default function RangeSlider({
    min = 0,
    max = 1000000,
    setInput,
    input = [0, 1000000],
    label
}: Props) {
    const [value, setValue] = React.useState<number[]>([min, max]);
    const { value: showRange, toggle: toggleRange } = useBoolean();

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = +event.target.value;
        const action = event.target.id;
        setValue((prev) => {
            if (action === "min") {
                return ([value, prev[1]]);
            } else {
                return ([prev[0], value]);
            }
        });
    };

    const handleClick = () => {
        setInput(value);
        toggleRange();
    }

    const resetRange = () => {
        const range = [0,1000000];
        setInput(range);
        setValue(range);
        toggleRange();    
    }

    return (
        <Box sx={{ position: "relative" }}>
            <BoxFlex sx={{ gap: "0.5rem" }}>
                <p style={{ color: "#252B3B", fontWeight: "400", fontSize: "0.75rem" }}>{label}</p>
                <Box
                    sx={{ backgroundColor: "white", borderRadius: "5px", padding: "0 1rem", width: "fit-content", cursor: "pointer" }}
                    onClick={() => {
                        toggleRange();
                    }}
                >
                    <p style={{ color: "#252B3B", fontWeight: "400", fontSize: "0.75rem", height: "21px", display: "flex", alignItems: "center", justifyContent: "center" }}>{input[0]} - {input[1]}</p>
                </Box>
            </BoxFlex>

            {/* Overlay */}
            <Box onClick={() => {
                toggleRange();
            }} sx={{ display: showRange ? "initial" : "none", position: "fixed", top: "0", bottom: "0", left: "0", right: "0", backgroundColor: "rgba(0,0,0,0.5)", zIndex: "999" }}>

            </Box>

            <Box sx={{ left: "0", right: '0', position: "absolute", display: showRange ? "initial" : "none", zIndex: "1000", backgroundColor: "#F5F4F4", padding: '0.25rem 0.5rem', borderRadius: "10px" }}>
                <BoxFlex sx={{justifyContent: "space-between"}}>
                    <p style={{ fontSize: "14px", fontWeight: "500" }}>Min</p>
                    <p style={{ fontSize: "14px", fontWeight: "500" }}>Max</p>
                </BoxFlex>
                <BoxFlex sx={{px:"0.5rem"}}>
                    <Slider
                        getAriaLabel={() => 'Range'}
                        value={value}
                        onChange={handleChange}
                        max={max}
                        step={1000}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </BoxFlex>
                <BoxFlex sx={{ gap: '1rem', py: "0.5rem", flexDirection: "column" }}>
                    <TextField type='number' id="min" onChange={handleChangeTextField} value={value[0]} label="Min" variant="outlined" />
                    <TextField type='number' id="max" onChange={handleChangeTextField} value={value[1]} label="Max" variant="outlined" />
                </BoxFlex>
                <BoxFlex sx={{ justifyContent: "space-between" }}>
                <CustomBtnFilled
                        variant='outlined'
                        onClick={resetRange}
                        label="Reset"
                    />
                    <CustomBtnFilled
                        variant='contained'
                        onClick={handleClick}
                        label="Apply"
                    />
                </BoxFlex>
            </Box>

        </Box>
    );
}
