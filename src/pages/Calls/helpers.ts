import dayjs from "dayjs";
import { CallCardProps } from "../../atoms/calls/calls-card";
import {
  CallDetail,
  CallDetails,
  ClientContact,
  GenerateInvoiceTypes,
  RequestPaymentAPI,
  ResponseZohoPaymentReceiptsTypes,
  Select,
  SelectedCards,
  SetCallDetail,
  SetDeleteCallDialog,
  SetPaymentReceiptModalTypes,
  SetSelect,
  Users,
  UsersApi,
  filterPayload,
  getFullBankDetailsResponse,
} from "./types";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";
import { FilterType } from "../../organisms/call-page-filter/helper";
import { EnqueueSnackbar } from "notistack";
import { base64toBlob, getDownloadUrl, removeDuplicates } from "../../utils/utils";
import React, { Dispatch, SetStateAction } from "react";
import { isAdmin, isClient, isExpert, isInternalUser, isSuperAdmin } from "../../utils/role";
import { SelectedAction } from "../../molecules/nav-bar-common/type";
import { LocalDayjs } from "../../utils/timezoneService";
import { GroupDataItem } from "../../organisms/groups/types";

export const isAdminAllowed = (
  fk_group: number,
  account_manager: number,
  research_analysts: string[],
  groupData: GroupDataItem[] | null,
  is_research_analyst_allowed: boolean = true
) => {
  let isAllowed = true;
  const userId = localStorage.getItem("id");

  // If logged in user is admin ->
  // If the call - Account_manager, research_analyst or group admins
  // is equal to current user ID which is admin, only add them else not
  if (isAdmin() && userId && groupData) {
    // first finding fk_group Data from groupData then splitting sublabel
    // then finding id which is equal to userId

    const is_group = groupData
      .find((group) => group.id === fk_group)
      ?.sublabel?.split(",")
      ?.find((id) => id === userId);

    const is_research_analyst = is_research_analyst_allowed
      ? research_analysts.find((id) => id === userId)
      : false;

    isAllowed =
      account_manager === parseInt(userId) ||
      !!is_research_analyst ||
      !!is_group;
  }

  return isAllowed;
};

export const defaultFilterPayloadFn = (call_id_param: string | null): filterPayload => ({
  sort:isClient()? "desc___call_start_time" : "desc___id",
  search: null,
  calender: null,
  expert_type: "",
  status: "",
  call_medium: "",
  isFilterApplied: false,
  rowsPerPage: 24,
  search_by_id: call_id_param || "",
  search_by_project_id: "",
  casecode: "",
  search_by_expert_id: "",
  isBadCall: false,
  NoER: false,
});

export const defaultNavbarFilters: Partial<filterPayload> = {
  sort: isExpert()
    ? "asc___status"
    : isClient()
      ? "desc___call_start_time"
      : "asc___id",
  calender: null,
  status: "",
  call_medium: "",
  expert_type: "",
  isBadCall: false,
  NoER: false,
};

function getCallStatusText(call_status: string | null) {
  if (call_status === "Waive Off") {
    return "Waived Off";
  } else if (call_status === "Chargeable") {
    return "Billable";
  } else {
    return "";
  }
}

export function selectAllowed(
  selectedAction: SelectedAction,
  CallDetail: CallDetail
) {

  if (isExpert()) {
    return CallDetail.status === "Completed";
  }

  if (selectedAction?.title === "Upload Invoice") {
    return CallDetail.status === "Confirmed";
  } else if (selectedAction?.title === "Mark as Paid") {
    return CallDetail.status === "Payment Requested";
  } else if (selectedAction?.title === "Mark as UnPaid") {
    return CallDetail.status === "Paid";
  } else if (selectedAction?.title === "Generate Invoice") {
    return CallDetail.status === "Confirmed";
  } else if (selectedAction?.title === "Submit Payment Request") {
    if(isAdmin()) {
      const id = localStorage.getItem("id");
      return (CallDetail.account_manager === id || CallDetail.research_analyst === id) && CallDetail.status === "Completed";
    }
    return CallDetail.status === "Completed";
  } else if (selectedAction?.title === "Change Casecode") {
    return true;
  }
  return false;
}

