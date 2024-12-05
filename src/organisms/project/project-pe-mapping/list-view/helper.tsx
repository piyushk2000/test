import { createTheme } from "@mui/material/styles";
import { Data, HeadCell, Order } from "./types";
import { Dispatch, SetStateAction } from "react";
import { SelectExpert, SelectedCards, SetSelectExpert, setDialogState, PeComplianceAnswer, PeComplianceData } from "../type";
import { setDialogTypes } from "../../../../pages/Projects/types";
import { handleCopy } from "../../../../molecules/expert-profile-sections/profile-section/helper";
import { EnqueueSnackbar } from "notistack";
import { selectAllowed } from "../helper";
import { SelectedAction } from "../../../../molecules/nav-bar-common/type";
import { NumberQuestion } from "../../../compliances/autoAprovalDialog/types";
import { isAdmin } from "../../../../utils/role";

const showReAnswerBtn = (pe_compliance: PeComplianceData | null) => {
  if (!pe_compliance) {
    return null;
  }

  if (pe_compliance.status === "Auto-Approved" && isAdmin()) {
    return null;
  }

  if (pe_compliance.status !== "Auto-Approved" && pe_compliance.status !== "Answered") {
    return null;
  }

  return {
    unique_code: pe_compliance.unique_code
  }
}

