import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CalenderPicker from "./calenderPicker";
import {
  CustomTabPanel,
  DropDownDrawerListArr,
  a11yProps,
  selectTab,
  tabStyle,
  tabsStyle,
} from "./helper";
import CalenderRangePicker from "./calenderRangePicker";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../dropdown-drawer-with-chip";

type Props = {
  selectDate: any;
  setSelectDate: any;
  isOnClientDetails: boolean;
  allowedTabs?: Array<"between" | "on" | "before" | "after">;
}

export const tabIndexes = (allowedTabs?: Array<"between" | "on" | "before" | "after"> ) => {
  let betweenTabIndex = 0;
  let beforeTabIndex = 1;
  let onTabIndex = 2;
  let afterTabIndex = 3;

  if (allowedTabs) {
    betweenTabIndex = allowedTabs.findIndex(tab => tab === "between");
    beforeTabIndex = allowedTabs.findIndex(tab => tab === "before");
    onTabIndex = allowedTabs.findIndex(tab => tab === "on");
    afterTabIndex = allowedTabs.findIndex(tab => tab === "after");
  }

  return {
    betweenTabIndex,
    beforeTabIndex,
    onTabIndex,
    afterTabIndex
  }
}

export default function CalenderTabs(props: Props) {
  const { selectDate, setSelectDate, isOnClientDetails, allowedTabs = ["between", "on", "before", "after"] } = props;
  const [value, setValue] = React.useState(selectTab(selectDate.select, allowedTabs));
  const isMobile = useIsMobile();
  const {beforeTabIndex, betweenTabIndex, onTabIndex, afterTabIndex} = tabIndexes(allowedTabs);

  const handleChange = (event: React.SyntheticEvent | null, newValue: number) => {
    let select = "";

    switch (newValue) {
      case betweenTabIndex:
        select = "between";
        break;
      case beforeTabIndex:
        select = "before";
        break;
      case onTabIndex:
        select = "on";
        break;
      case afterTabIndex:
        select = "after";
        break;
    }

    if (select) {
      setSelectDate((prev: any) => ({ ...prev, select }));
    }

    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>

      {isMobile ?
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            "& p": {
              fontSize: "14px",
              fontWeight: "500"
            }
          }}
        >
          {!isOnClientDetails && <DropDownDrawerWithChip
            isClearDisabled
            chipLabel={"Calender Type"}
            value={value.toString()}
            listArr={DropDownDrawerListArr}
            onItemSelect={(value: string | null) => {
              if (value) {
                handleChange(null, parseInt(value));
              }
            }}
          />}
        </Box>
        :
        <Box sx={{ borderBottom: !isOnClientDetails ? 1 : 0, borderColor: "divider" }}>
          {!isOnClientDetails && <Tabs
            value={value}
            onChange={handleChange}
            aria-label="calender tab"
            sx={tabsStyle}
          >
            {allowedTabs.map((tabLabel, index) => {
              if (index === 0) {
                return <Tab label={tabLabel} {...a11yProps(0)} sx={tabStyle} />
              } else {
                return <Tab
                  label={tabLabel}
                  {...a11yProps(index)}
                  {...a11yProps(0)}
                  sx={tabStyle}
                />
              }
            })}
          </Tabs>}
        </Box>
      }


      <CustomTabPanel value={value} index={betweenTabIndex}>
        <CalenderRangePicker
          selectDate={selectDate?.date || null}
          setSelectDate={setSelectDate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={beforeTabIndex}>
        <CalenderPicker
          selectDate={selectDate.singleDate}
          setSelectDate={setSelectDate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={onTabIndex}>
        <CalenderPicker
          selectDate={selectDate.singleDate}
          setSelectDate={setSelectDate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={afterTabIndex}>
        <CalenderPicker
          selectDate={selectDate.singleDate}
          setSelectDate={setSelectDate}
        />
      </CustomTabPanel>
    </Box>
  );
}
