export type PeMappingFormOptions = {
  statusFields: labelType[];
};

export type DefaultValuesPeFilters = {
  expert_status: labelType | null;
};

export type labelType = { label: string; value: string };
