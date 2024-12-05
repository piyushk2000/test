import Checkbox from "@mui/material/Checkbox";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { LocalDayjs } from "../../utils/timezoneService";
import { getUserId, isAdmin, isSuperAdmin } from "../../utils/role";
import { useFetch } from "../../utils/hooks/useFetch";
import { Groups } from "../admin/types";

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

export type apiDataType = {
  domains: object[] | null;
  expert_geo: object[] | null;
  client_geo: object[] | null;
  users: object[] | null;
};

export type domainTypes = {
  id: number;
  name: string;
  parent_id: number | null;
  level: string;
  created_at: string;
  updated_at: string;
};

export type geoTypes = {
  id: number;
  name: string;
  parent_id: number;
  created_at: null;
  updated_at: null;
};

type labelValueType = {
  label: string;
  value: number;
};

type labelType = { label: string; value: string }[];

export const getApiData = async (setApiData: any) => {
  try {
    const data: apiDataType = {
      domains: null,
      expert_geo: null,
      client_geo: null,
      users: null,
    };
    const domainResponse = await RequestServer(APIRoutes.domains, "get");

    // Domain API
    if (domainResponse.success) {
      const domainOptions: object[] = domainResponse.data
        .map((domain: domainTypes) => ({
          value: domain.id,
          label: `${domain.level} - ${domain.name}`,
          level: domain.level,
        }))
        .sort((a: labelValueType, b: labelValueType) =>
          a.label.localeCompare(b.label)
        );
      data.domains = domainOptions;
    }

    // Expert geo API
    const geoResponse = await RequestServer(APIRoutes.geographies, "get");
    if (geoResponse.success) {
      const geoOptions: object[] = geoResponse.data
        .map((geo: geoTypes) => ({
          value: geo.id,
          label: geo.name,
        }))
        .sort((a: labelValueType, b: labelValueType) => {
          return a.label.localeCompare(b.label);
        });
      data.expert_geo = geoOptions;
    }

    // client geo API
    const geoOptions: object[] = geoResponse.data
      .filter((geo: any) => geo.type === "Country")
      .map((geo: any) => ({
        value: geo.id,
        label: geo.name,
      }))
      .sort((a: any, b: any) => {
        return a.label.localeCompare(b.label);
      });
    data.client_geo = geoOptions;


    // Users API
    if (isSuperAdmin() || isAdmin()) {
      const userResponse = await RequestServer(
        `${APIRoutes.users}?role=SUPERADMIN,ADMIN`,
        "get"
      );
      if (userResponse.success) {
        const userOptions: object[] = userResponse.data.map((user: any) => ({
          value: user.id,
          label: user.name[0].toUpperCase() + user.name.slice(1),
        }));
        data.users = userOptions;
      }
    }

    setApiData(data);
  } catch (err) {
    console.log(err);
  }
};
export const allowQc = () =>{
  const { data: groupData } = useFetch<Groups>(APIRoutes.getGroup + '&label=DQ & DA');
  const DqGroupIds = groupData?.find(e => e.label === 'DQ & DA')?.sublabel?.split(',') || [];
  return (DqGroupIds?.includes(getUserId()?.toString() ?? '') || isSuperAdmin())
}

export const CheckboxOptions = (props: any, option: any, { selected }: any) => (
  <li {...props} key={option.value}>
    <Checkbox
      icon={Icon}
      checkedIcon={CheckedIcon}
      style={{ marginRight: "8px" }}
      checked={selected}
    />
    {option?.label}
  </li>
);

export const internalRatingOptions: labelType = [
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
  { label: "5", value: "5" },
  { label: "Unrated", value: "Unrated" },
];

export const categoryOptions: labelType = [
  { label: "Ace", value: "Ace" },
  { label: "Champion", value: "Champion" },
  { label: "Pro", value: "Pro" },
];

export const andOrOptions: labelType = [
  { label: "AND", value: "AND" },
  { label: "OR", value: "OR" },
];

export const period1: labelType = [
  { label: "3+ months ago", value: "3" },
  { label: "6+ months ago", value: "6" },
  { label: "1+ Year ago", value: "12" },
  { label: "2+ Years ago", value: "24" },
];

export const period2: labelType = [
  { label: "Within 3 Years", value: "3" },
  { label: "Within 5 Years", value: "5" },
  { label: "Within 10 Years", value: "10" },
];

export const period3: labelType = [
  { label: "Within 3 months", value: "3" },
  { label: "Within 6 months", value: "6" },
  { label: "Within 1 Year", value: "12" },
  { label: "Within 2 Years", value: "24" },
  { label: "Within 5 Years", value: "60" },
  { label: "Within 10 Years", value: "120" },
];

export const formDefaultValues = (added_by_me: string | null) => {
  let added_by: any[] = [];

  if(added_by_me) {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    added_by = [{ label: name, value: id }];
  }

  return {
  functions: null,
  domains: [],
  other_domains: null,
  expertise_geo: null,
  base_location: [],
  referred_by: null,
  approved_by: [],
  updated_by: [],
  added_by,
  premium_expert: false,
  private_profile: false,
  dnd: false,
  self_registered: false,
  internal_rating: null,
  client_rating: null,
  cost_min: null,
  cost_max: null,
  current_company: [],
  and_or_company: "AND",
  exclude_company: [],
  exclude_period_3: null,
  past_company: [],
  past_more_than: null,
  past_less_than: null,
  no_of_calls: null,
}}

