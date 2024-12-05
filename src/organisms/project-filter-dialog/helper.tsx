import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";
import { domainTypes } from "../expert-filter-dialog/helper";

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

type objectTypes = {
  label: string;
  value: number;
};

export type projectAdvanceFilterTypes = {
  research_analyst: objectTypes | null;
  account_manager: objectTypes[];
  client_name: objectTypes | null;
  client_office: objectTypes[];
  expert_geo: objectTypes | null;
  client_geo: objectTypes | null;
  status: objectTypes | null;
  type: objectTypes | null;
  group: objectTypes | null;
  case_code: objectTypes | null;
  no_of_calls: string | null;
  domains: (objectTypes & { level: string })[];
  other_domains: objectTypes[];
  functions: objectTypes[];
  target_companies: objectTypes[]
};

export const projectAdvanceFilterDefault = (client_id: string | null, client_name: string | null, defaultValues: projectAdvanceFilterTypes | null): projectAdvanceFilterTypes => {

  const client_name_value = (client_name && client_id) ? {
    label: client_name,
    value: parseInt(client_id)
  } : null

  console.log(defaultValues);

  return defaultValues ? {
    ...defaultValues,
    client_name: client_name_value
  } : {
    research_analyst: null,
    account_manager: [],
    client_name: client_name_value,
    client_office: [],
    expert_geo: null,
    client_geo: null,
    status: null,
    type: null,
    group: null,
    case_code: null,
    no_of_calls: null,
    domains: [],
    other_domains: [],
    functions: [],
    target_companies: []
  }
};

export const status = [
  {
    label: "Open",
    value: "Open",
  },
  {
    label: "Closed",
    value: "Closed",
  },
];
export const type = [
  {
    label: "Project",
    value: "Project",
  },
  {
    label: "Workstream",
    value: "Workstream",
  },
  {
    label: "Workstream - Automated",
    value: "Workstream - Automated",
  },
];

export const status2 = [
  {
    label: "All",
    value: ""
  },
  {
    label: "Open",
    value: "Open",
  },
  {
    label: "Closed",
    value: "Closed",
  },
];


type labelValueType = {
  label: string;
  value: number;
};

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

export const getApiData = async (setApiData: any) => {
  const apiData: any = {};
  try {
    const url = APIRoutes.adminUsers;

    const adminUserResponse = await RequestServer(url, "get");

    if (adminUserResponse.success) {
      const userOptions: object[] = adminUserResponse.data.map((user: any) => ({
        value: user.id,
        label: user.name[0].toUpperCase() + user.name.slice(1),
      }));
      apiData.users = userOptions;
    }

    // Client Name
    const clientNameResponse = await RequestServer(APIRoutes.clients, "get");

    if (clientNameResponse.success) {
      const clientOptions: object[] = clientNameResponse.data.map(
        (client: any) => ({
          value: client.id,
          label: client.name,
        })
      );
      apiData.client = clientOptions;
    }

    //   Client Office
    const clientOfficeResponse = await RequestServer(
      APIRoutes.clientOfficeUrl,
      "get"
    );

    if (clientOfficeResponse.success) {
      const clientOfficeOptions: object[] = clientOfficeResponse.data.map(
        (office: any) => {
          const client = clientNameResponse.data.find((client: any) => client.id === office.client_id);
          const clientName = client?.name ? `(${client?.name})` : "";
          return {
            value: office.id,
            label: `${office.name}, ${office.entityName} ${clientName}`,
          }
        }
      );
      apiData.clientOffice = clientOfficeOptions;
    }

    // Expert Geographies API
    const geoResponse = await RequestServer(APIRoutes.geographies, "get");
    if (geoResponse.success) {
      const geoOptions: object[] = geoResponse.data
        .map((geo: any) => ({
          value: geo.id,
          label: geo.name,
        }))
        .sort((a: any, b: any) => {
          return a.label.localeCompare(b.label);
        });
      apiData.expert_geo = geoOptions;
    }

    // Client Geographies API
    const geoOptions: object[] = geoResponse.data
      .filter((geo: any) => geo.type === "Country")
      .map((geo: any) => ({
        value: geo.id,
        label: geo.name,
      }))
      .sort((a: any, b: any) => {
        return a.label.localeCompare(b.label);
      });
    apiData.client_geo = geoOptions;

    // Domain API
    const domainResponse = await RequestServer(APIRoutes.domains, "GET");
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
      apiData.domains = domainOptions;
    }

    // Group API
    const groupResponse = await RequestServer(APIRoutes.groupsMappedToMe, "GET");
    const groupOptions: objectTypes[] = groupResponse.data.map((group: any) => ({ label: group.label, value: group.id }));
    apiData.groups = groupOptions || [];

    setApiData(apiData);
  } catch (err) {
    console.log(err);
  }
};

