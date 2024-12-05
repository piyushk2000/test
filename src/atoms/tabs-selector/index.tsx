import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ThemeProvider, styled } from "@mui/material/styles";
import { fontTheme } from "../../common/themes/basic-theme";

interface StyledTabProps {
  label: string;
  value: string;
  onClick: (e: any) => void;
}

const MyTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: 400,
  "&.Mui-selected": {
    fontWeight: 600,
  },
}));

type Props = {
  onChange: (s: string) => void;
  options: string[] | { label: string, value: string }[];
  value: string;
  isDeSelectAllowed?: boolean;
};

export default function TabFilters({ onChange, value, options, isDeSelectAllowed = true }: Props) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  const onClick = (newValue: string) => {
    if (newValue === value && isDeSelectAllowed) {
      onChange("");
    }
  };

  return (
    <ThemeProvider theme={fontTheme}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value || false}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          {options.map((option, index) => {
            if (typeof option === "string") {
              return <MyTab key={option + index} value={option} label={option} onClick={() => { onClick(option) }} />
            } else {
              return <MyTab key={option.value + index} value={option.value} label={option.label} onClick={() => { onClick(option.value) }} />
            }
          })}
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}
