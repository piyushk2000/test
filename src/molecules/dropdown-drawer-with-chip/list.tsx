import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BoxCenter from '../../atoms/boxCenter';
import { Button } from '@mui/material';

type Props = {
    listArr: (string | { label: React.ReactNode, value: string })[];
    chipLabel: string;
    onClick: () => void;
    onClose: () => void;
    onItemSelect: (s: string | null) => void;
    value: string | null;
    isClearDisabled: boolean;
}

const DropDownDrawerList = ({ listArr, chipLabel, onClick, onClose, onItemSelect, value, isClearDisabled }: Props) => {

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
                <p className="chip-label">
                    {chipLabel.toLocaleUpperCase()}
                </p>
                {value ?
                    isClearDisabled ? null :
                        <Button
                            onClick={() => {
                                onItemSelect(null)
                                onClose()
                            }}
                            sx={{
                                color: "var(--primary-color)",
                                textTransform: "capitalize",
                                "& .chip-clear-label": {
                                    fontWeight: "600"
                                }
                            }}
                        >
                            <p className="chip-clear-label">
                                Clear

                            </p>
                        </Button>
                    : null
                }

            </BoxCenter>


            <Divider />
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                value={value}
                name="radio-buttons-group"
                onChange={(e, selected_value) => {
                    if (typeof selected_value === "string") {
                        if (selected_value === value) {
                            onItemSelect(null)
                        } else {
                            onItemSelect(selected_value)
                        }
                        onClose()
                    }
                }
                }
            >
                {listArr.map((list) => (
                    (
                        typeof list === "string" ?
                            <FormControlLabel
                                key={list}
                                labelPlacement='start'
                                value={list}
                                control={<Radio sx={{ color: "var(--green-color) !important" }} />}
                                label={list}
                                sx={{
                                    margin: "0",
                                    marginRight: "10px",
                                    "& span": {
                                        fontSize: "12px",
                                        fontWeight: "500"
                                    }
                                }}
                            /> :
                            <FormControlLabel
                                key={list.value}
                                labelPlacement='start'
                                value={list.value}
                                control={<Radio sx={{ color: "var(--green-color) !important" }} />}
                                label={list.label}
                                sx={{
                                    margin: "0",
                                    marginRight: "10px",
                                    "& span": {
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    },
                                    "& p": {
                                        fontSize: "12px",
                                        fontWeight: "500"
                                    }
                                }}
                            />
                    )

                ))}
            </RadioGroup>
        </Box>
    )
}

export default DropDownDrawerList