export const getGroupsData = async (setApiData:any)=>{
  const apiData: any = {};
  try {
    // Group API
    const groupResponse = await RequestServer(APIRoutes.groupsMappedToMe, "GET");
    const groupOptions: any[] = groupResponse.data.map((group: any) => ({ label: group.label, value: group.id }));
    groupOptions.push({
      label: "All",
      value: ""
    })
    apiData.groups = groupOptions || [];

    setApiData(apiData);
  } catch (err) {
    console.log(err);
  }
}

export const getClientOfficeOptions = async (
  id: number | null,
  clientOffice: object[],
  setOfficeOptions: any,
  setOfficeLoading: any,
  client_name: string | null
) => {
  setOfficeLoading(true);
  setOfficeOptions([]);
  // id is not there
  if (!id) {
    setOfficeOptions(clientOffice);
    if (clientOffice) {
      setOfficeLoading(false);
    }

    return;
  }

  try {
    const url = "?client_id=" + id;
    const response = await RequestServer(
      APIRoutes.clientOfficeUrl + url,
      "get"
    );

    if (response.success) {
      const clientName = client_name ? `(${client_name})` : "";
      const clientOfficeOptions: object[] = response.data.map(
        (office: any) => ({
          value: office.id,
          label: `${office.name}, ${office.entityName} ${clientName}`,
        })
      );

      setOfficeOptions(clientOfficeOptions);
      setOfficeLoading(false);
    }
  } catch (err) {
    console.log(err);
    setOfficeOptions(null);
  }
};

export const getProjectAdvanceFilterPayload = (
  formData: projectAdvanceFilterTypes
) => {
  const {
    research_analyst,
    account_manager,
    expert_geo,
    client_geo,
    client_name,
    no_of_calls,
    other_domains,
    functions,
    target_companies,
    domains,
    status,
    type,
    group,
    client_office,
    case_code
  } = formData;

  console.log("formDataformDataformDataformData", formData)

  const payload: any = {};

  // Research Analyst
  if (research_analyst) {
    payload.research_analysts = research_analyst.value.toString();
  }
  if (no_of_calls) {
    payload.greaterthanequalto___call_count = no_of_calls
  }

  // Account Manager
  if (account_manager.length !== 0) {
    payload.account_manager = account_manager
      .map((acc: objectTypes) => acc.value)
      .join(", ");
  }

  // Expert Geography
  if (expert_geo) {
    payload.expert_geographies = expert_geo.value.toString();
  }

  // Client Geography
  if (client_geo) {
    payload.client_geography = client_geo?.value.toString();
  }

  // Client Name
  if (client_name) {
    payload.client_id = client_name.value.toString();
  }

  // Client Office
  if (client_office.length) {
    payload.billing_office = client_office.map((office) => office.value).join(",");
  }

  // Other Domains
  if (other_domains.length > 0) {
    payload.like___domain_others = other_domains.join(", ");
  }

  // Functions
  if (functions.length > 0) {
    payload.like___functions = functions.join(", ");
  }

  // Target Companies
  if (target_companies.length > 0) {
    payload.like___target_companies = target_companies.join(", ");
  }

  // case code
  if (case_code) {
    payload.case_code = case_code;
  }

  // Domains
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
      payload.in___l0_domain = l0.join(",");
    }

    if (l1.length > 0) {
      payload.in___l1_domain = l1.join(",");
    }

    if (l2.length > 0) {
      payload.in___l2_domain = l2.join(",");
    }

    if (l3.length > 0) {
      payload.in___l3_domain = l3.join(",");
    }
  }

  // status
  if (status) {
    payload.status = status.value;
  }
  // type
  if (type) {
    payload.type = type.value;
  }

  // group
  if (group) {
    payload.fk_group = group.value;
  }

  return Object.keys(payload).length > 0 ? payload : null;
};
