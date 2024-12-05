import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { getCallProjectCounts } from "../expert-cards/helper";

export type dialogState = {
  uploadImage: boolean;
  deleteImage: boolean;
  showImage: boolean;
  addPE: { state: boolean; isChange: boolean };
  timelineFilters: { state: boolean };
};

type setDialogState = Dispatch<SetStateAction<dialogState>>;

export type alertNBackdropOpen = {
  alert: boolean;
  backdrop: boolean;
};

type setAlertNBackdrop = Dispatch<SetStateAction<alertNBackdropOpen>>;

export type ElementsDataType = {
  attachment: any;
  timeline: {
    data: any;
    messages: any;
    filters: {
      actor: any;
      action: string | null;
      date: string | null;
      isFilterChange: boolean;
      filterAdded: boolean;
    };
  };
};

export type SetElementsDataType = Dispatch<SetStateAction<ElementsDataType>>;

export const expertProfileSectionStyle = (showElements: any) => {
  let width = "100%";

  if (
    showElements.showAttachment ||
    showElements.showTimeline ||
    showElements.showBankDetails
  ) {
    width = "100%";
  }

  return {
    width,
  };
};

export const toggleAttachmentSection = (setShowElements: any) => {
  setShowElements((prevValue: any) => ({
    showTimeline: false,
    showBankDetails: false,
    showAttachment: !prevValue.showAttachment,
  }));
};

export const toggleTimelineSection = (setShowElements: any) => {
  setShowElements((prevValue: any) => ({
    showTimeline: !prevValue.showTimeline,
    showBankDetails: false,
    showAttachment: false,
  }));
};

export const toggleBankDetailsSection = (setShowElements: any) => {
  setShowElements((prevValue: any) => ({
    showTimeline: false,
    showBankDetails: !prevValue.showBankDetails,
    showAttachment: false,
  }));
};

export const openAddPEForm = (setOpenDialog: setDialogState) => {
  setOpenDialog((prev: dialogState) => ({
    ...prev,
    addPE: { state: true, isChange: false },
  }));
};

export const handleClose = (
  isChange: boolean,
  setAlertNBackdrop: setAlertNBackdrop,
  setOpenDialog: setDialogState
) => {
  isChange
    ? handleAlertBoxOpen(setAlertNBackdrop)
    : handleSubmitClose(setOpenDialog);
};

export const handleAlertBoxOpen = (setAlertNBackdrop: setAlertNBackdrop) => {
  setAlertNBackdrop((prev: alertNBackdropOpen) => ({ ...prev, alert: true }));
};

export const handleAlertBoxClose = (setAlertNBackdrop: setAlertNBackdrop) => {
  setAlertNBackdrop((prev: alertNBackdropOpen) => ({ ...prev, alert: false }));
};

export const handleSubmitClose = (setOpenDialog: setDialogState) => {
  setOpenDialog(() => ({
    uploadImage: false,
    showImage: false,
    deleteImage: false,
    addPE: { state: false, isChange: false },
    timelineFilters: { state: false },
  }));
};

export const handleAlertBoxYesClick = (
  setAlertNBackdrop: setAlertNBackdrop,
  setOpenDialog: setDialogState
) => {
  handleAlertBoxClose(setAlertNBackdrop);
  handleSubmitClose(setOpenDialog);
};

export const getAllProfileDetails = async (
  id: any,
  setApiData: any,
  configs?: {
    disableShowRefree?: boolean;
    secretCode?: string | null;
  },
  e?: string | null
) => {
  try {
    setApiData(null);

    if (!e && !id) {
      return;
    }

    const getId = id ? `?id=${id}` : e ? `?e=${e}` : "";
    const url = `${APIRoutes.getExpert}${getId}&embed=YES&stakeholders=YES` +
        (configs?.secretCode ? `&code=${configs?.secretCode}` : "")

    const response = await RequestServer(
      url,
      "get"
    );

    if (response.success) {
      const referee_id = response.data[0]?.referred_by || null;
      if (!configs?.disableShowRefree && referee_id) {
        const responseRefereeName = await RequestServer(
          `${APIRoutes.getExpert}?id=${referee_id}&show_columns=name`,
          "get"
        );

        if (responseRefereeName && responseRefereeName?.data[0]?.name) {
          response.data[0].referee_name = responseRefereeName.data[0].name;
        }
      }

      // removing status="Deleted" Work experience
      if (response.data[0].work_experiences.length !== 0) {
        const workEx = response.data[0].work_experiences.filter(
          (work: any) => work.status !== "Deleted"
        );
        response.data[0].work_experiences = workEx;
      }

      response.data = await getCallProjectCounts(response.data);

      setApiData(response.data[0]);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getReferralCode = (id: string) => {
  return parseInt(id).toString(16).toUpperCase();
};

export const getTimeline = async (
  id: string,
  date: string | null,
  action: string | null,
  actor: string | null
) => {
  let url = `${APIRoutes.getTimeline}experts&cardId=${id}`;

  /* FILTERS -------------------------------------- */

  if (action) {
    url += "&action=" + action;
  }

  if (actor) {
    url += "&actor=" + actor;
  }

  if (date) {
    url += date;
  }

  /* ---------------------------------------------- */

  try {
    const responseTimeline = await RequestServer(url, "get");

    if (responseTimeline.success) {
      return {
        data: responseTimeline.data,
        messages: null,
      };
    } else {
      return {
        data: null,
        messages: null,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      data: null,
      messages: null,
    };
  }
};

export async function getTimelineFn(
  id: string,
  setElementsData: SetElementsDataType,
  filters: ElementsDataType["timeline"]["filters"]
) {
  setElementsData((prev: ElementsDataType) => ({
    ...prev,
    timeline: {
      ...prev.timeline,
      data: null,
    },
  }));
  const { date, action, actor } = filters;
  const { data, messages } = await getTimeline(id, date, action, actor);
  setElementsData((prev) => {
    // If filter is applied
    if (prev.timeline.filters.isFilterChange) {
      prev.timeline.filters.isFilterChange = false;
    }

    return {
      ...prev,
      timeline: {
        ...prev.timeline,
        data,
        messages,
      },
    };
  });
}

export const eraseTimelineData = (setElementsData: SetElementsDataType) => {
  setElementsData((prev) => ({
    ...prev,
    timeline: {
      data: null,
      messages: null,
      filters: {
        date: null,
        action: null,
        actor: null,
        isFilterChange: false,
        filterAdded: false,
      },
    },
  }));
};
