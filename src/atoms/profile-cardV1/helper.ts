import { LocalDayjs } from "../../utils/timezoneService";

export const ComplianceData = [
  {
    Name: "Compliance one",
    Date: "27/05/2023",
    Generated_By: "Rakesh Verma",
  },
  {
    Name: "Compliance two",
    Date: "27/05/2023",
    Generated_By: "Rakesh Verma",
  },
  {
    Name: "Compliance three",
    Date: "27/05/2023",
    Generated_By: "Rakesh Verma",
  },
  {
    Name: "Compliance four",
    Date: "27/05/2023",
    Generated_By: "Rakesh Verma",
  },
  {
    Name: "Compliance five",
    Date: "27/05/2023",
    Generated_By: "Rakesh Verma",
  },
];

export const generateComplainceBtnStyle = {
  backgroundColor: "#A9A9A9",
  color: "white",
  borderRadius: "15px",
  padding: "5px 15px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

export const copyUrlStyles = {
  textTransform: "capitalize",
  padding: "0 15px 0 10px",
  color: "#252B3B",
  fontSize: "12px",
  borderRadius: "20px",
  backgroundColor: "rgba(236, 147, 36, 0.14)",
  "&:hover": {
    backgroundColor: "rgba(236, 147, 36, 0.30)",
  },
};

export const selectedContainerStyle = {
  color: "#CECECE",
  padding: 0,

  ".MuiSvgIcon-root ": {
    width: "1.75rem",
    height: "1.75rem",
  },
  "&.Mui-checked ": {
    color: "rgb(236, 147, 36)",
  },
};

type user_values = {id: number, name: string, role: string} | null

export const updatedByTooltip = (
  status: any,
  updated_by_value: user_values,
  fk_creator_value: user_values,
  approved_by_value: user_values
) => {

  const created_by_name = fk_creator_value?.name || "";
  const approved_by_name = approved_by_value?.name || "";

  if (status === "Confirmed" ) {
    return [`Approved by - ${approved_by_name}`, approved_by_name];
  }

  const updated_by_value_name = updated_by_value?.name || "";

  if (updated_by_value_name) {
    return [`Updated by - ${updated_by_value_name}`, updated_by_value_name];
  }

  return [`Created by - ${created_by_name}`, created_by_name];
};

export const getTotalYearOfExperience = (work_experience: any) => {
  const start_date: string | null = work_experience
    .map((w: any) => w.start_date)
    .sort()[0];

  if (start_date) {
    const start_date_value = LocalDayjs(start_date);
    const curr_date = LocalDayjs();
    const diffInMonths = curr_date.diff(start_date_value, "month");
    const years = Math.floor(diffInMonths / 12);
    const yearStr = years > 1 ? "years" : "year";
    if (years !== 0) {
      return `${years} ${yearStr}`;
    }
  }

  return "-";
};
export const getWebHandle =(portal: string, meta: { webhandles: any[] })=>{

  if (meta?.webhandles && Array.isArray(meta.webhandles) && meta.webhandles.length > 0) {
    const existingIndex = meta.webhandles.findIndex((handle: any) => handle.portal === portal);
    if (existingIndex !== -1) {
      return meta.webhandles[existingIndex]?.link;
    } else {
      return null;
    }
  } else {
    return null;
  }
};


export const confirmedOrUpdateTooltip = (
  status: string,
  confirmed_on: string,
  updated_at: string
) => {
  if (status === "Confirmed" && confirmed_on) {
    return [
      `Approved on - ${
        confirmed_on && LocalDayjs(confirmed_on).format("DD MMMM YYYY")
      }`,
      confirmed_on && LocalDayjs(confirmed_on).format("DD MMMM YYYY"),
    ];
  }

  return [
    `Updated at- ${
      updated_at && LocalDayjs(updated_at).format("DD MMMM YYYY")
    }`,
    updated_at && LocalDayjs(updated_at).format("DD MMMM YYYY"),
  ];
};

export function contactedMedium(
  medium: any,
  meta?: any,
  primary_email?: any,
  primary_mobile?: any
) {
  if (medium === "LinkedIn") {
    return meta?.webHandles?.find((p: any) => p.portal === "LinkedIn")?.link;
  } else if (medium === "Mobile") {
    return primary_mobile;
  } else if (medium === "Email") {
    return primary_email;
  } else if (medium === "Any_Other") {
    return meta?.webHandles?.find((p: any) => p.portal === "Any_Other")?.link;
  }
}

export function medium(medium: any) {
  if (medium === "Mobile") {
    return "Phone Number";
  } else if (medium === "Any_Other") {
    return "Other";
  } else {
    return medium;
  }
}

/**          name &&
          bio &&
          primary_mobile &&
          primary_email &&
          domain_l0 &&
          domain_l1 &&
          domain_l2 &&
          meta?.relevant_company && */

export function showGenerateCompliance(
name: any, bio: any, primary_mobile: any, primary_email: any, domain_l0: any, domain_l1: any, domain_l2: any, relevant_company: any, functions: any, headline: any, price_per_hour: any, price_per_hour_currency: any): [string, boolean] {
  if (
    bio &&
    name &&
    primary_email &&
    primary_mobile &&
    relevant_company &&
    domain_l0 &&
    domain_l1 &&
    domain_l2 &&
    functions &&
    headline &&
    price_per_hour &&
    price_per_hour_currency
  ) {
    return ["success", true];
  } else {
    const str = `
    First, Kindly provide the following information for the expert: 

      ${name ? "" : "• name  "} 
      ${primary_email ? "" : "• primary email  "} 
      ${primary_mobile ? "" : "• primary mobile  "}
      ${relevant_company ? "" : "• relevant company  "}
      ${domain_l0 ? "" : "• L0 domain  "}
      ${domain_l1 ? "" : "• L1 domain  "}
      ${domain_l2 ? "" : "• L2 domain  "}
      ${functions ? "" : "• functions  "}
      ${bio ? "" : "• bio  "}
      ${headline ? "" : "• headline  "}
      ${price_per_hour ? "" : "• cost price  "}
      ${price_per_hour_currency ? "" : "• currency  "} 
    `;

    return [str, false];
  }
}
