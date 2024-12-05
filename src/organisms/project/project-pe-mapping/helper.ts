import { Dispatch, SetStateAction, createContext, useContext } from "react";
import {
  SelectedProjectApiResponse,
  AlertNBackdropOpen,
  CSCValues,
  PeMappingContextType,
  SetProjectPEMappingDataState,
  isDialogState,
  projectExpertGetApi,
  setAlertNBackdropOpen,
  setDialogState,
  GroupApiResponse,
  GetPeComplianceResponseAPI,
  ComplianceStartAfterType,
  ComplianceEndBeforeType,
  PeComplianceData,
  ExpertApiResponse,
  SelectExpert,
} from "./type";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { Data } from "./list-view/types";
import { EnqueueSnackbar } from "notistack";
import { LocalDayjs } from "../../../utils/timezoneService";
import { SelectedAction } from "../../../molecules/nav-bar-common/type";
import { PeMappingActions } from "../../../molecules/nav-bars/pe-mapping-page/navbarActions";
import { getParams } from "../../../utils/utils";
import { isSuperAdmin } from "../../../utils/role";

export const resetFilters = (setDialog: setDialogState) => {
  setDialog((prev) => ({
    ...prev,
    filter: {
      ...prev.filter,
      state: false,
      isChange: true,
      filterText: null,
      isFiltersApplied: false,
      searchText: null,
      status: [],
    },
  }));
};

export const selectAllowed = (action: SelectedAction, row: Data): boolean => {
  const actionName = action?.title;

  const status = row.status;
  const expert_invitation_status = row.expert_invitation;
  const is_complaince_done = row.is_complaince_shared;

  if (actionName === PeMappingActions.Invite) {
    return !expert_invitation_status;
  }

  if (actionName === PeMappingActions.ReInvite) {
    return expert_invitation_status === "Invited";
  }

  if (actionName === PeMappingActions.Shortlist_Reject) {
    return status === "Shared";
  }

  if (actionName === PeMappingActions.Bulk_Share) {
    if(isSuperAdmin()) {
      return true;
    }
    return status === "Added" || status === "Shared";
  }

  if(actionName === PeMappingActions.expert_details) {
    return status !== "Added" && status !== "Rejected"
  }

  if(actionName === PeMappingActions.bulkRevert) {
    return (status === "Shortlisted" || status === "Shared");
  }
  
  return false;
};

export const PeMappingContext = createContext<PeMappingContextType | null>(
  null
);

export const usePeMappingContext = () => {
  const context = useContext(PeMappingContext);

  if (!context) {
    throw new Error(
      "PE Mapping Context must be used within the context provider"
    );
  }
  return context;
};

