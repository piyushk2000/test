import {
  DomainValue,
  ProjectApiDataResponse,
  ceMappingItems,
  labelValue,
  peMappingItems,
  peMappingResponse,
  projectApiDataItem,
  projectDetailsDefaultValues,
  setDialogTypes,
  setProjectDetailsDefaultValues
} from "../../pages/Projects/types";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";
import { Dispatch, SetStateAction } from "react";
import { isClient } from "../../utils/role";
import { projectIdEncoder } from "../../utils/utils";
import { SetPeMappingBody, getPEMapping } from "./mapping/helper";
import { EnqueueSnackbar } from "notistack";
import { LocalDayjs } from "../../utils/timezoneService";

export type AllDomainsType = {
  success: boolean;
  message: string;
  data: DomainValue[];
};

export const formatLabelValue = (data: any): labelValue => {
  return {
    label: data.name,
    value: data.id,
  };
};

type dilogStates = {
  state: boolean;
  isChange: boolean;
};

export type editModalState = {
  edit: dilogStates;
  addAgenda: dilogStates;
  suggestExpert: dilogStates;
  reScheduleOrCancel: { state: boolean; expert_id: number | null };
};

export type setModalState = Dispatch<SetStateAction<editModalState>>;

type setBoolean = (b: boolean) => void;

export const handleDialogClose = (setAlertBox: setBoolean) => {
  setAlertBox(true);
};

export const handleSubmitClose = (setModalOpen: setModalState) => {
  setModalOpen((prev: editModalState) => ({
    edit: {
      state: false,
      isChange: false,
    },
    addAgenda: {
      state: false,
      isChange: false,
    },
    suggestExpert: {
      state: false,
      isChange: false,
    },
    reScheduleOrCancel: { state: false, expert_id: null },
  }));
};

export const handleDialogOpen = (setModalOpen: setModalState) => {
  setModalOpen((prev) => ({
    ...prev,
    edit: {
      state: true,
      isChange: false,
    },
  }));
};

export const handleAddAgendaOpen = (setModalOpen: setModalState) => {
  setModalOpen((prev) => ({
    ...prev,
    addAgenda: {
      state: true,
      isChange: false,
    },
  }));
};

export const handleRescheduleOpen = (
  setModalOpen: setModalState,
  expert_id: number
) => {
  setModalOpen((prev) => ({
    ...prev,
    reScheduleOrCancel: { state: true, expert_id },
  }));
};

export const handleAlertBoxClose = (setAlertBox: setBoolean) => {
  setAlertBox(false);
};

export const handleAlertBoxYesClick = (
  setAlertBox: setBoolean,
  setModalOpen: setModalState
) => {
  setAlertBox(false);
  handleSubmitClose(setModalOpen);
};

export const handleFormChangeProject = (setModalOpen: setModalState) => {
  setModalOpen((prev: editModalState) => {
    if (!prev.edit.isChange) {
      prev.edit.isChange = true;
    }

    return prev;
  });
};


