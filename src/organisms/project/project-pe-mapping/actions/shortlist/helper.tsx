export type ShortlistRejectOption = {
  label: string;
  value: "Shortlist" | "Reject";
};

export const ShortlistRejectOptions = [
  {
    label: "Shortlist Expert",
    value: "Shortlist",
  },
  {
    label: "Reject",
    value: "Reject",
  },
];

export type PeShortlistPayloadTypes = {
  action: "Reject" | "Shortlist";
  id: number;
};
