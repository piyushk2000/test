import { EnqueueSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { getCurrencyValue } from "../../../utils/currencies";
import { RequestServer } from "../../../utils/services";
import { LocalDayjs } from "../../../utils/timezoneService";
import { clientContactArr } from "../../project-form/helper";

export interface formValues {
  defaultValues: any;
  formOptions: any;
}

export const getFormValues = async (
  id: string,
  pe_id: string | null,
  expert_id: string,
  selected_call: number | null
) => {
  const response = await RequestServer(`${APIRoutes.projects}?id=${id}`, "get");

  const projectData = response.data[0];

  /* =========================
        Schedule Call
     =========================
  */
  const scheduleCallProjects = await RequestServer(
    APIRoutes.plan +
    "/call?equalto___status=Scheduled&fk_expert=" +
    expert_id +
    "&show_columns=id,scheduled_start_time,research_analyst,call_type,scheduled_end_time,title&fk_project=" +
    id,
    "GET"
  );
  let schedule_call_arr: any[] = [];
  let selected_call_value = null;

  if (scheduleCallProjects.success) {
    const allCalls = scheduleCallProjects.data;

    if (allCalls) {
      allCalls.forEach((call: any) => {
        schedule_call_arr.push({
          value: call.id,
          label: `${LocalDayjs(call.scheduled_start_time).format(
            "DD-MMM-YY hh:mm A"
          )} - ${LocalDayjs(call.scheduled_end_time).format("hh:mm A")} | ${call.title
            }`,
          callTime: call.scheduled_start_time,
          research_analyst: call.research_analyst,
          call_type: call.call_type,
        });
      });

      selected_call_value = schedule_call_arr.find((c: any) => c.value === selected_call) || null

    }
  }

  /* ==========================
        EXPERTS
     ==========================
  */

  const expert_response = await RequestServer(
    APIRoutes.getExpert +
    "?id=" +
    expert_id +
    "&show_columns=price_per_hour,price_per_hour_currency,id,name,expertise_in_these_geographies,fk_project",
    "GET"
  );

  let expert_name, price_per_hour, price_per_hour_currency;
  let expert_geo: { label: string; value: number }[] = [];
  let expertType: string = "PE";

  if (expert_response.success) {
    const data = expert_response.data[0];
    expert_name = data.name;
    price_per_hour = data.price_per_hour;
    price_per_hour_currency = data.price_per_hour_currency;
    expert_geo = data.expert_geographies_value.map((geo: any) => ({
      label: geo.name,
      value: geo.id,
    }));
    expertType = data.fk_project === parseInt(id) ? "CE" : "PE";
  }

  /* ========================
        GET CLIENT OFFICES 
     ========================== */

  const billing_office_id = projectData.billing_office;
  let billing_office_arr: any = [];

  const clientOfficeResponse = billing_office_id ? await RequestServer(
    APIRoutes.clientOfficeUrl +
    (billing_office_id ? `?id=${billing_office_id}` : ""),
    "get"
  ) : [];

  if (clientOfficeResponse.success) {
    billing_office_arr = formatBillingData(clientOfficeResponse.data);
  }

  /* ===================
        Client Contact
    ===================== */
  const client_id = projectData?.client_id;
  const clientContactResponse = await RequestServer(
    `${APIRoutes.clientContactUrl}?fkClient=${client_id}`,
    "get"
  );
  let client_contact: any[] = [];

  if (clientContactResponse.success) {
    // FILTERING OUT CLIENT CONTACTS WHICH ARE NOT THE PART OF THE CURRENT PROJECT
    const data = clientContactResponse.data.filter(
      (contact: clientContactArr) => {
        // Project Client Contacts
        const client_contact_arr: string[] = projectData?.client_contacts;

        for (let projectContact of client_contact_arr) {
          if (contact.id === parseInt(projectContact)) {
            return true;
          }
        }

        return false;
      }
    );

    client_contact = data.map((contact: clientContactArr) => ({
      label: `${contact.name} - ${contact.email}`,
      value: contact.id,
    }));
  }
  /* 
    ======================
      Account Manager
    ======================
  */

  let manager_id = projectData?.account_manager;
  const userListResponse = await RequestServer(
    APIRoutes.adminUsers + (manager_id ? "&id=" + manager_id : ""),
    "get"
  );
  let account_manager = null;

  let account_manager_arr: { label: string; value: number }[] = [];
  if (userListResponse.success) {
    const curr_acc_manager = userListResponse.data.find(
      (user: any) => user.id === manager_id
    );
    account_manager = {
      label: curr_acc_manager.name,
      value: curr_acc_manager.id,
    };
    // account_manager_arr = userListResponse.data.map((user: any) => ({
    //   label: user.name,
    //   value: user.id,
    // }));
    account_manager_arr = [account_manager];
  }

  const currency_2 = getCurrencyValue(price_per_hour_currency);

  const defaultValues = {
    schedule_call: selected_call_value,
    expert_name,
    billing_office: billing_office_arr?.length === 1 ? billing_office_arr[0] : null,
    case_code: projectData?.case_code?.length === 1 ? projectData?.case_code[0] : null,
    call_date: null,
    selling_price: "",
    currency_1: "",
    chargeable_min: "",
    cost_price: price_per_hour,
    currency_2,
    payable_min: "",
    client_contact: client_contact?.length === 1 ? client_contact[0] : null,
    account_manager,
    research_analyst: null,
    expert_rating: 0,
    expert_type: expertType,
    call_type: "",
    call_medium: "",
    call_medium_reason: null,
    expert_geo: [],
    call_status: "Chargeable",
  };

  const formOptions: any = {
    billing_office_arr,
    case_code_arr:
      projectData?.case_code?.length > 0
        ? projectData?.case_code?.map((c: string) => ({ label: c, value: c }))
        : [],
    client_contact_arr: client_contact,
    research_analyst_arr: projectData?.research_analysts_value
      ? formatFormData(projectData?.research_analysts_value)
      : [],
    call_type_arr: callType,
    call_medium_reason_arr: callMediumReason,
    call_medium_arr: callMedium,
    call_status_arr: callStatus,
    schedule_call_arr,
    geo_arr: expert_geo,
    account_manager_id: manager_id,
    account_manager_arr,
    project_id:projectData.id,
    client_id: projectData.client_id,
  };

  return { defaultValues, formOptions };
};

const formatBillingData = (data: object[]) => {
  if (data.length === 0) {
    return [];
  } else {
    return data.map((d: any) => ({
      label: `${d.name}, ${d.entityName}`,
      value: d.id,
    }));
  }
};

const formatFormData = (data: any[]) => {
  if (data.length === 0) {
    return [];
  } else {
    return data.map((d: any) => ({
      label: d.name,
      value: d.id,
    }));
  }
};

export const callType = [
  { label: "Call", value: "Call" },
  { label: "Follow up call", value: "Follow up call" },
  { label: "Data / Written Report", value: "Data / Written Report" },
  { label: "In Person Meeting", value: "In Person Meeting" },
  { label: "On Site Visiting", value: "On Site Visiting" },
  { label: "LOP (Letter of Proposal)", value: "LOP (Letter of Proposal)" },
];

const callMedium = [
  { label: "Internal - Automated", value: "Internal - Automated" },
  { label: "Internal - Manual", value: "Internal - Manual" },
  { label: "Client - Automated", value: "Client - Automated" },
  { label: "Client - Manual", value: "Client - Manual" },
  { label: "Others", value: "Others" },
];

const callStatus = [
  { label: "Chargeable", value: "Chargeable" },
  { label: "Waive Off", value: "Waive Off" },
  { label: "Bad Call", value: "Bad Call" },
  { label: "Advance Payment", value: "Advance Payment" },
];

export const callMediumReason = [
  { label: "End client is unable to use Zoom", value: "End client is unable to use Zoom" },
  { label: "Workshop/Multiple experts call", value: "Workshop/Multiple experts call" },
  { label: "Client connection issue", value: "Client connection issue" },
  { label: "Expert connection issue", value: "Expert connection issue" }
];

export const errorStyle = {
  backgroundColor: "red", 
  color: "white",
  padding: '1rem',
  borderRadius: "10px",
  fontWeight: "500"
}

export async function getCallExchangeRates(cost_price_currency: string, selling_price_currency: string, call_start_time: Date, setLoading: (l: boolean) => void, enqueueSnackbar: EnqueueSnackbar) {
  try {
    setLoading(true);

    const response = await RequestServer(`${APIRoutes.getCallExchangeRate}?cost_price_currency=${cost_price_currency}&selling_price_currency=${selling_price_currency}&call_start_time=${LocalDayjs(call_start_time).format("YYYY-MM-DD")}`, "GET")

    if(response.success) {
      return response.data;
    } else {
      console.log({response});
      enqueueSnackbar(response.message || response.error || "Something Went Wrong", {
        variant: "warning"
      })
      return {
        exchange_rate_payable: null,
        exchange_rate_chargeable: null
      }
    }
  } catch(err) {
    console.log(err);
    return {
      exchange_rate_payable: null,
      exchange_rate_chargeable: null
    }
  } finally {
    setLoading(false);
  }
}