export function getCallCardProps(
  callDetail: CallDetail,
  admins: Users,
  clientContactNames: ClientContact | null,
  selectedAction: SelectedAction,
  groupData: GroupDataItem[] | null
): Omit<
  CallCardProps,
  | "onEditCallClick"
  | "onConfirmByExpert"
  | "isSelectClicked"
  | "onDeleteCallClick"
  | "onPaidCallClick"
  | "onUnPaidCallClick"
  | "onZoomreportsClick"
  | "onApprovedForPaymentClick"
  | "onViewReviewClickHandler"
  | "viewSoAClickHandler"
  | "viewPaymentReceiptClickHandler"
  | "addRemarkClickHandler"
> {
  const isSelectAllowed = selectAllowed(selectedAction, callDetail);

  const {
    id,
    title,
    fk_expert,
    fk_project,
    status,
    call_medium,
    casecode,
    call_start_time,
    selling_price,
    selling_price_currency,
    chargeable_mins,
    cost_price,
    cost_price_currency,
    payable_mins,
    client_contact,
    account_manager,
    research_analyst,
    call_type,
    billing_office_id_value,
    fk_project_value,
    fk_expert_value,
    fk_client_value,
    call_status,
    zoom_meeting_id,
    invoice_url,
    reviewed_by,
    review_remarks,
    reviewed_on,
    exchange_rate_payable,
    remark
  } = callDetail;

  const isBankFromIndia = fk_expert_value.primary_bank_value?.bank_country_code === "IND";

  const payable_amount = (((cost_price * payable_mins) / 60) * exchange_rate_payable);

  const net_payable = payable_amount > 0 ? isBankFromIndia ? priceFormatter(payable_amount) : getTotalAmount(
    cost_price,
    payable_mins
  ) : 0

  const net_payable_full = isBankFromIndia ? payable_amount : getTotalAmount(
    cost_price,
    payable_mins,
    true
  )

  //@ts-ignore
  return {
    isSelectAllowed,
    chargeableAmountFull: `${selling_price_currency} ${getTotalAmount(
      selling_price,
      chargeable_mins,
      true
    )} @ ${selling_price}/Hr`,
    chargeableAmount: `${selling_price_currency} ${getTotalAmount(
      selling_price,
      chargeable_mins
    )} @ ${priceFormatter(selling_price)}/Hr`,
    payableAmountFull: `${cost_price_currency} ${getTotalAmount(
      cost_price,
      payable_mins,
      true
    )} @ ${cost_price}/Hr`,
    payableAmount: `${cost_price_currency} ${getTotalAmount(
      cost_price,
      payable_mins
    )} @ ${priceFormatter(cost_price)}/Hr`,
    billingOffice: billing_office_id_value?.name || "",
    accountManager:
      admins.find((i) => String(i.id) === account_manager)?.name || "",
    callId: String(id),
    expertName: fk_expert_value?.name,
    callDate: dayjs(call_start_time).format("DD MMM YYYY"),
    callTime: dayjs(call_start_time).format("hh:mmA"),
    clientName: fk_client_value?.name,
    projectId: String(fk_project),
    researchAnalyst:
      admins.find((i) => String(i.id) === research_analyst)?.name || "",
    status: status,
    isBankAvailable: fk_expert_value.primary_bank ? "Yes" : "No",
    isPECertificateAvailable: fk_expert_value.no_pe_certificate || null,
    expert_id: fk_expert,
    bank_location: fk_expert_value?.primary_bank_value?.bank_country_code,
    project_title: fk_project_value?.topic,
    title,
    payable_mins,
    RA_email:
      admins.find((i) => String(i.id) === research_analyst)?.email || "",
    RA_mobile:
      admins.find((i) => String(i.id) === research_analyst)?.mobile || "",
    call_status: getCallStatusText(call_status),
    chargeable_mins,
    casecode,
    call_medium,
    call_type,
    client_contact:
      isClient() && clientContactNames
        ? clientContactNames.find((i) => String(i.id) === client_contact)?.name
        : undefined,
    groupData,
    callDetail,
    invoice_url: invoice_url || null,
    reviewed_by: reviewed_by || null,
    reviewed_on: reviewed_on || null,
    review_remarks: review_remarks || null,
    net_payable: `${isBankFromIndia ? `₹` : cost_price_currency} ${net_payable}`,
    net_payable_full: `${isBankFromIndia ? `₹` : cost_price_currency} ${net_payable_full}`,
    remark
  };
}