export const getExpertFilterPayload = (formData: any) => {
  const payload: any = {};
  const {
    referred_by,
    approved_by,
    updated_by,
    domains,
    expertise_geo,
    base_location,
    premium_expert,
    internal_rating,
    current_company,
    client_rating,
    past_company,
    past_less_than,
    past_more_than,
    exclude_company,
    and_or_company,
    no_of_calls,
    added_by,
    other_domains,
    functions,
    self_registered,
    private_profile,
    dnd,
    exclude_period_3,
    qc_notes
  } = formData;

  // referred by
  if (referred_by) {
    payload.referred_by = referred_by.value.toString();
  }

  if (no_of_calls) {
    payload.greaterthanequalto___call_count = no_of_calls
  }

  // approved by
  if (approved_by && approved_by.length > 0) {
    payload.approved_by = approved_by.map((b: any) => b.value).join(",");
  }
    // updated by
  if (updated_by && updated_by.length > 0) {
    payload.updated_by = updated_by.map((b: any) => b.value).join(",");
  }
    // Added by
  if (added_by && added_by.length > 0) {
    payload.in___fk_creator = added_by.map((b: any) => b.value).join(",");
  }



  // domains
  if (domains.length !== 0) {
    const l0: string[] = [];
    const l1: string[] = [];
    const l2: string[] = [];
    const l3: string[] = [];

    domains.forEach((d: any) => {
      const { level, value }: { level: string; value: number } = d;
      const valueS: string = value.toString();

      if (level === "L0") {
        l0.push(valueS);
      } else if (level === "L1") {
        l1.push(valueS);
      } else if (level === "L2") {
        l2.push(valueS);
      } else if (level === "L3") {
        l3.push(valueS);
      }
    });

    if (l0.length > 0) {
      payload.in___domain_l0 = l0.join(",");
    }

    if (l1.length > 0) {
      payload.in___domain_l1 = l1.join(",");
    }

    if (l2.length > 0) {
      payload.in___domain_l2 = l2.join(",");
    }

    if (l3.length > 0) {
      payload.in___domain_l3 = l3.join(",");
    }
  }

  //Other Domains
  if (other_domains) {
    payload.like___domain_other = other_domains;
  }

  // function
  if (functions) {
    payload.like___functions = functions;
  }

  // expertise_in_these_geographies
  if (expertise_geo) {
    payload.expertise_in_these_geographies = expertise_geo.value.toString();
  }

  // base_location
  if (base_location.length > 0) {
    payload.base_location = base_location.map((b: any) => b.value).join(",");
  }
  // premium_expert
  if (premium_expert) {
    payload.premium_expert = premium_expert;
  }

  // internal_rating
  if (internal_rating && internal_rating !== "Unrated") {
    payload.greaterthanequalto___internal_rating = internal_rating;
  }

  // internal_rating_unrated
  if (internal_rating === "Unrated") {
    payload.null___internal_rating = "1";
  }

  // client_rating
  if (client_rating && client_rating !== "Unrated") {
    payload.greaterthanequalto___external_rating = client_rating;
  }

  // client_rating unrated
  if (client_rating === "Unrated") {
    payload.null___external_rating = "1";
  }



  // self registered
  if (self_registered) {
    payload.is_self_registered = self_registered;
  }

  // private_profile
  if (private_profile) {
    payload.private_profile = private_profile;
  }

  // DND
  if (dnd) {
    payload.dnd_enabled = dnd;
  }
  if (qc_notes) {
    payload.null___qc_notes="1";
  }

  /* COMPANY FILTERS __________________________*/

  // Current Company
  if (current_company.length > 0) {
    payload.current_company = current_company
      .map((c: labelValueType) => c.value)
      .join(",");

    // AND / OR
    if (and_or_company) {
      payload.company_filter_mode = and_or_company;
    }
  }

  // Past Company
  if (past_company.length > 0) {
    payload.past_company = past_company
      .map((c: labelValueType) => c.value)
      .join(",");
  }

  // Past Company More Than
  if (past_more_than?.value) {
    const month = past_more_than?.value;
    const date = LocalDayjs().subtract(parseInt(month), "month").date(1);
    payload.past_company_ago_date = date.format("YYYY-MM-DD");
  }

  // Past Company Less Than
  if (past_less_than?.value) {
    const year = past_less_than?.value;
    const date = LocalDayjs().subtract(parseInt(year), "year").date(1);
    payload.past_company_within_date = date.format("YYYY-MM-DD");
  }

  // Exclude
  if (exclude_company.length > 0) {
    payload.exclude_company = exclude_company
      .map((c: labelValueType) => c.value)
      .join(",");

    // Exclude within
    if (exclude_period_3) {
      const current_date = LocalDayjs();
      const exclude_date = current_date.subtract(parseInt(exclude_period_3.value), "months").format("YYYY-MM-DD");
      payload.exclude_company_within = exclude_date;
    }
  }


  /*_____________________________________________ */

  if (Object.keys(payload).length === 0) {
    return null;
  }

  return payload;
};

export type companyFieldsOptions = {
  current: labelValueType[];
  past: labelValueType[];
  exclude: labelValueType[];
};
