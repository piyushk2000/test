import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { sortbyStyle } from "../../molecules/project-header/style";
import { useNavigate } from "react-router-dom";
import { SxProps, Theme } from "@mui/material";

type props = {
  setFilterPayload: (filter: string) => void;
  link?: string | null;
  filterValue: string;
  dropDownItems: { label: React.ReactNode; value: string }[];
  noMinWidth?: boolean;
  selectSx?: SxProps<Theme>;
};

export default function DropDownFilter({
  link,
  setFilterPayload,
  filterValue,
  dropDownItems,
  noMinWidth = false,
  selectSx = {}
}: props) {
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value;
    setFilterPayload(type);
    if (link) {
      navigate(link);
    }
  };

  return (
    <FormControl variant="standard" sx={{
      mx: 1, minWidth: noMinWidth ? 0 : 70
    }}>
      <Select
        labelId="expert-types"
        id="demo-simple-select-standard"
        value={filterValue}
        onChange={handleChange}
        label="Expert"
        disableUnderline
        placeholder="Select Expert"
        sx={{
          ...sortbyStyle,
          color: "rgba(37, 43, 59, 0.73)",
          fontFamily: "inherit",
          fontWeight: "400",
          padding: "4px 0",
          paddingTop: "6px",
          ...selectSx
        }}
        displayEmpty
      >
        {dropDownItems.map(
          (item: { label: React.ReactNode; value: string }) => (
            <MenuItem
              sx={{
                ...sortbyStyle,
              }}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}