export function priceFormatter(price: number) {
  if (price >= 1000) {
    return (price / 1000)?.toFixed(1) + "K";
  } else {
    return price?.toFixed(1);
  }
}

export function tooltipFormatter(amount: string) {
  let splited_amout = amount.split(" ")
  let Roundoff_price = (Number(splited_amout[1]).toFixed(0)).toString()
  return (`${splited_amout[0]} ${Roundoff_price} ${splited_amout[2]} ${splited_amout[3]} `)
}

export function getPayableMinutes(
  cost_price_currency: string,
  cost_price: number,
  payable_mins: number
) {
  const amount = (cost_price * payable_mins) / 60;

  return `${cost_price_currency} ${amount.toFixed(2)}`;
}

export function getTotalAmount(
  price: number,
  mins: number,
  disableFormatter?: boolean,
  onlyNumber?: boolean
) {
  const amount = (price * mins) / 60;

  if (onlyNumber) {
    return amount;
  }

  if (disableFormatter) {
    return amount.toFixed(2);
  }

  return priceFormatter(amount);
}

type GetStatus = {
  success: true;
  message: string;
  data: Array<{
    status: string;
  }>;
};

export const setStatus = async (
  id: number,
  setCallDetails: SetCallDetail | undefined
) => {
  try {
    const response: GetStatus = await RequestServer(
      APIRoutes.scheduleCall + "?show_columns=status&id=" + id,
      "GET"
    );

    if (response.success) {
      const status = response.data[0].status;

      setCallDetails &&
        setCallDetails((calls) => {
          if (calls) {
            const call = calls.find((call) => call.id === id);
            if (call) {
              call.status = status;
            }
            //making a new array to rerender
            return [...calls];
          }

          return calls;
        });
    }
  } catch (err) {
    console.log(err);
  }
};

