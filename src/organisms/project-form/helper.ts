export const priorities = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export function groupFormatter(data: any) {
  if (!data) return [];
  return data.map((item: any) => ({ label: item.label, value: item.id }));
}

export type clientContactArr = {
  created_at: string;
  designation: string;
  email: string;
  fkClient: number;
  id: number;
  mobile: string;
  name: string;
  salutation: string;
  updated_at: string;
  user_id: number;
};
