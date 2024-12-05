import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BoxCenter from '../../atoms/boxCenter';
import { Button } from '@mui/material';
import { BoxFlex } from '../../atoms/boxSpaceBtw';

type Props = {
    listArr: (string | { label: React.ReactNode, value: string })[];
    chipLabel: string;
    onClick: () => void;
    onClose: () => void;
    onItemSelect: (selected: string[]) => void;
    selectedValues: string[];
    isClearDisabled: boolean;
}

const DropDownDrawerList = ({ listArr, chipLabel, onClick, onClose, onItemSelect, selectedValues, isClearDisabled = false }: Props) => {
    const handleChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onItemSelect(newSelectedValues);
    };

    return (
        <Box
            role="presentation"
            onClick={onClick}
            onKeyDown={onClick}
            sx={{
                "& .chip-label": {
                    padding: "0.5rem",
                    fontSize: "14px"
                },
            }}
        >
            <BoxCenter sx={{ justifyContent: "space-between", margin: "0 0.5rem" }}>
                <BoxFlex>
                    <p className="chip-label">
                        {chipLabel.toLocaleUpperCase()}
                    </p>
                    {selectedValues.length > 0 && !isClearDisabled && (
                        <Button
                            onClick={() => {
                                onItemSelect([]);
                                onClose();
                            }}
                            sx={{
                                color: "var(--primary-color)",
                                textTransform: "capitalize",
                                "& .chip-clear-label": {
                                    fontWeight: "600"
                                }
                            }}
                        >
                            <p className="chip-clear-label">Clear</p>
                        </Button>
                    )}
                </BoxFlex>
                <BoxFlex>
                    <Button
                        onClick={() => {
                            onClose();
                        }}
                        sx={{
                            color: "var(--primary-color)",
                            textTransform: "capitalize",
                            "& .chip-clear-label": {
                                fontWeight: "600"
                            }
                        }}
                    >
                        <p className="chip-clear-label">X</p>
                    </Button>
                </BoxFlex>

            </BoxCenter>

            <Divider />
            <FormGroup>
                {listArr.map((list) => {
                    const value = typeof list === "string" ? list : list.value;
                    const label = typeof list === "string" ? list : list.label;
                    return (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(value)}
                                    onChange={() => handleChange(value)}
                                    sx={{ color: "var(--green-color) !important" }}
                                />
                            }
                            label={label}
                            sx={{
                                margin: "0",
                                marginRight: "10px",
                                "& span": {
                                    fontSize: "12px",
                                    fontWeight: "500"
                                },
                                "& p": {
                                    fontSize: "12px",
                                    fontWeight: "500"
                                }
                            }}
                        />
                    );
                })}
            </FormGroup>
        </Box>
    );
};

export default DropDownDrawerList;