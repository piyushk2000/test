export const sendInviteFields = [{ label: "Email", value: "email" }];

export const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

type LabelValue = { label: string; value: string };

export type DefaultValues = {
  send_invite: LabelValue | string | null;
  share_agenda: string | null;
};

export const defaultValues = {
  send_invite: "email",
  share_agenda: null,
};
