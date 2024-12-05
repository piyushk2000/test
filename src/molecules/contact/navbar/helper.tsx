export const SortBy = [
  {
    label: <p>ID ( &uarr; )</p>,
    value: "asc___id",
  },
  {
    label: <p>ID ( &darr; )</p>,
    value: "desc___id",
  },
  {
    label: <p>Name ( A &rarr; Z )</p>,
    value: "asc___name",
  },
  {
    label: <p>Name ( Z &rarr; A )</p>,
    value: "desc___name",
  },
  { label: <p>Added On ( New &rarr; Old )</p>, value: "desc___created_at" },
  { label: <p>Added On ( Old &rarr; New )</p>, value: "asc___created_at" },
  { label: <p>Updated On ( New &rarr; Old )</p>, value: "desc___updated_at" },

  { label: <p>Updated On ( Old &rarr; New )</p>, value: "asc___updated_at" },
];

export const calenderDialogTitles = [
  {
    label: "Updated at",
    value: "updated_at",
  },
  {
    value: "created_at",
    label: "Created at",
  },
];
