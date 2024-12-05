import dayjs, { Dayjs } from "dayjs";

export const clientType = [
  {
    label: "Venture Capital/Private Equity",
    value: "Venture Capital/Private Equity",
  },
  { label: "Hedge funds/Public Markets", value: "Hedge funds/Public Markets" },
  { label: "Research and Consulting", value: "Research and Consulting" },
  { label: "Corporations and Companies", value: "Corporations and Companies" },
];

export const cscOptions = [
  { label: "Not Required", value: "Not Required" },
  { label: "Before sharing profile", value: "Before sharing profile" },
  { label: "Before scheduling the call", value: "Before scheduling the call" },
  {
    label:
      "To be sent after scheduling the call and must be completed before logging the call",
    value:
      "To be sent after scheduling the call and must be completed before logging the call",
  },
  { label: "Before logging the call", value: "Before logging the call" },
];

export const commonInputStyles: any = {
  className: "backgroundWhite",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const minDateValue: any = dayjs().add(1, "day");

export const defaultValues: AddClientDefaultValues = {
  name: "",
  type: null,
  contract_valid_till: null,
  CEM: null,
  compliance_start_after:   {
    label: "Not Required",
    value: "Not Required"
  },
  compliance_end_before: null,
  compliance_email_format: null,
  compliance_description: null
};

export type AddClientDefaultValues = {
  name: string;
  type: { label: string; value: string } | null;
  contract_valid_till: Dayjs | null;
  CEM: { value: number; label: string } | null;
  compliance_start_after: {
    label: string;
    value: string;
  } | null;
  compliance_end_before: {
    label: string;
    value: string;
  } | null;
  compliance_email_format: string | null;
  compliance_description: string | null;
};

export type getAdminsAPI = {
  success: string;
  message: string;
  data: { id: number; name: string }[];
};

export const compliance_start_after_options = [
  {
    label: "Shared",
    value: "Shared"
  },
  {
    label: "Shortlisted",
    value: "Shortlisted"
  },
  {
    label: "Scheduled",
    value: "Scheduled"
  },
  {
    label: "Not Required",
    value: "Not Required"
  }
];

export const getComplianceEndBeforeOptions = (compliance_start_after: {label: string,value: string}) => {
  const rankedStatus: Record<string,number> = {
    Shared: 1,
    Shortlisted: 2,
    Scheduled: 3,
    Completed: 4
  }

  if(!compliance_start_after?.value) {
    return compliance_end_before_options;
  }


  const rank_compliance_start_after = rankedStatus[compliance_start_after.value];

  return compliance_end_before_options.filter((c) => c.rank > rank_compliance_start_after);
}

export const compliance_end_before_options = [
  {
    label: "Shortlisted",
    value: "Shortlisted",
    rank: 2,
  },
  {
    label: "Scheduled",
    value: "Scheduled",
    rank: 3,
  },
  {
    label: "Completed",
    value: "Completed",
    rank: 4
  }
];