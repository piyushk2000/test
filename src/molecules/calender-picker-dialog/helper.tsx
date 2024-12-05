import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { enqueueSnackbar } from "notistack";
import { tabIndexes } from "./calenderTabs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type ValuePiece = Dayjs | null;

export type dateTypes = ValuePiece | [ValuePiece, ValuePiece];

export type selectDateTypes = {
  select: "between" | "before" | "on" | "after";
};

export type calenderPropsTypes = {
  selectDate: Dayjs;
  setSelectDate?: any;
  getDate?: (date: Dayjs) => void;
  dateLabel?: string;
};



export type calenderRangePropsTypes = {
  selectDate: [Dayjs, Dayjs];
  setSelectDate: any;
};

export const dateFieldStyle = {
  width: "276px",

  "& input": {
    padding: "10px",
    fontSize: "0.9rem",
    fontWeight: "400",
  },
};

export const calenderStyle = {
  "& .Mui-selected": {
    backgroundColor: "var(--primary-color) !important",
    color: "white !important",
    fontFamily: "inherit",
  },

  "& .MuiPickersFadeTransitionGroup-root": {
    fontSize: "0.75rem",
    fontFamily: "inherit",
  },

  "& .MuiDateCalendar-viewTransitionContainer": {
    maxHeight: "260px",
    height: "100%",
    overflow: "hidden",
    "& button": {
      fontSize: "0.75rem",
      fontFamily: "inherit",
    },
  },
};

// Function returns true if the start_date is bigger than end_date
export const startEndCompare = (
  start: any,
  end: any,
  warningMessage: string
) => {
  if (dayjs(start) > dayjs(end)) {
    enqueueSnackbar(warningMessage, {
      variant: "warning",
    });
    return true;
  }

  return false;
};

export const selectTab = (select: string, allowedTabs?: Array<"between" | "on" | "before" | "after">) => {
  
  const {betweenTabIndex, beforeTabIndex, onTabIndex, afterTabIndex} = tabIndexes(allowedTabs);

  switch (select) {
    case "between":
      return betweenTabIndex;
    case "before":
      return beforeTabIndex;
    case "on":
      return onTabIndex;
    case "after":
      return afterTabIndex;
    default:
      return betweenTabIndex;
  }
};

export const dialogTitleStyle = {
  "& .MuiRadio-root": {
    color: "var(--primary-color) !important",
  },
  "& .MuiFormControlLabel-label": { fontSize: "0.75rem !important" },
};

export const tabsStyle = {
  "& .Mui-selected": {
    color: "var(--primary-color) !important",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "var(--primary-color) !important",
  },
};

export const tabStyle = {
  textTransform: "capitalize",
  fontFamily: "inherit",
};


export const DropDownDrawerListArr = [
  {
    label: <p>Between</p>, value: "0"
  },
  {
    label: <p>Before</p>, value: "1"
  },
  {
    label: <p>On</p>, value: "2"
  },
  { label: <p>After</p>, value: "3" }
]