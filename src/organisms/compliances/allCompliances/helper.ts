import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { LocalDayjs } from "../../../utils/timezoneService";
import {
  apiDataState,
  booleanFn,
  complianceData,
  getAllComplianceAPI,
  setApiDataComplianceState,
  TableData,
} from "./types";


export function getMonth(backMonth: number) {
  const currentDate = LocalDayjs().startOf("month");

  const dateMonthsAgo = currentDate.subtract(backMonth, "month");

  return dateMonthsAgo.format("YYYY-MM-DD 00:00:00");
}

export function getMonthFirst(backMonth: Date) {
  const currentDate = LocalDayjs(backMonth);
  return currentDate.format("YYYY-MM-DD 00:00:00");
}

export function getMonthLast(backMonth: Date) {
  const currentDate = LocalDayjs(backMonth);
  return currentDate.format("YYYY-MM-DD 23:59:59");
}


export const getComplianceData = async (
  clientId: string | null,
  setData: setApiDataComplianceState,
  month_count: number
) => {
  if (!clientId) {
    return;
  }

  setData((prev) => ({ ...prev, api: null }));

  try {
    let url = `${APIRoutes.EXPERT_COMPLIANCE}?fk_client=` + clientId;
    url += "&greaterthanequalto___created_at=" + getMonth(month_count);

    const response: getAllComplianceAPI = await RequestServer(url, "GET");

    if (response.success) {
      setData((prev: apiDataState) => {
        if (prev.filter.isFilterChange) {
          prev.filter.isFilterChange = false;
        }

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


export const getComplianceDataBymonth = async (
  clientId: string | null,
  setData: setApiDataComplianceState,
  startMonth: Date,
  endMonth: Date
) => {
  if (!clientId) {
    return;
  }

  try {
    let url = `${APIRoutes.EXPERT_COMPLIANCE}?fk_client=` + clientId;
    url += "&greaterthanequalto___created_at=" + getMonthFirst(startMonth);
    url += "&lessthanequalto___created_at=" + getMonthLast(endMonth);
    const response: getAllComplianceAPI = await RequestServer(url, "GET");

    if (response.success) {
      setData((prev: apiDataState) => {
        if (prev.filter.isFilterChange) {
          prev.filter.isFilterChange = false;
        }

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
  addCompliance: { state: boolean; isChange: boolean; id: string | null };
  editCompliance: { state: boolean; isChange: boolean; id: string | null, data: Partial<complianceData> | null };
  reviewCompliance: { state: boolean; isChange: boolean; id: string | null };
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


export const setFormChange = (
  setDialog: setDialogState,
  form: "addCompliance"|"reviewCompliance"
) => {
  if (form === "addCompliance") {
    setDialog((prev: dialogState) => {
      if (!prev.addCompliance.isChange) {
        return {
          ...prev,
          addCompliance: { ...prev.addCompliance, isChange: true },
        };
      }
      return prev;
    });
  }
};




export function formatDataClientTable(data: complianceData[] | null) {
  if (!data) return []


  let formattedData:TableData[] = data.map((item: complianceData, index: number) => {
    return {
      id: item.id || 0 + Math.random(),
      title: item.title,
      questions: item.questions,
      created_at: item.created_at||'',
      state: item.state,
      action: true,
      review: true
    }
  });
  return formattedData;
}

export const defaultDialogValues = {
  addCompliance: { state: false, isChange: false, id: null },
  editCompliance: { state: false, isChange: false, id: null, data: null },
  reviewCompliance: { state: false, isChange: false, id: null }
}

export const openEditDialog = (setDialog: setDialogState, fkClient: string | null, data: Partial<complianceData>) => {
  setDialog((prev: dialogState) => ({
    ...prev,
    editCompliance: { state: true, id: fkClient, isChange: false, data }
  }))
}

export const complianceStateOptions = [
  {label: "Active", value: "Active"},
  {label: "InActive", value: "InActive"}
]