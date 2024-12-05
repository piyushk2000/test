import { EnqueueSnackbar } from "notistack";
import { EllipsisBox } from "../../atoms/ellipsis-box";
import { APIRoutes } from "../../constants";
import { LocalDayjs } from "../../utils/timezoneService";
import { Data, Dialog, Filters, Select, SetDialog, SetSelect } from "./type";
import { RequestServer } from "../../utils/services";
import { SetSelectExpert } from "../../organisms/project/project-pe-mapping/type";

function getObjectWithLatestEndDate(array: any[]) {
  return array.reduce((latest, current) => {
    const currentEndDate = LocalDayjs(current.end_date);
    const latestEndDate = LocalDayjs(latest.end_date);

    return currentEndDate.isAfter(latestEndDate) ? current : latest;
  }, array[0] || null);
}

export const formatData = (data: any) => {
  if (!data) {
    return [];
  }

  return data.map((d: any) => {
    const work_exp: any[] = d.work_experience;

    const current_work = work_exp.filter(d => d.currently_works_here).map((d, i) => (<li key={d.company}>
      <EllipsisBox text={`${i + 1}) ${d.company}, ${d.designation}`} />
    </li>));

    const past_work_arrays = work_exp.filter(d => !d.currently_works_here)

    const past_work = getObjectWithLatestEndDate(past_work_arrays);

    const past_work_str = `${past_work.company}, ${past_work.designation}`;
    return {
      id: d.id,
      project_name: d.fk_project_value.external_topic,
      expert_name: {
        name: d.fk_expert_value.name,
        id: d.fk_expert_value.id
      },
      current_company_designation: <ul>{current_work}</ul>,
      past_company_designation: <EllipsisBox text={past_work_str} />,
      actions: d
    }
  })
}

export const defaultFilters: Filters = {
  isFilterApplied: false,
  status: ["SharedWithClient"],
  isFilterChange: false,
  rowsPerPage: 24,
  client_contact_name: "",
  project_external_topic: "",
  expert_id: "",
  expert_name: ""
}

export const defaultDialog: Dialog = {
  expert: {
    state: false,
    expert_id: null
  },
  reviewCompliance: {
    state: false,
    pe_compliance: null,
    show_answers_only: true
  },
  reviewBulk: {
    state: false,
    pe_compliances: null,
    action: null
  }
}

export const handleClose = (setDialog: SetDialog) => {
  setDialog(defaultDialog);
}

export const getUrl = (filters: Filters, page: string | null, limit: number) => {
  return (
    APIRoutes.PE_COMPLIANCE + "?embed=YES&limit=" + limit + (
      page ? "&page=" + page : "&page=1"
    ) + (
      filters.expert_id ? "&fk_expert=" + filters.expert_id : ""
    ) + (
      filters.project_external_topic ? "&project_external_topic=" + filters.project_external_topic : ""
    ) + (
      filters.expert_name ? "&expert_name=" + filters.expert_name : ""
    ) + (
      filters.client_contact_name ? "&client_contact_name=" + filters.client_contact_name : ""
    ) + (
      filters.status ? "&in___status=" + filters.status : ""
    )
  )
}

export const handleTableRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Data, isSelectAllowed: boolean, select: Select, setSelect: SetSelect) => {
  // If the User is clicking on a Span Element ( meaning - Status & Action Chips ) & In Chip , return
  const target = e.target as HTMLElement;
  if (target && target.tagName) {
    const tagName = target.tagName;
    if (tagName === "SPAN" || tagName === "P") {
      return;
    }
  }

  const { id } = row;

  if (!id || !isSelectAllowed) {
    return;
  }

  const selected = select.selectedCards;
  const selectedIndex = selected.findIndex((s) => s.id === id);
  let finalSelected: any[] = [];

  const curr_value: any = { ...row };

  console.log("curr", curr_value);
  if (selectedIndex === -1) {
    finalSelected = [...selected];
    finalSelected.push(curr_value);
  } else if (selectedIndex === 0) {
    finalSelected = selected.slice(1);
  } else if (selectedIndex === select.selectedCards.length - 1) {
    finalSelected = selected.slice(0, -1);
  } else if (selectedIndex > 0) {
    finalSelected = finalSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelect((prev) => ({
    ...prev,
    selectedCards: finalSelected
  }))
}

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  currentRow: Data[],
  select: Select,
  setSelect: SetSelect
) => {

  if (!select.isClicked) {
    return;
  }

  if (event.target.checked) {
    // is already some items are selected, we are deselecting everything
    let numSelected = select.selectedCards.length
    if (numSelected > 0) {
      setSelect((prev) => ({
        ...prev,
        selectedCards: []
      }));
      return
    }

    // If none of the items are selected, we are selecting on those which are allowed to be selected
    const newSelected = currentRow.filter((card) => card.actions.status === "SharedWithClient");
    setSelect((prev) => ({
      ...prev,
      selectedCards: newSelected,
    }));
    return;
  }

  // if event.target.checked is false, that means user clicks the checkbox button to deselect everything
  setSelect((prev) => ({
    ...prev,
    selectedCards: []
  }));
};

export const reviewBulk = async (enqueueSnackbar: EnqueueSnackbar, action: "Approve" | "Reject", unique_codes: string | null, setLoading: (loading: boolean) => void, handleClose: () => void, refetch: () => Promise<void>, setSelect: SetSelect) => {

  if (!unique_codes) {
    enqueueSnackbar("Select compliances", {
      variant: "warning"
    })
    return;
  }

  const payload: any = {
    action,
    unique_codes,
  }
  setLoading(true);

  try {
    const response = await RequestServer(APIRoutes.PE_COMPLIANCE + "/client/bulk", "POST", payload);

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });

      handleClose();
      refetch();
      setSelect((prev) => ({
        isClicked: false,
        selectedCards: [],
        callAction: null
      }))

    } else {
      console.log({ response });
      enqueueSnackbar(response.message.toString() || response.error.toString() || "something went wrong", {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
    enqueueSnackbar("Request failed.", { variant: "error" });
  } finally {
    setLoading(false);
  }
}