export const openActions = async (
  action: string,
  setPeDialog: setDialogState,
  setDialog: setDialogTypes,
  project_id: string,
  row: Data,
  refetch: () => Promise<void>,
  enqueueSnackbar: EnqueueSnackbar,
  isMultiple?: boolean,
  answers?: NumberQuestion[]
) => {

  if (action === "Share Profile") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        shareProfile: {
          state: true,
          isChange: false,
          pe_id: row.pe_id,
          expert_id: row.expert_id,
          company: row.curr_company,
          designation: row.curr_designation,
          location: row.curr_company_location,
          is_agenda_respond: row.is_agenda_respond,
          email_format: false,
          snippet: null,
          meta: {},
          charges: null
        },
      },
    }));
  } else if (action === "Log Call") {
    setDialog((prev) => ({
      ...prev,
      logCall: {
        ...prev.logCall,
        state: true,
        project_id: parseInt(project_id),
        refetch: refetch || null,
        expert_id: String(row.expert_id),
        pe_id: String(row.pe_id),
        is_account_manager: row.is_account_manager,
        is_group_admin: row.is_group_admin
      },
    }));
  } else if (action === "Shortlist") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        shortlist: {
          state: true,
          pe_id: row.pe_id,
          isChange: false,
          expert: {
            name: row.name,
            company: row.curr_company,
            designation: row.curr_designation,
          },
          is_multiple: false
        },
      },
    }));
  }
  else if (action === "Schedule Call") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        scheduleCall: {
          state: true,
          pe_id: row.pe_id,
          isChange: false,
          project_id: project_id,
          expert_name: row.name
        },
      },
    }));
  } else if (action === "Invite" || action === "ReInvite") {
    const isReInvite = action === "ReInvite";
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        inviteExpert: {
          state: true,
          pe_id: row.pe_id?.toString() || null,
          project_id: project_id,
          isReInvite,
          isMultiple: !!isMultiple
        }
      }
    }))
  } else if (action === "Revert Reject") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        revertReject: {
          state: true,
          pe_id: row.pe_id,
          is_auto_rejected: row.pe_compliance?.status === "Auto-Rejected" ? true : false,
          show_compliance_status: (row.pe_compliance?.status === "Auto-Rejected" || row.pe_compliance?.status === "Rejected") ? true : false
        }
      }
    }))
  } else if (action === "Copy Invitation link") {
    row.project_invitation_link && await handleCopy(row.project_invitation_link, enqueueSnackbar, "Invitation link");
  } else if (action === "C" && !row.is_complaince_shared) {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        pendingCompliance: {
          state: true,
          pe_id: row.pe_id,
          is_multiple: false
        }
      }
    }))
  } else if (action === "Reshare Profile") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        shareProfile: {
          state: true,
          isChange: false,
          pe_id: row.pe_id,
          expert_id: row.expert_id,
          company: row.curr_company,
          designation: row.curr_designation,
          location: row.curr_company_location,
          is_agenda_respond: row.is_agenda_respond,
          email_format: false,
          snippet: null,
          meta: row.meta,
          charges: null
        },
      },
    }));
  } else if (action === "Share Agenda") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        shareAgenda: {
          state: true,
          pe_id: row.pe_id
        }
      }
    }))
  } else if (action === "Share CC") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        ShareComplianceWithExpert: {
          state: true,
          pe_id: row.pe_id,
          client_id: row.client_id
        }
      }
    }))
  } else if (action === "ReShare CC") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        ShareComplianceWithExpert: {
          state: true,
          pe_id: row.pe_id,
          client_id: row.client_id,
          is_edit: true
        }
      }
    }))
  } else if (action === "Share CC Responses") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        ShareComplianceWithClient: {
          state: true,
          pe_compliance: row.pe_compliance,
          client_id: row.client_id,
          email_format: false,
          snippet: row.meta.snippet || null,
          expert_id: row.expert_id,
          company: row.curr_company,
          designation: row.curr_designation,
          meta: row.meta
        }
      }
    }))
  } else if (action === "ReShare CC Responses") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        shareProfile: {
          ...prev.actions.shareProfile,
          email_format: true,
          snippet: row.meta.snippet || null,
          expert_id: row.expert_id,
          company: row.curr_company,
          designation: row.curr_designation,
          charges: row.meta.selling_price_currency && row.meta.selling_price ? `${row.meta.selling_price_currency} ${row.meta.selling_price}` : "",
          meta: row.meta
        }
      }
    }))
  } else if (action === "Show Answers") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        showAnswers: {
          state: true,
          answers: answers || [],
          show_reviewed_by: {
            name: row.pe_compliance?.final_reviewed_by_value?.name || "",
            date: row.pe_compliance?.final_reviewed_on || "",
            status: row.pe_compliance?.status || "",
          },
          proof_url: row.pe_compliance?.meta?.client_compliance_proof_url || undefined
        }
      }
    }))
  } else if (action === "Show Answers only") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        showAnswers: {
          state: true,
          answers: answers || [],
          proof_url: row.pe_compliance?.meta?.expert_compliance_proof_url || undefined,
          showReAnswerBtn: showReAnswerBtn(row.pe_compliance)
        }
      }
    }))
  } else if (action === "Show Expert Compliance Questions") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        showComplianceQuestions: {
          state: true,
          pe_compliance: row.pe_compliance || null
        }
      }
    }))
  } else if (action === "Review Compliance") {
    setPeDialog((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        reviewCompliance: {
          state: true,
          pe_compliance: row.pe_compliance || null,
          snippet: row.meta.snippet || null,
          expert_id: row.expert_id,
          company: row.curr_company,
          designation: row.curr_designation,
          meta: row.meta
        }
      }
    }))
  }
};

