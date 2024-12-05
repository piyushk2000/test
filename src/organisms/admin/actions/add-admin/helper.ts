export type FormInputProps = {
  name: string | null;
  isd_code: any;
  mobile_number: string | number | null;
  email: string | null;
  groups: any;
  id: string | number | null;
  metabase: any;
  role: {label: string , value: string} | null;
};

export const DefaultValues: FormInputProps = {
  name: null,
  isd_code: null,
  mobile_number: null,
  email: null,
  groups: [],
  id: null,
  metabase:null,
  role: null,
};


export const roleOptions = [{
  label: "FINANCE",
  value: "FINANCE"
},
{
  label: "ADMIN",
  value: "ADMIN"
}
]