export const getPeMappingData = async (
  project_id: string,
  setData: SetProjectPEMappingDataState,
  filters: isDialogState["filter"],
  setPeDialog: setDialogState,
  setLoading: Dispatch<SetStateAction<boolean>>,
  expert_id?: string | null,
  noActionTaken?: boolean
) => {
  setData(() => ({ peListData: null, peMappingData: null, projectData: null }));
  setLoading(true);
  try {
    let url =
      APIRoutes.peMapping +
      "?fk_project=" +
      project_id +
      "&show_columns=id,fk_expert,agenda_shared_on,agenda_responses,expert_invitation,expert_name,relevant_designation,relevant_company,relevant_company_location,state,meta,calls_scheduled,client_specific_compliance_requirement,csc_marked_completed_by,csc_marked_completed_on,compliance_shared,client_compliance_requirement,relevant_division,calls_completed";

    // Only show one Expert
    if (expert_id) {
      url += "&fk_expert=" + expert_id;
    }

    if (noActionTaken) {
      url +=
        "&state=Added&null___expert_invitation=1&null___agenda_status=1&compliance_shared=0";
    }

    // FILTERS ----------------------------------------------------------- /
    const { filterText, searchText: searchFilter, status } = filters;
    if (filterText) {
      url += filterText;
    }

    if (searchFilter) {
      url += "&search=" + searchFilter;
    }

    if (status.length) {
      url += "&in___state=" + status.join(",");
    } else {
      setData((prev) => ({
        ...prev,
        peMappingData: [],
        peListData: [],
      }));

      setPeDialog((prev) => {
        if (prev.filter.isChange) {
          prev.filter.isChange = false;
        }
        return prev;
      });
      return;
    }
    /* --------------------------------------------------------------------- */

    const response: projectExpertGetApi = await RequestServer(url, "get");
    const data = response.data;

    const expert_ids = data.map(d => d.fk_expert).join(",");

    const expertResponse: ExpertApiResponse = await RequestServer(
      APIRoutes.getExpert + "?show_columns=id,name,badge&in___id=" + expert_ids,"GET");

    const Projectresponse: SelectedProjectApiResponse = await RequestServer(
      APIRoutes.projects +
      "?show_columns=topic,id,applicable_agenda_id,account_manager,fk_group,client_id&id=" +
      project_id,
      "GET"
    );
    setData((prev) => ({
      ...prev,
      projectData: Projectresponse,
    }));

    const GroupResponse: GroupApiResponse = await RequestServer(APIRoutes.getGroup, "GET");
    const adminId = localStorage.getItem("id");

    const isGroupAdmin = GroupResponse.data.find((g) => g.id === Projectresponse.data[0].fk_group)?.sublabel.split(",").find(id => id === adminId);

    const isAgendaApplicable = Boolean(
      Projectresponse.data[0].applicable_agenda_id
    );

    const client_id = Projectresponse.data[0].client_id;

    const complianceResponse = await RequestServer(APIRoutes.EXPERT_COMPLIANCE + "?fk_client=" + client_id + "&notin___state=InActive", "GET");

    const isAccountManager = parseInt(adminId || "") === Projectresponse.data[0].account_manager

    const PeComplianceResponse: GetPeComplianceResponseAPI = await RequestServer(APIRoutes.PE_COMPLIANCE + "?fk_project=" + project_id + "&stakeholders=YES", "GET");

    const peComplianceData = PeComplianceResponse.data;
    const compliances_count: number = complianceResponse?.data?.length || 0;

    if (response.success) {
      const expertData = expertResponse.data;
      const project_status = getParams("status");

      const listData: Data[] = data.map((d) => {
        const pe_compliance = peComplianceData.find(p => p.fk_pe === d.id);
        const badge = expertData.find(e => e.id === d.fk_expert)?.badge || null;

        return {
          pe_id: d.id,
          name: d.expert_name,
          expert_id: d.fk_expert,
          badge,
          curr_designation: d.relevant_designation,
          curr_company: d.relevant_company,
          curr_company_location: d.relevant_company_location,
          curr_company_division: d.relevant_division,
          status: d.state,
          expert_invitation: d.expert_invitation,
          meta: d.meta,
          Action:
            project_status === "Closed"
              ? []
              : getActions(
                d.state,
                d.expert_invitation,
                d.meta?.project_invitation_link || null,
                d.calls_scheduled,
                !!d.compliance_shared,
                !!d.agenda_shared_on,
                !!d.agenda_responses,
                isAgendaApplicable,
                d.client_compliance_requirement,
                compliances_count,
                !!d.csc_marked_completed_by,
                pe_compliance || null
              ),
          agenda_shared: Boolean(d.agenda_shared_on),
          is_agenda_respond: Boolean(d.agenda_responses),
          project_invitation_link: d.meta?.project_invitation_link || null,
          is_account_manager: isAccountManager,
          is_group_admin: !!isGroupAdmin,
          is_complaince_shared: Boolean(d.csc_marked_completed_by),
          csc_marked_completed_by_name:
            d.meta?.csc_marked_completed_by_name || null,
          csc_marked_completed_on: d?.csc_marked_completed_on
            ? LocalDayjs(d.csc_marked_completed_on).format("DD MMM YYYY")
            : null,
          client_id,
          answers: pe_compliance?.answers || null,
          compliance_shared: !!d.compliance_shared,
          pe_compliance: pe_compliance || null,
          calls_completed: d.calls_completed,
          calls_scheduled: d.calls_scheduled
        }
      });

      setData((prev) => ({
        ...prev,
        peMappingData: data,
        peListData: listData,
        projectData: Projectresponse,
      }));

      setPeDialog((prev) => {
        if (prev.filter.isChange) {
          prev.filter.isChange = false;
        }
        return prev;
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const getActions = (
  status: string,
  expert_invitation: string | null,
  project_invitation_link: string | null,
  calls_scheduled: number | null,
  compliance_shared: boolean,
  is_agenda_shared: boolean,
  is_agenda_completed: boolean,
  is_agenda_applicable: boolean,
  client_compliance_requirement: string,
  compliances_count: number,
  is_compliance_done: boolean,
  pe_compliance: PeComplianceData | null
): string[] => {
  const actions: string[] = [];

  const [compliance_start_after, compliance_end_before]: [ComplianceStartAfterType, ComplianceEndBeforeType] = client_compliance_requirement.split(" | ") as [ComplianceStartAfterType, ComplianceEndBeforeType];

  const show_compliance_conditions = compliances_count !== 0 && !is_compliance_done && compliance_start_after !== "Not Required";
  const show_reshare_cc = (pe_compliance?.status === "SharedWithExpert" && compliance_shared && compliances_count !== 0) || (isSuperAdmin() && pe_compliance?.status === "Answered" && compliances_count !== 0)

  switch (status) {
    case "Added": {
      actions.push("Share Profile");
      break;
    }

    case "Shared": {


      if (show_compliance_conditions && compliance_start_after === "Shared") {
        if (!compliance_shared) {
          actions.push("Share CC");
        }

        if(show_reshare_cc) {
          actions.push("ReShare CC");
        }

        // compliance is not done and compliance_end_before are either Scheduled or Completed
        if (compliance_end_before !== "Shortlisted") {
          actions.push("Shortlist");
        }

      } else {
        actions.push("Shortlist");
      }

      actions.push("Reshare Profile");
      break;
    }

    case "Shortlisted": {

      if (show_compliance_conditions &&
        (compliance_start_after === "Shared" || compliance_start_after === "Shortlisted")
      ) {
        if (!compliance_shared) {
          actions.push("Share CC");
        }

        if(show_reshare_cc) {
          actions.push("ReShare CC");
        }

        if (compliance_end_before === "Completed") {
          actions.push("Schedule Call");
        }

      } else {
        actions.push("Schedule Call");
      }
      break;
    }

    case "Scheduled": {


      if (show_compliance_conditions) {
        if (!compliance_shared) {
          actions.push("Share CC");
        }

        if(show_reshare_cc) {
          actions.push("ReShare CC");
        }
      } else {
        actions.push("Schedule Call");
      }
      break;
    }

    case "Completed": {
      actions.push("Schedule Call");
      break;
    }

    case "Rejected": {
      if((pe_compliance?.status === "Rejected" || pe_compliance?.status === "Auto-Rejected") ? isSuperAdmin() : true)
      actions.push("Revert Reject");
    }
  }

  switch (expert_invitation) {
    case "Invited": {
      actions.push("ReInvite");
      break;
    }
    case "Accepted": {
      break;
    }
    case "Declined": {
      actions.push("ReInvite");
      break;
    }
    case null: {
      actions.push("Invite");
      break;
    }
  }

  if (
    project_invitation_link &&
    expert_invitation !== "Accepted" &&
    expert_invitation !== "Declined"
  ) {
    actions.push("Copy Invitation link");
  }

  // Adding Share Agenda Action if agenda is not completed
  if (!is_agenda_completed && is_agenda_applicable) {
    actions.push("Share Agenda");
  }

  if (calls_scheduled && calls_scheduled > 0 && !show_compliance_conditions && status !== "Rejected") {
    // If the Expert Invitatation is accepted + if agenda is shared , agenda must be completed
    if (expert_invitation === "Accepted") {
      if ((is_agenda_shared && is_agenda_completed) || !is_agenda_shared) {
        actions.push("Log Call");
      }
    }
  }

  if (pe_compliance?.status === "Answered") {
    actions.push("Share CC Responses");
  }

  if(pe_compliance?.status === "SharedWithClient") {
    actions.push("ReShare CC Responses")
  }

  return actions;
};

export const handleClose = (
  setAlertNBackdrop: setAlertNBackdropOpen,
  setDialog: setDialogState,
  isChange: boolean
) => {
  return !isChange
    ? handleSubmitClose(setDialog)
    : setAlertNBackdrop((prev: AlertNBackdropOpen) => ({
      ...prev,
      openAlertBox: true,
    }));
};

export const ActionsDefaultValue: isDialogState["actions"] = {
  bulkRevert: {
    state: false,
  },
  shareProfile: {
    state: false,
    isChange: false,
    expert_id: null,
    pe_id: null,
    company: null,
    designation: null,
    location: null,
    is_agenda_respond: false,
    email_format: false,
    snippet: null,
    meta: {},
    charges: null
  },
  ShareComplianceWithExpert: {
    state: false,
    client_id: null,
    pe_id: null,
  },
  ShareComplianceWithClient: {
    state: false,
    client_id: null,
    email_format: false,
    pe_compliance: null,
    snippet: null,
    expert_id: null,
    meta: {},
    company: null,
    designation: null
  },
  reviewCompliance: {
    state: false,
    pe_compliance: null,
    snippet: null,
    expert_id: null,
    meta: {},
    company: null,
    designation: null
  },
  revertReject: {
    state: false,
    pe_id: null,
  },
  shortlist: {
    state: false,
    isChange: false,
    pe_id: null,
    expert: null,
    is_multiple: false,
  },
  scheduleCall: {
    state: false,
    isChange: false,
    pe_id: null,
    project_id: null,
    expert_name: null,
  },
  inviteExpert: {
    state: false,
    pe_id: null,
    project_id: null,
    isReInvite: false,
    isMultiple: false,
  },
  shareProfileExperts: {
    state: false,
    pe_id: null,
    project_id: null,
    isChange: false,
    email_format: false,
    reaarange_expert: false,
    experts: []
  },
  pendingCompliance: {
    state: false,
    pe_id: null,
    is_multiple: false,
  },
  shareAgenda: {
    pe_id: null,
    state: false,
  },
  showAnswers: {
    state: false,
    answers: null
  },
  showComplianceQuestions: {
    state: false,
    pe_compliance: null
  }
};

export const handleSubmitClose = (setDialog: setDialogState) => {
  setDialog((prev) => ({
    actions: ActionsDefaultValue,
    filter: {
      ...prev.filter,
      state: false,
    },
    iconDefine: {
      isOpen: false,
    },
  }));
};

export const handleAlertBoxClose = (
  setAlertNBackdrop: setAlertNBackdropOpen
) => {
  setAlertNBackdrop((prev: AlertNBackdropOpen) => ({
    ...prev,
    openAlertBox: false,
  }));
};

export const handleAlertBoxYesClick = (
  setAlertNBackdrop: setAlertNBackdropOpen,
  setDialog: setDialogState
) => {
  handleAlertBoxClose(setAlertNBackdrop);
  handleSubmitClose(setDialog);
};

export const handleFormChange = (
  setPeDialog: setDialogState,
  form: "filter" | "shareProfile" | "shareProfileExperts",
  isAction?: boolean
) => {
  if (form === "filter") {
    setPeDialog((prev) => {
      if (!prev[form].isChange) {
        prev.filter.isChange = true;
      }

      return prev;
    });
  } else if (isAction) {
    setPeDialog((prev) => {
      if (!prev.actions[form].isChange) {
        prev.actions[form].isChange = true;
      }

      return prev;
    });
  }
};

export async function bulkRevertHandler(
  select: SelectExpert,
  enqueueSnackbar: EnqueueSnackbar,
  setPeDialog: setDialogState,
  setLoading: (l: boolean) => void,
  refetch: () => Promise<void>
) { 
  const selectedCards = select.selectedCards;
  if (selectedCards.length === 0) {
    return;
  }

  setLoading(true);
  try {
    const payload = {
      action: "BulkRevert",
      ids: selectedCards.map(c => c.pe_id).join(","),
    };

    const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      handleSubmitClose(setPeDialog);
      await refetch();
    } else {
      console.log({ response });
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}

export async function shareAgendaHandler(
  pe_id: number | null,
  enqueueSnackbar: EnqueueSnackbar,
  setPeDialog: setDialogState,
  setAlertNBackdrop: Dispatch<SetStateAction<AlertNBackdropOpen>>,
  refetch: () => Promise<void>
) {
  if (!pe_id) {
    return;
  }

  try {
    const payload = {
      action: "ShareAgenda",
      id: pe_id,
    };

    setAlertNBackdrop((prev) => ({ ...prev, isBackdrop: true }));

    const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);


    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      handleSubmitClose(setPeDialog);
      await refetch();
    } else {
      console.log({ response });
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setAlertNBackdrop((prev) => ({ ...prev, isBackdrop: false }));
  }
}


export const getCCTitle = (pe_compliance: PeComplianceData | null): string => {
  if (!pe_compliance) {
    return "";
  }

  const { status } = pe_compliance;

  const final_reviewed_by_value = pe_compliance.final_reviewed_by_value;


  if(status === "SharedWithClient") {
    return "On-Hold"
  }

  if(status === "Rejected") {
    if(final_reviewed_by_value?.role === "CUSTOMER") {
      return "Rejected - Client Compliance Team"
    } else {
      return "Rejected by Infollion"
    }
  }

  if(status === "Auto-Rejected") {
    return "Auto Rejected"
  }

  if(status === "Approved") {
    if(final_reviewed_by_value?.role === "CUSTOMER") {
      return "Approved - Client Compliance Team"
    } else {
      return "Approved by Infollion"
    }
  }

  return ""

}