import { Data } from "../../list-view/types";
import { setDialogState, SharedProfiles } from "../../type";

export type formValues = {
  snippets: string;
  cost_price?: string;
  selling_price: string;
  currency: { label: string; value: string };
  multiplier: { label: string; value: number } | null;
  share_agenda: string;
};

export type shareProfileFormProps = {
  handleClose: () => void;
  pe_id: number | null;
  expert_id: number | null;
  handleSubmitClose: () => void;
  handleChange: () => void;
  company: string | null;
  designation: string | null;
  location: string | null;
  is_agenda_respond: boolean;
  expertsData: formattedExpertsData;
  defaultValues: any;
  setPeDialog: setDialogState;
  isUsedInBulk?: boolean;
  setCurrentExpert?: (data: SharedProfiles) => void;
  isBulkLast?: boolean;
  rows?: Data[] | null;
  group?:string | number;
};

export type FieldProps = {
  handleClose: () => void;
  location: string | null;
  expert_id: number | null;
  handleChange: () => void;
  company: string | null;
  designation: string | null;
  is_agenda_respond: boolean;
  expertsData: formattedExpertsData;
  isUsedInBulk?: boolean;
  isBulkLast?: boolean;
  group?: string | number;
};

export type formattedSnippets = {
  heading: string;
  description: string;
}[];

export type formattedExpertsData = {
  snippets: formattedSnippets;
  name: string | null;
  relevant_company: {
    name: string | null;
    designation: string | null;
  };
  picture: string | null;
  price_per_hour: string | null;
  price_per_hour_currency: string | null;
};


export const snippetAddNSearchStyle = {
  mb: '1em',
  display: 'flex',
  justifyContent: {
    xs: "center",
    sm: "space-between"
  },
  flexWrap: "wrap",
  alignItems: "center"
}

export const snippetRadioStyle = {
  display: "flex", flexDirection: "column", width: "100%",
  "& .MuiFormControlLabel-root": {
    alignItems: "flex-start"
  },
  "& .MuiTypography-root": {
    width: "100%"
  },
}

export const SnippetsWrapper = {
  "& .MuiFormControl-root": {
    width: "100%"
  }
}

export const snippetAccordianStyle = {
  width: '100% !important', "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  borderBottom: "1px solid rgba(0,0,0,0.1)"
}

export const snippetAccordianTitleStyle = { width: '100%', fontSize: "15px", fontWeight: "500" }