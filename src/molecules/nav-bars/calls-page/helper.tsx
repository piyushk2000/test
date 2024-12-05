import { SetCalender, setFilterPayload } from "../../../pages/Calls/types";

export const clientSortBy = [
  {
    label: <p>Call Start Time (Most Recent First)</p>,
    value: "desc___call_start_time",
  },
  {
    label: <p>Call Start Time (Oldest First)</p>,
    value: "asc___call_start_time",
  }
]

export const expertSortBy = [
  { label: <p>Recently Updated</p>, value: "desc___updated_at" },
  {
    label: <p>Status ( A &rarr; Z )</p>,
    value: "asc___status",
  },
  {
    label: <p>Status ( Z &rarr; A )</p>,
    value: "desc___status",
  },
  ...clientSortBy
]

export const SortBy = [
  {
    label: <p>ID ( &uarr; )</p>,
    value: "asc___id",
  },
  {
    label: <p>ID ( &darr; )</p>,
    value: "desc___id",
  },
  {
    label: <p>Expert Rating ( &uarr; )</p>,
    value: "asc___expert_rating",
  },
  {
    label: <p>Expert Rating ( &darr; )</p>,
    value: "desc___expert_rating",
  },
  {
    label: <p>Revenue in INR ( &uarr; )</p>,
    value: "asc___revenue_in_inr",
  },
  {
    label: <p>Revenue in INR ( &darr; )</p>,
    value: "desc___revenue_in_inr",
  },
  {
    label: <p>Revenue in USD ( &uarr; )</p>,
    value: "asc___revenue_in_usd",
  },
  {
    label: <p>Revenue in USD ( &darr; )</p>,
    value: "desc___revenue_in_usd",
  },
  ...expertSortBy,
  { label: <p>Added On ( New &rarr; Old )</p>, value: "desc___created_at" },
  { label: <p>Added On ( Old &rarr; New )</p>, value: "asc___created_at" },
  { label: <p>Updated On ( New &rarr; Old )</p>, value: "desc___updated_at" },

  { label: <p>Updated On ( Old &rarr; New )</p>, value: "asc___updated_at" },
];

export const expertType = [
  {
    label: <p>Both</p>,
    value: "",
  },
  {
    label: <p>CE</p>,
    value: "&expert_type=CE",
  },
  {
    label: <p>PE</p>,
    value: "&expert_type=PE",
  },
];

export const CallStatusType = [
  {
    label: <p>All</p>,
    value: "",
  },
  {
    label: <p>Completed</p>,
    value: "&in___status=Completed",
  },
  {
    label: <p>Confirmed</p>,
    value: "&in___status=Confirmed",
  },
  {
    label: <p>Payment Requested</p>,
    value: "&in___status=Payment Requested"
  },
  {
    label: <p>Paid</p>,
    value: "&in___status=Paid"
  }
];

export const callMediumArr = [
  {
    label: "All",
    value: ""
  }
  , { label: "Internal - Automated", value: "&equalto___call_medium=Internal - Automated" },
  { label: "Internal - Manual", value: "&equalto___call_medium=Internal - Manual" },
  { label: "Client - Automated", value: "&equalto___call_medium=Client - Automated" },
  { label: "Client - Manual", value: "&equalto___call_medium=Client - Manual" },
  { label: "Others", value: "&equalto___call_medium=Others" },];

export const allCallsNavbarContainer = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  paddingBottom: "4px",

  "& .sort": {
    fontSize: "12px",
  },

  "& hr": {
    border: "1px solid #bdb7b7",
    width: "16px",
    rotate: "90deg",
  },
};

export const dataRangeFilter = (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
  setFilterPayload?: setFilterPayload,
  returnDateUrl?: boolean
) => {
  let dateUrl: string = "";
  const greaterThan = `greaterthanequalto___${calenderType}`;
  const lessThan = `lessthanequalto___${calenderType}`;

  if (select === "between") {
    const fromDate = date + "T00:00:00";
    const toDate = tDate + "T23:59:59";

    dateUrl += `&${greaterThan}=${fromDate}&${lessThan}=${toDate}`;
  } else if (select === "before") {
    const beforeDate = date + "T23:59:59";

    dateUrl += `&${lessThan}=${beforeDate}`;
  } else if (select === "on") {
    const fromDate = date + "T00:00:00";
    const toDate = date + "T23:59:59";

    dateUrl += `&${greaterThan}=${fromDate}&${lessThan}=${toDate}`;
  } else if (select === "after") {
    const afterDate = date + "T00:00:00";

    dateUrl += `&${greaterThan}=${afterDate}`;
  }

  if (dateUrl && setFilterPayload) {
    setFilterPayload((prev) => ({
      ...prev,
      calender: dateUrl,
    }));
  }

  if(returnDateUrl) {
    return dateUrl;
  }
};


export const calenderCloseBtn = (setCalender: SetCalender, setFilterPayload: setFilterPayload) => {
  setCalender((prev: any) => ({
    open: false,
    value: "",
    date: null,
    tDate: null,
    select: null
  }));
  setFilterPayload((prev) => ({
    ...prev,
    calender: null
  }));
}