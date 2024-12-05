import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../constants";
import { CallDetail } from "../../pages/Calls/types";
import { RequestServer } from "../../utils/services";
import { LocalDayjs } from "../../utils/timezoneService";
import { clientContactArr } from "../project-form/helper";
import { callMediumReason, callType } from "../project/project-call-log-form/helper";
import { getCurrencyValue } from "../../utils/currencies";

export interface formValues {
  defaultValues: any;
  formOptions: any;
  isFormChange: boolean;
}

export type setFormValues = Dispatch<SetStateAction<formValues>>;

export const getFormValues = async (callDetail: CallDetail) => {
  const id = callDetail?.fk_project;
  const expert_id = callDetail?.fk_expert;
  const response = await RequestServer(`${APIRoutes.projects}?id=${id}`, "get");

  const projectData = response.data[0];

  /* =========================
        Schedule Call
     =========================
  */

  let schedule_call_arr: any[] = [
    {
      value: callDetail.id,
      label: `${LocalDayjs(callDetail.scheduled_start_time).format(
        "DD-MMM-YY hh:mm A"
      )} - ${LocalDayjs(callDetail.scheduled_end_time).format("hh:mm A")} | ${
        callDetail.title
      }`,
      callTime: callDetail.scheduled_start_time,
    },
  ];

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

  let expert_geo: { label: string; value: number }[] = [];

  if (expert_response.success) {
    const data = expert_response.data[0];
    expert_geo = data.expert_geographies_value.map((geo: any) => ({
      label: geo.name,
      value: geo.id,
    }));
  }

  const expert_geo_value = callDetail?.geographies
    ? callDetail?.geographies?.split(",")?.map((geo_id: string) => {
        const curr_geo = expert_geo.find(
          (geo) => geo.value === parseInt(geo_id)
        );

        return curr_geo || { label: "WRONG DATABASE ENTRY", value: geo_id };
      })
    : expert_geo;

  /* ========================
        GET CLIENT OFFICES 
     ========================== */

  const billing_office_id = projectData?.billing_office;
  let billing_office_arr: any = [];

  const clientOfficeResponse =billing_office_id? await RequestServer(
    APIRoutes.clientOfficeUrl +
      (billing_office_id ? `?id=${billing_office_id}` : ""),
    "get"
  ):[];

  if (clientOfficeResponse.success) {
    billing_office_arr = formatBillingData(clientOfficeResponse?.data);
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

  let client_contact_value: any = null;

  if (clientContactResponse.success) {
    // FILTERING OUT CLIENT CONTACTS WHICH ARE NOT THE PART OF THE CURRENT PROJECT
    const data = clientContactResponse?.data?.filter(
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

    client_contact_value = callDetail?.client_contact
      ? formatFormData(clientContactResponse?.data)?.find(
          (client) => client?.value === parseInt(callDetail?.client_contact)
        )
      : null;

    client_contact = data.map((contact: clientContactArr) => ({
      label: `${contact?.name} - ${contact?.email}`,
      value: contact?.id,
    }));
  }

  /* 
    ======================
      Account Manager
    ======================
  */

  let manager_id = projectData?.account_manager;
  const adminIds = [
    parseInt(manager_id),
    parseInt(callDetail?.account_manager),
    parseInt(callDetail?.research_analyst),
  ].join(",");

  console.log(
    adminIds,
    parseInt(manager_id),
    parseInt(callDetail?.account_manager),
    parseInt(callDetail?.research_analyst)
  );

  const userListResponse = await RequestServer(
    APIRoutes.adminUsers + "&in___id=" + adminIds,
    "get"
  );
  let account_manager = null;
  let account_manager_arr: any[] = [];
  let adminUsers: { label: string; value: number }[] = [];

  if (userListResponse.success) {
    const curr_acc_manager = userListResponse?.data?.find(
      (user: any) => user.id === manager_id
    );
    account_manager = {
      label: curr_acc_manager?.name,
      value: curr_acc_manager?.id,
    };
    // account_manager_arr = userListResponse.data.map((user: any) => ({
    //   label: user.name,
    //   value: user.id,
    // }));
    account_manager_arr = [account_manager];

    adminUsers = formatFormData(userListResponse.data);
  }

  const formOptions: any = {
    billing_office_arr,
    case_code_arr:
      projectData?.case_code?.map((c: string) => ({ label: c, value: c })) ||
      "",
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
    client_id: projectData.client_id,
  };

  const defaultValues: any = getdefaultValues(callDetail, adminUsers);
  defaultValues.client_contact = client_contact_value;
  defaultValues.expert_geo = expert_geo_value;

  return {
    formOptions,
    defaultValues,
    isFormChange: false,
  };
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

// const callType = [
//   { label: "Report", value: "Report" },
//   { label: "Site visit", value: "Site visit" },
//   { label: "Follow up call", value: "Follow up call" },
// ];

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

export const getdefaultValues = (
  callDetail: CallDetail,
  adminUsers: { label: string; value: number }[]
) => {
  const currency_1 = getCurrencyValue(callDetail.selling_price_currency);
  const currency_2 = getCurrencyValue(callDetail.cost_price_currency);

  const defaultValues = {
    schedule_call:
      callDetail.id &&
      callDetail.scheduled_end_time &&
      callDetail.scheduled_start_time
        ? {
            value: callDetail.id,
            label: `${LocalDayjs(callDetail.scheduled_start_time).format(
              "DD-MMM-YY hh:mm A"
            )} - ${LocalDayjs(callDetail.scheduled_end_time).format(
              "hh:mm A"
            )} | ${callDetail.title}`,
            callTime: callDetail.scheduled_start_time,
          }
        : null,
    expert_name: callDetail?.fk_expert_value?.name || null,
    billing_office: callDetail.billing_office_id_value
      ? {
          label: callDetail.billing_office_id_value.name,
          value: callDetail.billing_office_id,
        }
      : null,
    case_code: callDetail?.casecode
      ? { label: callDetail.casecode, value: callDetail.casecode }
      : null,
    call_date: callDetail?.call_start_time
      ? LocalDayjs(callDetail.call_start_time)
      : null,
    selling_price: callDetail?.selling_price || null,
    currency_1,
    chargeable_min: (callDetail?.chargeable_mins == null)? null: callDetail?.chargeable_mins,
    cost_price: callDetail?.cost_price || null,
    currency_2,
    payable_min: (callDetail?.payable_mins == null)? null: callDetail?.payable_mins ,
    client_contact: callDetail?.client_contact || null,
    account_manager:
      callDetail.account_manager && adminUsers
        ? getAdminFromId(callDetail.account_manager, adminUsers)
        : null,
    research_analyst: (callDetail.research_analyst, adminUsers)
      ? getAdminFromId(callDetail.research_analyst, adminUsers)
      : null,
    expert_rating: callDetail?.expert_rating || null,
    expert_type: callDetail?.expert_type || null,
    call_type: callDetail.call_type
      ? { label: callDetail.call_type, value: callDetail.call_type }
      : null,
    call_medium: callDetail?.call_medium
      ? {
          label: callDetail.call_medium,
          value: callDetail.call_medium,
        }
      : null,
      call_medium_reason: callDetail?.call_medium_reason
      ? {
          label: callDetail.call_medium_reason,
          value: callDetail.call_medium_reason,
        }
      : null,
    expert_geo: callDetail?.geographies?.split(",") || null,
    call_status: callDetail?.call_status || null,
    exchange_rate_chargeable: (callDetail?.exchange_rate_chargeable == null) ? null : callDetail?.exchange_rate_chargeable,
    exchange_rate_payable: (callDetail?.exchange_rate_payable == null) ? null : callDetail?.exchange_rate_payable,
    scheduled_start_time: callDetail?.scheduled_start_time || null,
    scheduled_end_time: callDetail?.scheduled_end_time || null,
    call_details: callDetail || null,
  };
  return defaultValues;
};

function getAdminFromId(
  id: string,
  adminUsers: { label: string; value: number }[]
) {
  const admin = adminUsers.find((i) => i.value === +id);
  return admin || null;
}

export function handleFormChange(setFormValues: setFormValues) {
  setFormValues((prev) => {
    if (!prev.isFormChange) {
      prev.isFormChange = true;
    }

    return prev;
  });
}
