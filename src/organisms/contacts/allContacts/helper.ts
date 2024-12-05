import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import {
  apiDataState,
  booleanFn,
  contactData,
  getAllContactsAPI,
  setApiDataContactState,
  TableData,
} from "./types";
import { addContactDefaultValues, defaultValues } from "../../client/all-clients/add-contact-form/helper";
import { getIsdValue } from "../../../utils/utils";

export const getAllContacts = async (
  setData: setApiDataContactState,
  filters: apiDataState["filter"],
  fkClient?: string | null,
  contact_ids?: string | null
) => {
  setData((prev) => ({ ...prev, api: null }));

  let url = APIRoutes.clientContactUrl + "?stats=1"
  let filterAdded: boolean = false;
  /*FILTERS ---------------------------------------- */
  const { calender, sort_by, id, name, email } = filters;

  // sort_by
  url += "&sort_by=" + sort_by;

  // calender
  if (calender) {
    url += calender;
    filterAdded = true;
  }

  // Client Filter
  if (fkClient) {
    url += "&fkClient=" + fkClient;
  }

  // Contact Filter
  if (contact_ids) {
    url += "&in___id=" + contact_ids;
  }

  // Name Filter
  if (name) {
    url += "&like___name=" + name;
  }

  // Email Filter
  if (email) {
    url += "&like___email=" + email;
  }

  // Id Filter
  if (id) {
    url += "&equalto___id=" + id;
  }
  /*------------------------------------------------ */

  try {
    const response: getAllContactsAPI = await RequestServer(url, "GET");

    if (response.success) {
      setData((prev: apiDataState) => {
        if (prev.filter.isFilterChange) {
          prev.filter.isFilterChange = false;
        }

        prev.isFilter = filterAdded ? true : false;

        return {
          ...prev,
          api: response,
        };
      });
    }
  } catch (err) {
    console.log(err);
  }
};


export const handleClose = (
  setAlertBox: booleanFn,
  isChange: boolean,
  handleSubmitClose: () => void
) => {
  return isChange ? setAlertBox(true) : handleSubmitClose();
};


export type dialogState = {
  addContact: { state: boolean; isChange: boolean; id: string | null }
  editContact: { state: boolean; isChange: boolean; id: string | null, contact_id: number | null };
}

export type setDialogState = Dispatch<SetStateAction<dialogState>>;

export const handleAlertBoxClose = (setAlertBox: booleanFn) => {
  setAlertBox(false);
};

export const handleAlertBoxYesClick = (
  setAlertBox: booleanFn,
  handleSubmitClose: () => void
) => {
  setAlertBox(false);
  handleSubmitClose();
};

export const defaultDialogState: dialogState = {
  addContact: { state: false, isChange: false, id: null },
  editContact: { state: false, isChange: false, id: null, contact_id: null }
}


export const setFormChange = (
  setDialog: setDialogState,
  form: "addContact" | "editContact"
) => {
  if (form === "addContact") {
    setDialog((prev: dialogState) => {
      if (!prev.addContact.isChange) {
        return {
          ...prev,
          addContact: { ...prev.addContact, isChange: true },
        };
      }
      return prev;
    });
  } else if (form === "editContact") {
    setDialog((prev: dialogState) => {
      if (!prev.addContact.isChange) {
        return {
          ...prev,
          editContact: { ...prev.editContact, isChange: true },
        };
      }
      return prev;
    });
  }
};


export const dataRangeFilter = (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
  setData: setApiDataContactState
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

  if (dateUrl) {
    setData((prev: apiDataState) => ({
      ...prev,
      filter: { ...prev.filter, calender: dateUrl, isFilterChange: true },
    }));
  }
};


export function formatDataClientTable(data: contactData[] | null) {
  if (!data) return []


  let formattedData: TableData[] = data.map((item: contactData, index: number) => {
    return {
      id: item.user_id || 0 + Math.random(),
      avatar: "",
      name: item.name,
      designation: item.designation,
      company: "",
      mobile: item.mobile,
      email: item.email,
      action: true,
      is_compliance_officer: item.is_compliance_officer,
      total_projects: item.total_projects,
      serviced_projects: item.serviced_projects,
      calls_taken: item.calls_taken,
      revenue_done: item.revenue_done
    }
  });
  return formattedData;
}

export const editContactDefaultValues = (data: apiDataState, id: number | null) => {
  if (id) {
    const contact_details = data.api?.data.find(contact => contact.id === id);

    const mobileLength = contact_details?.mobile.split(" ").length;

    let isd_code = null, mobile = null;
    if (contact_details?.mobile.split(" ")[1]) {
      isd_code = contact_details?.mobile.split(" ")[0];
      mobile = contact_details?.mobile.split(" ")[1];
    } else {
      mobile = contact_details?.mobile;
    }


    if (contact_details) {
      const addContactDefault: addContactDefaultValues = {
        salutation: { label: contact_details.salutation, value: contact_details.salutation },
        name: contact_details.name,
        email: contact_details.email,
        isd_code: isd_code ? getIsdValue(isd_code) : null,
        mobile: mobile || "",
        designation: contact_details.designation,
        fkClient: { label: contact_details.fkClient.toString(), value: contact_details.fkClient.toString() },
        is_compliance_officer: contact_details.is_compliance_officer
      };

      return addContactDefault;
    }
  }

  return defaultValues
}

export const linkTableStyle: React.CSSProperties = {
  color: "var(--primary-color)",
  textDecoration: "underline"
}