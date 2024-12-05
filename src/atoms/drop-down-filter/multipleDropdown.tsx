import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type Props = {
    setFilterPayload: (filter: string[]) => void;
    link?: string | null;
    filterValue: string[];
    dropDownItems: string[];
};

export default function MultipleDropDown({ link, filterValue, dropDownItems, setFilterPayload }: Props) {
    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent<typeof filterValue>) => {
        const value = event.target.value;
        const valueArr = typeof value === 'string' ? value.split(', ') : value;

        const newValueArr = valueArr.filter((value) => value !== "All");

        setFilterPayload(
            // On autofill we get a stringified value.
            newValueArr
        );
        link && navigate(link);
    };

    return (
        <Box
            sx={{
                "& .MuiInputBase-root": {
                    minWidth: "50px",
                    height: "22px",
                    width: "100%",
                },
                "& .MuiSelect-select": {
                    backgroundColor: "#F5F4F4 !important",
                    fontSize: "0.75rem",
                    padding: "0",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    borderRadius: "8px"
                }
            }}
        >
            <FormControl sx={{ m: 1 }}>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    multiple
                    autoWidth
                    value={filterValue.length ? filterValue : ["All"]}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        return selected.length !== dropDownItems.length ? selected.join(', ') : "All"
                    }}
                    MenuProps={MenuProps}
                >
                    {dropDownItems.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filterValue.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box >
    );
}