export const handleRequestSort = (
  event: React.MouseEvent<unknown>,
  property: keyof Data,
  setOrder: Dispatch<SetStateAction<Order>>,
  setOrderBy: Dispatch<SetStateAction<keyof Data>>,
  order: Order,
  orderBy: keyof Data
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

/*
  Fn usage -
  When user click on the table row ,
  what should happen when user click on the certain row
*/
export const handleClick = (
  event: React.MouseEvent<unknown>,
  row: Data,
  selectExpert: SelectExpert,
  setSelectExpert: SetSelectExpert,
  isSelectAllowed: boolean
) => {
  // If the User is clicking on a Span Element ( meaning - Status & Action Chips ) & In Chip , return
  const target = event.target as HTMLElement;
  if (target && target.tagName) {
    const tagName = target.tagName;
    if (tagName === "SPAN" || tagName === "P") {
      return;
    }
  }

  const { name, pe_id, curr_company, curr_designation } = row;

  if (!pe_id || !isSelectAllowed) {
    return;
  }

  const selected = selectExpert.selectedCards;
  const selectedIndex = selected.findIndex((s) => s.value === pe_id);
  let finalSelected: SelectedCards[] = [];

  const curr_value: SelectedCards = {
    label: name, value: pe_id, company: curr_company, designation: curr_designation, pe_id: row.pe_id,
    expert_id: row.expert_id,
    expert_name: row.name,
    location: row.curr_company_location,
    is_agenda_respond: row.is_agenda_respond,
    snippet: row.meta.snippet || null,
    meta: row.meta,
    charges: row.meta.selling_price_currency && row.meta.selling_price ? `${row.meta.selling_price_currency} ${row.meta.selling_price}` : "",
    badge: row.badge
  };
  if (selectedIndex === -1) {
    finalSelected = [...selected];
    finalSelected.push(curr_value);
  } else if (selectedIndex === 0) {
    finalSelected = selected.slice(1);
  } else if (selectedIndex === selectExpert.selectedCards.length - 1) {
    finalSelected = selected.slice(0, -1);
  } else if (selectedIndex > 0) {
    finalSelected = finalSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelectExpert((prev) => ({
    ...prev,
    selectedCards: finalSelected
  }))
};

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  currentRow: Data[],
  setSelected: SetSelectExpert,
  selectExpert: SelectExpert,
  selectedAction: SelectedAction
) => {

  if (!selectExpert.isSelected) {
    return;
  }

  if (event.target.checked) {
    // is already some items are selected, we are deselecting everything
    let numSelected = selectExpert.selectedCards.length
    if (numSelected > 0) {
      setSelected((prev) => ({
        ...prev,
        selectedCards: []
      }));
      return
    }

    // If none of the items are selected, we are selecting on those which are allowed to be selected
    const newSelected = currentRow.filter(card => selectAllowed(selectedAction, card)).map((card) => ({
      label: card.name, value: card.pe_id!, company: card.curr_company, designation: card.curr_designation,
      pe_id: card.pe_id,
      expert_id: card.expert_id,
      expert_name: card.name,
      location: card.curr_company_location,
      is_agenda_respond: card.is_agenda_respond,
      snippet: card.meta.snippet || null,
      meta: card.meta,
      charges: card.meta.selling_price_currency && card.meta.selling_price ? `${card.meta.selling_price_currency} ${card.meta.selling_price}` : "",
      badge: card.badge
    }));
    setSelected((prev) => ({
      ...prev,
      selectedCards: newSelected,
    }));
    return;
  }

  // if event.target.checked is false, that means user clicks the checkbox button to deselect everything
  setSelected((prev) => ({
    ...prev,
    selectedCards: []
  }));
};

export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  newPage: number,
  setPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<Data[]>>,
  rowsPerPage: number,
  rows: Data[]
) => {
  setPage(newPage);
  const rowData = rows.slice(
    newPage * rowsPerPage,
    newPage * rowsPerPage + rowsPerPage
  );
  setCurrentRow(rowData);
};

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<Data[]>>,
  setPage: Dispatch<SetStateAction<number>>,
  rows: Data[]
) => {
  setRowsPerPage(parseInt(event.target.value));
  const rowData = rows.slice(0, parseInt(event.target.value));
  setCurrentRow(rowData);
  setPage(0);
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: Data[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    isSort: true,
  },
  {
    id: "expert_id",
    numeric: true,
    disablePadding: false,
    label: "Expert ID",
    isSort: true,
  },
  {
    id: "curr_designation",
    numeric: false,
    disablePadding: false,
    label: "Relevant Designation",
    isSort: false,
  },
  {
    id: "curr_company",
    numeric: false,
    disablePadding: false,
    label: "Relevant Company",
    isSort: false,
  },
{
    id: "first_invite",
    numeric: false,
    disablePadding: false,
    label: "First Invite",
    isSort: false,
  },
  {
    id: "calls_scheduled",
    numeric: false,
    disablePadding: false,
    label: "Calls Scheduled",
    isSort: false,
  },
  {
    id: "calls_completed",
    numeric: false,
    disablePadding: false,
    label: "Calls Completed",
    isSort: false,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    isSort: false,
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    isSort: false,
  },
];