export const getprojectDetails = async (
  setLoading: setBoolean,
  setDefaultValues: any,
  id: string | null,
  isCEPEMappingNeeded: boolean
) => {
  if (!id) {
    return;
  }

  try {
    setLoading(true);
    const response: ProjectApiDataResponse = await RequestServer(
      `${APIRoutes.projects}?id=${id}&embed=YES`,
      "get"
    );
    const projectData: projectApiDataItem | null = response.data[0];

    if (isCEPEMappingNeeded) {
      const ce_mapping = !isClient() ? await getCEMappingValues(id) : null;

      let pe_mapping: peMappingItems[] | null | undefined = null
      if (isClient()) {
        pe_mapping = projectData ? await getPEMappingValues(id) : null;
      } else {
        pe_mapping = await getPEMappingValues(id)
      }


      setDefaultValues(() => ({
        ce_mapping,
        projectDetails: projectData,
        pe_mapping,
      }));
    } else {
      setDefaultValues((prevDefaultValues: projectDetailsDefaultValues) => ({
        ...prevDefaultValues,
        projectDetails: projectData,
      }));
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const getCEMappingValues = async (
  id: string
): Promise<ceMappingItems | undefined> => {
  try {
    const response: ceMappingItems = await RequestServer(
      `${APIRoutes.getExpert}?fk_project=${id}&show_columns=status,id,name,meta`,
      "get"
    );

    if (response.success) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPEMappingValues = async (
  id: string
): Promise<peMappingItems[] | undefined> => {
  try {
    const response: peMappingResponse = await RequestServer(
      APIRoutes.peMapping + "?fk_project=" +
      id +
"&show_columns=id,fk_expert,agenda_shared_on,expert_invitation,expert_name,state,agenda_responses,calls_completed,calls_scheduled,meta,relevant_company,relevant_designation,relevant_division",
      "GET"
    );

    if (response.success) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAPIData = async (
  apiData: ProjectApiDataResponse | null,
  id: string | null,
  setDefaultValues: setProjectDetailsDefaultValues,
  setLoading: setBoolean
) => {
  setDefaultValues({
    projectDetails: null,
    ce_mapping: null,
    pe_mapping: null,
  });
  setLoading(true);
  if (apiData && id) {
    const current_project: projectApiDataItem | null =
      apiData.data.find(
        (data: projectApiDataItem) => data.id === parseInt(id)
      ) || null;

    const ce_mapping = !isClient() ? await getCEMappingValues(id) : null;

    const pe_mapping = await getPEMappingValues(id);

    setDefaultValues({
      ce_mapping,
      projectDetails: current_project,
      pe_mapping,
    });
    setLoading(false);
  } else if (id) {
    getprojectDetails(setLoading, setDefaultValues, id, true);
  }
};


export const getAPIDataStagedExperts = async (
  id: string | null,
  setLoading: setBoolean,
  setStagedExperts: any,
) => {

  try {
    setLoading(true);
    const response: any = await RequestServer(
      `${APIRoutes.STAGING_EXPERTS}?fk_project=${id}&status=Staged&embed=YES`,
      "get"
    );
      if(response&&response.data&&response.data.length>0){
        setStagedExperts([...response.data||[]])
      }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};


export const getAPIDataStagedExpertsInitial = async (
  id: string | null,
  setStagedExperts: any,
) => {

  try {
    const response: any = await RequestServer(
      `${APIRoutes.STAGING_EXPERTS}?fk_project=${id}&status=Staged&embed=YES`,
      "get"
    );
      if(response&&response.data&&response.data.length>0){
        setStagedExperts([...response.data||[]])
      }
  } catch (err) {
    console.log(err);
  }
};

export const refetchPeMappingValues = async (
  project_id: string,
  setDefaultValues: setProjectDetailsDefaultValues,
  setBody: SetPeMappingBody,
  setDialog: setDialogTypes
): Promise<void> => {
  try {
    const pe_mapping = await getPEMappingValues(project_id);

    setDefaultValues((prev) => ({
      ...prev,
      pe_mapping,
    }));

    setDialog((prev) => ({
      ...prev,
      addPE: { ...prev.addPE, isProjectDetails: false },
    }));

    setBody(getPEMapping(pe_mapping || []).allItems);
  } catch (err) {
    console.log(err);
  }
};


export function getTATProfileSharedFormat(totalHours: string ,isInternational?:boolean) {
  const colorWhite = {color: "black",bg: "white"};

  const colorRed = {color: "white",bg: "red"};
  const colorYellow = {color: "black", bg: "yellow"};
  const colorGreen = {color: "black", bg: "#00FF01"};

  let TatHours = Number(totalHours)
  
  if(isInternational) {

    if(TatHours > 48) {
      return colorRed;
    } else if (TatHours > 36) {
      return colorYellow;
    } else {
      return colorGreen;
    }

  } 

  // Domestic
  if(TatHours > 8 ) {
    return colorRed;
  } else if (TatHours > 6) {
    return colorYellow;
  } else {
    return colorGreen;
  }
}