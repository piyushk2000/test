import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const exportTypes = [
  { label: "Expert", value: "Expert" },
  { label: "Referral Admin", value: "Referral Admin" },
  { label: "Expert | Referral Admin", value: "Expert | Referral Admin" },
];

export default function ExpertTypes(props: any) {
  const [expert, setExpert] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value;
    setExpert(type);
    props.setTypeFilter(type);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ mx: 1, minWidth: 40 }}>
        <Select
          labelId="expert-types"
          id="demo-simple-select-standard"
          value={expert}
          onChange={handleChange}
          label="Expert"
          disableUnderline
          placeholder="Select Expert"
          sx={{ fontSize: "0.75rem", mt: 0, pt: "1px" }}
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          {exportTypes.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