export const confirmedByExpert = async (
  id: number,
  setBackdrop: (value: boolean) => void,
  setCallDetails: SetCallDetail | undefined
) => {
  try {
    setBackdrop(true);
    const payload = {
      action: "ConfirmCall",
      id,
    };
    const response = await RequestServer(
      APIRoutes.scheduleCall,
      "PATCH",
      payload
    );

    if (response.success) {
      await setStatus(id, setCallDetails);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setBackdrop(false);
  }
};

export const callsDefaultFilter = (
  client_id: string | null,
  client_name: string | null,
  expert_id: string | null,
  expert_name: string | null
): Partial<FilterType> => {
  let expert = null;

  if (expert_id && expert_name) {
    expert = { label: expert_name, value: parseInt(expert_id) };
  }
  const filter: Partial<FilterType> = {
    expert,
  };

  const client =
    client_id && client_name
      ? {
        label: client_name,
        value: parseInt(client_id),
      }
      : null;

  if (client) {
    filter.client = client;
  }

  return filter;
};

export const requestPayment = async (
  setDialog: SetPaymentReceiptModalTypes,
  enqueueSnackbar: EnqueueSnackbar,
  selectedCards: SelectedCards[],
  setSelect: SetSelect,
  setBackdrop: (value: boolean) => void,
  setCallDetails: SetCallDetail | undefined,
  refetch: () => Promise<void>,
  callsDetails: CallDetails | null,
  id?: number,
  isSingle?: boolean,
  expert_name?: string
) => {
  // If multiple cards are not selected but requesting for multiple payments
  if (!isSingle && !selectedCards.length) {
    return;
  }

  const ids = isSingle
    ? id?.toString()
    : selectedCards.map((card) => card.id).join(",");

  const currentId = isSingle ? id : selectedCards[0].id;

  const expertName =
    expert_name || selectedCards[0]?.fk_expert_value?.name || "";

  const currentCallDetail = callsDetails?.find((call) => call.id === currentId);

  /* VALIDATIONS ------------------------------------ */

  // If All of the selected calls have same experts or not ==== //
  let sameExpert = true;

  let prevExpertId: number | null = null;
  selectedCards.forEach((card, index) => {
    if (!prevExpertId && index === 0) {
      prevExpertId = card.fk_expert;
    } else if (prevExpertId !== card.fk_expert) {
      sameExpert = false;
    }
  });

  if (!sameExpert) {
    enqueueSnackbar("Selected calls must belong to the same expert", {
      variant: "warning",
    });
    return;
  }

  // If user dont have a bank account ========================= //
  let isBankAvailable = true;

  if (!currentCallDetail?.fk_expert_value.primary_bank) {
    isBankAvailable = false;
  }

  if (!isBankAvailable) {
    enqueueSnackbar(
      "Please add bank details before submitting payment request",
      {
        variant: "warning",
      }
    );
    return;
  }

  // // If user Primary Bank Account is not in India ============= //
  // let isBankDomestic = true;

  // if (
  //   currentCallDetail?.fk_expert_value.primary_bank_value?.bank_country_code !==
  //   "IND"
  // ) {
  //   isBankDomestic = false;
  // }

  // if (!isBankDomestic) {
  //   enqueueSnackbar(
  //     "The expert's primary bank account is not in India. You can not submit payment request on his/her behalf.",
  //     {
  //       variant: "warning",
  //     }
  //   );
  //   return;
  // }

  // // If Expert has not provided GST Details =================== //
  // let isGstDetailsProvided = true;

  // const gstResponse: GetGstResponse = await RequestServer(
  //   APIRoutes.bankDetails +
  //     `?fk_expert=${currentCallDetail?.fk_expert}&id=${currentCallDetail?.fk_expert_value.primary_bank}&show_columns=gstin`,
  //   "GET"
  // );

  // if (!gstResponse.data[0].gstin) {
  //   isGstDetailsProvided = false;
  // }

  // if (!isGstDetailsProvided) {
  //   enqueueSnackbar(
  //     "The expert has not provided GST details . You can not submit payment request on his/her behalf.",
  //     {
  //       variant: "warning",
  //     }
  //   );
  //   return;
  // }

  // /* ------------------------------------------------ */

  setDialog(() => ({ state: true, expert_name: expertName }));
  return async (documentUrl: string) =>
    await requestPaymentSubmit(
      documentUrl,
      ids,
      setBackdrop,
      enqueueSnackbar,
      setSelect,
      isSingle,
      id,
      setCallDetails,
      refetch
    );
};

export async function requestPaymentSubmit(
  documentUrl: string,
  ids: string | undefined,
  setBackdrop: (value: boolean) => void,
  enqueueSnackbar: EnqueueSnackbar,
  setSelect: SetSelect | null,
  isSingle: boolean | undefined,
  id: number | undefined,
  setCallDetails: SetCallDetail | undefined,
  refetch: () => Promise<void>,
  fk_expert?: number,
) {
  // VALIDATIONS ================================== //

  if (!documentUrl) {
    enqueueSnackbar(
      "Please upload the invoice before making a payment request.",
      {
        variant: "warning",
      }
    );

    // returning true so that handleClose() will not be called
    // for more info - see submit button onClick() of request-payment-form
    return true;
  }

  // ============================================== //

  if (!fk_expert) {
    return;
  }

  const payload = {
    action: "RequestPayment",
    ids, //commas sperated ids of calls,
    document: documentUrl,
    expert_id: fk_expert
  };

  try {
    setBackdrop(true);
    const response: RequestPaymentAPI = await RequestServer(
      APIRoutes.scheduleCall,
      "PATCH",
      payload
    );

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });

      setSelect && setSelect((prev) => ({
        callAction: null,
        isClicked: false,
        selectedCards: [],
      }));

      // refetch status
      if (isSingle) {
        id && (await setStatus(id, setCallDetails));
      } else {
        await refetch();
      }
    } else {
      enqueueSnackbar(response.message, {
        variant: "warning",
        autoHideDuration: 10000
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setBackdrop(false);
  }
}

export async function getAdminUsers(
  callsDetails: CallDetails | null,
  setAdminUsers: React.Dispatch<React.SetStateAction<Users | null>>
) {
  if (!callsDetails) {
    return;
  }

  const research_analysts_ids = getIds_AM_RA(callsDetails);
  const adminUserIds = research_analysts_ids
    ? `&in___id=` + research_analysts_ids
    : "";
  const userUrl =
    APIRoutes.adminUsers + adminUserIds + "&show_columns=id,name,email,mobile";

  try {
    const response: UsersApi = await RequestServer(userUrl, "GET");

    if (response.success) {
      setAdminUsers(response.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getClientContactName(ids: string[]) {
  const userUrl =
    APIRoutes.clientContactUrl +
    "?in___id=" +
    ids.join(",") +
    "&show_columns=id,name";

  try {
    const response: UsersApi = await RequestServer(userUrl, "GET");

    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

export function getIds_AM_RA(callsDetails: CallDetails): string {
  if (!callsDetails) {
    return "";
  }

  const ids: string[] = [];

  const ra_ids = callsDetails.map((call) => call.research_analyst);
  const am_ids = callsDetails.map((call) => call.account_manager);

  ids.push(...ra_ids);
  ids.push(...am_ids);

  return removeDuplicates<string>(ids).join(",");
}

export const url = (
  page: string,
  project_id: string | null,
  queryString: string | null,
  filterPayload: filterPayload,
  start_call_month: string | null,
  start_call_year: string | null,
  expert_id: string | null,
  call_ids: string | null
) => {
  const workspace = isAdmin() && !expert_id ? "&workspace=YES" : "";

  return (
    APIRoutes.scheduleCall +
    "?embed=YES&notequalto___status=Scheduled&page=" +
    page +
    `&limit=${filterPayload.rowsPerPage}` +
    (project_id ? "&fk_project=" + project_id : "") +
    (queryString ? "&" : "") +
    queryString +
    (filterPayload.search ? "&search=" + filterPayload.search : "") +
    (filterPayload.isBadCall ? "&badCall=true" : "") +
    (filterPayload.NoER ? "&NoER=true" : "") +
    (filterPayload.search_by_id ? "&equalto___id=" + filterPayload.search_by_id : "") +
    (filterPayload.casecode ? "&like___casecode=" + filterPayload.casecode : "") +
    (filterPayload.search_by_project_id ? "&equalto___fk_project=" + filterPayload.search_by_project_id : "") +
    (filterPayload.search_by_expert_id ? "&equalto___fk_expert=" + filterPayload.search_by_expert_id : "") +
    (filterPayload.sort ? "&sort_by=" + filterPayload.sort : "") +
    (filterPayload.calender || "") +
    (filterPayload.expert_type || "") +
    (filterPayload.call_medium || "") +
    (filterPayload.status || "") +
    (call_ids ? `&in___id=${call_ids}` : "") +
    (start_call_month && start_call_year
      ? `&greaterthanequalto___call_start_time=${start_call_year}-${start_call_month}-1 00:00:00&lessthanequalto___call_start_time=${start_call_year}-${start_call_month}-${LocalDayjs(
        `${start_call_year}-${start_call_month}`
      )
        .endOf("month")
        .format("DD")} 23:59:59`
      : "") +
    workspace + "&view_invoice=1" +
    ((isInternalUser()) ? "&view_review=1" : "")
  );
};

export const deleteCall = async (
  call_id: number,
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void,
  refetch: () => Promise<void>,
  handleClose: () => void
) => {
  const payload = {
    action: "Delete",
    id: call_id,
  };

  setLoading(true);
  try {
    const response = await RequestServer(
      APIRoutes.scheduleCall,
      "PATCH",
      payload
    );

    if (response.success) {
      enqueueSnackbar("Call deleted", {
        variant: "success",
      });
      await refetch();
      handleClose();
    } else {
      console.log({ response });
      enqueueSnackbar(
        response.message || response.error || "Error occurred",
        {
          variant: "warning",
        }
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const deleteDialogHandleClose = (
  setDeleteCallDialog: SetDeleteCallDialog
) => setDeleteCallDialog((prev) => ({ state: false, call_id: null }));

export const markCallAsPaid = async (
  call_id: string,
  action: "Paid" | "UnPaid" | "ApprovedForPayment",
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void,
  refetch: () => Promise<void>,
  setSelect: SetSelect | null
) => {
  try {
    const payload = {
      action,
      ids: call_id,
    };
    setLoading(true);

    const response = await RequestServer(
      APIRoutes.scheduleCall,
      "PATCH",
      payload
    );

    if (response.success) {
      const msg =
        action === "Paid"
          ? "Marked Call as Paid Successfully" :
          action === "ApprovedForPayment" ? "Call is Approved for Payment Successfully"
            : "Marked Call as Unpaid Successfully";

      enqueueSnackbar(msg, {
        variant: "success",
      });
      await refetch();
      setSelect &&
        setSelect((prev) => ({
          callAction: null,
          selectedCards: [],
          isClicked: false,
        }));
    } else {
      enqueueSnackbar(response.message || response.error, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export async function setGenerateInvoice(
  select: Select,
  enqueueSnackbar: EnqueueSnackbar,
  setGenerateInvoiceOpen: Dispatch<SetStateAction<GenerateInvoiceTypes>>
) {
  try {
    const bank_id =
      select.selectedCards[0].fk_expert_value.primary_bank_value?.id?.toString() || null;
    const expert_id = localStorage.getItem("expert_id");

    const { bankDetails, isAllowed } = await isGenerateInvoiceAllowed(expert_id, bank_id, enqueueSnackbar);

    if (isAllowed) {
      setGenerateInvoiceOpen(() => ({
        state: true,
        bank_details: bankDetails,
      }));
    }
  } catch (err) {
    console.log(err);
  }
}

export async function isGenerateInvoiceAllowed(expert_id: string | null, bank_id: string | null, enqueueSnackbar: EnqueueSnackbar, notThrowError?: boolean) {

  if (!expert_id || !bank_id) {
    enqueueSnackbar(
      "Expert ID or Bank ID not found",
      {
        variant: "warning",
      }
    );
    return { bankDetails: null, isAllowed: false };
  }

  try {
    const bankDetailsResponse: getFullBankDetailsResponse = await RequestServer(
      APIRoutes.bankDetails + `?fk_expert=${expert_id}&id=${bank_id}`,
      "GET"
    );

    if (bankDetailsResponse.success) {
      const bankDetails = bankDetailsResponse.data[0];

      if (!bankDetails) {
        return { bankDetails: null, isAllowed: false };
      }

      if (bankDetails?.gstin) {
        if (!notThrowError) {
          enqueueSnackbar(
            "We cannot generate a GST invoice on your behalf. Please choose the 'Upload Invoice' option.",
            {
              variant: "warning",
            }
          );
        }

        return { bankDetails, isAllowed: false };
      } else {
        return { bankDetails, isAllowed: true };
      }
    } else {
      return { bankDetails: null, isAllowed: false };
    }
  } catch (err) {
    throw err;
  }
}

export function generateCallsDownloadUrl(queryString: string | null) {
  if (!queryString) {
    console.log({ queryString }, "Query String Not Found");
    return "";
  }

  const title = "Calls (Upto 1000 results are shown in this report)";

  const columns_keys = [
    "id",
    "fk_project",
    "account_manager",
    "research_analyst",
    "title",
    "status",
    "fk_expert",
    "fk_expert_value.name",
    "expert_rating",
    "expert_type",
    "fk_client",
    "fk_client_value.name",
    "client_participants",
    "client_contact",
    "billing_office_id",
    "billing_office_id_value.name",
    "call_start_time",
    "call_type",
    "call_status",
    "call_medium",
    "cost_price",
    "cost_price_currency",
    "selling_price",
    "selling_price_currency",
    "payable_mins",
    "chargeable_mins",
    "casecode",
    "geographies",
  ];

  const column_titles = [
    "Call ID",
    "Project ID",
    "Account Manager ID",
    "Research Analyst ID",
    "Title",
    "Status",
    "Expert ID",
    "Expert Name",
    "Expert Rating",
    "Expert Type",
    "Client ID",
    "Client",
    "Client Participants ID",
    "Client Contact",
    "Billing City ID",
    "Billing City",
    "Call Time",
    "Call Type",
    "Call Status",
    "Call Medium",
    "Cost Price",
    "Cost Price Currency",
    "Selling Price",
    "Selling Price Currency",
    "Payable Minutes",
    "Billable Minutes",
    "Case Code",
    "Geographies ID",
  ];

  const finalqueryString = queryString.replace("limit=12", "limit=1000");

  const url = getDownloadUrl(
    title,
    columns_keys,
    column_titles,
    finalqueryString
  );

  return url;
}


export const onZoomReportsClickHandler = (zoom_id: string | null) => {
  if (!zoom_id) {
    return;
  }

  const title = "Zoom Participants Reports for " + zoom_id;

  const api_url = `/plan/call/zoom_reports?id=${zoom_id}`

  const columns_keys_arr = [
    "name",
    "duration",
    "join_time",
    "leave_time",
  ];
  const column_titles_arr = [
    "Name",
    "Duration (in seconds)",
    `Join Time`,
    `Leave Time`,
  ];

  const url = getDownloadUrl(title, columns_keys_arr, column_titles_arr, api_url, "data.participants");

  window.open(url, "_blank", 'noopener,noreferrer');
}

export const refetchCalls = async (
  callIds: number[],
  setCallsDetails: React.Dispatch<React.SetStateAction<CallDetails | null>>
) => {
  try {
    const response = await RequestServer(APIRoutes.scheduleCall + "?in___id=" + callIds.join(',') + "&show_columns=status,id,remark", "GET");

    if (response.success) {
      const data = response.data;

      setCallsDetails((prev) => {
        if (prev) {
          for (let call of prev) {
            const current_call: { status: string, id: number, remark: string | null } | null = data.find((d: any) => d.id === call.id);
            if (current_call) {
              call.status = current_call.status;
              call.remark = current_call.remark;
            }
          }
          return [...prev];
        }
        return prev;
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export const viewZohoPdfs = async (expert_id: number, expert_name: string, enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void,) => {

  setLoading(true);
  try {
    const response = await RequestServer(APIRoutes.ZohoExpertStatement, "POST", {
      expert_id,
      expert_name,
      from_date: '2023/01/01',
      to_date: LocalDayjs().format("YYYY/MM/DD")
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}

export const viewPaymentReceiptPdfs = async (
  call_id: number, 
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void,
  setPdfUrls:any
) => {
  setLoading(true);
  try {
    const response: ResponseZohoPaymentReceiptsTypes = await RequestServer(APIRoutes.ZohoPaymentReceipt + "?call_id=" + call_id, "GET");

    if (!response.data || response.data.length === 0) {
      enqueueSnackbar('No PDF data received', { variant: 'warning' });
      return;
    }

    const pdfUrls = response.data.map((pdf, index) => {
      try {
        if (!pdf.data) {
          console.error(`PDF data is empty for index ${index}`);
          return null;
        }

        const blob = base64toBlob(pdf.data, 'application/pdf');
        const url = window.URL.createObjectURL(blob);
        return { url, filename: pdf.filename };
      } catch (error) {
        console.error(`Error processing PDF at index ${index}:`, error);
        enqueueSnackbar(`Failed to process PDF ${index + 1}`, { variant: 'error' });
        return null;
      }
    }).filter(Boolean);
    setPdfUrls(pdfUrls);
    enqueueSnackbar('PDFs processed successfully', { variant: 'success' });
  } catch (err) {
    console.error('Error in viewPaymentReceiptPdfs:', err);
    enqueueSnackbar('Failed to fetch or process PDFs', { variant: 'error' });
  } finally {
    setLoading(false);
  }
};



export function getGstAmount(callObj: any) {
  try {
    // Safely access nested properties with optional chaining
    const isGst = callObj?.fk_expert_value?.primary_bank_value?.gstin;
    const currency = callObj?.selling_price_currency;
    const exchangeRate = callObj?.exchange_rate_payable;
    const minutes = callObj?.payable_mins;
    const charges = callObj?.selling_price;

    // Check for null, undefined, or falsy GST values
    if (!isGst) {
      return 'Non-Gst';
    }
    if (!currency || !minutes || !charges) {
      return 0;
    }
    const gstRate = 0.18;
    if (currency === 'INR') {
      return ((charges * minutes * gstRate)/60).toFixed(2);
    } else {
      if (!exchangeRate) {
        console.log('Exchange rate is required for non-INR currency');
        return 0
      }
      return ((charges * minutes * exchangeRate * gstRate)/60).toFixed(2);
    }
  } catch (error) {
    console.error('Error calculating GST amount:', error);
    return 0;
  }
}


export const getCallTableData = (apiData: any): any => {
  return apiData?.map((call: any) => {
    const startTime = LocalDayjs(call?.scheduled_start_time);

    return {
      id: call?.id,
      call: call,
      call_date: startTime.format("DD MMMM YYYY HH:mm"),
      expert_name: call?.fk_expert_value?.name || "",
      expert_id: call?.fk_expert_value?.id || "",
      client_name: call?.fk_client_value?.name || "",
      project_name: call?.fk_project_value?.topic || "",
      project_id: call?.fk_project_value?.id || "",
      call_status: call?.call_status,
      status: call?.status,
      call_medium: call?.call_medium,
      chargeable_mins: call?.chargeable_mins,
      payable_mins: call?.payable_mins,
      selling_price: `${call?.selling_price_currency} ${call?.selling_price}`,
      exchange_rate_chargeable: call?.exchange_rate_chargeable,
      exchange_rate_payable: call?.exchange_rate_payable,
      cost_price: `${call?.cost_price_currency} ${call?.cost_price}`,
      account_manager: call?.account_manager,
      research_analyst: call?.research_analyst,
      zoom_meeting_id: call?.zoom_meeting_id,
      cost_price_currency: call?.cost_price_currency,
      selling_price_currency: call?.selling_price_currency,
      expert_bank: call?.fk_expert_value?.primary_bank || null,
      fk_pe: call?.fk_expert_value?.no_pe_certificate || null,
      bank_location: call?.fk_expert_value?.primary_bank_value?.bank_country_code,
      exper_primary_bank: call?.fk_expert_value?.primary_bank_value?.id,
      revenueINR: ~~call?.revenue_in_inr,
      revenueUSD: ~~call?.revenue_in_usd,
      gst_amout: (~~(getGstAmount(call))),
      remark: call?.remark,
      financeRemark: (call?.review_remarks
        ? `${call?.review_remarks || ''} - ${call.reviewed_by.name} on ${LocalDayjs(call.reviewed_on).format("DD MMMM YYYY")}`
        : ''),
      "15ca": (call?.declaration_date && LocalDayjs(call?.declaration_date)?.format("DD MMMM YYYY")),
      casecode: call?.casecode,
      client_contact: call?.client_contact,
      payment_date: call?.transaction_meta?.payments?.map((payment: any) => 
      dayjs(payment?.payment_date).format('DD MMMM YYYY'))?.join(', ') || (call?.meta?.payment_date && dayjs(call?.meta?.payment_date).format('DD MMMM YYYY')) || null,
    };
  });
};

export const tableInitialState = {
  columnVisibility: {},
  columnOrder: ['id', 'call_date', 'expert_name', 'expert_id', 'account_manager', 'research_analyst', 'client_name', 'casecode', 'client_contact',
     'selling_price', 'cost_price', 'chargeable_mins', 'payable_mins', 'exchange_rate_chargeable', 'exchange_rate_payable', 
     'project_id', 'call_status', 'status', 'call_medium', 'expert_bank', 'fk_pe', 'bank_location', 'gst_amout', 'remark','financeRemark','chargeableAmount', 
     'revenueINR', 'revenueUSD','payableAmount','payableAmountINR','status','15ca','payment_date','action'],
  columnPinning: { left: [], right: ['action'] },
};

export const getCallTableInitialState = () => {
  try {
    const userSettings = JSON.parse(localStorage.getItem('user_settings') || '[]');
    const callSettingObj = userSettings?.find((settingObj:any) => settingObj.config_type === "CallTabDefaultColumns");
    return callSettingObj?.config_value || tableInitialState;
  } catch (error) {
    console.error('Error parsing user settings:', error);
    return tableInitialState;
  }
}