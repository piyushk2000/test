export type addContactDefaultValues = {
  salutation: { label: string; value: string };
  name: string | null;
  email: string | null;
  isd_code?: { label: string; value: string; name: string } | null;
  mobile: string | null;
  designation: string | null;
  fkClient: { label: string; value: string } | null;
  is_compliance_officer: boolean;
};

export const defaultValues: addContactDefaultValues = {
  salutation: { label: "Mr.", value: "Mr." },
  name: null,
  email: null,
  isd_code: {
    label: "+91",
    value: "+91",
    name: "india ( + 91 )",
  },
  mobile: null,
  designation: null,
  fkClient: null,
  is_compliance_officer: false
};
