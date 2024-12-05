export const sendInviteFields = [{ label: "Yes", value: "yes" }];

type LabelValue = { label: string; value: string };

export type DefaultValues = {
  proof_forward: LabelValue | string | null;
};

export const defaultValues = {
  proof_forward: null,
};
