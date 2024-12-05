import { createTheme } from "@mui/material";
import { SetCalenderTypes } from ".";
import { filterPayload } from "../../../pages/Experts/types";

export const clientSortByExpertOptions = [
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
    {
        label: <p>Base Location ( A &rarr; Z )</p>,
        value: "asc___base_location",
    },
    {
        label: <p>Base Location ( Z &rarr; A )</p>,
        value: "desc___base_location",
    }
];

export const sortbyExpertOptions = [
    {
        label: <p>ID ( &uarr; )</p>,
        value: "asc___id",
    },
    {
        label: <p>ID ( &darr; )</p>,
        value: "desc___id",
    },
    {
        label: <p>Project ID ( &uarr; )</p>,
        value: "asc___fk_project",
    },
    {
        label: <p>Project ID ( &darr; )</p>,
        value: "desc___fk_project",
    },
    {
        label: <p>Name ( A &rarr; Z )</p>,
        value: "asc___name",
    },
    {
        label: <p>Name ( Z &rarr; A )</p>,
        value: "desc___name",
    },
    {
        label: <p>Status ( A &rarr; Z )</p>,
        value: "asc___status",
    },
    {
        label: <p>Status ( Z &rarr; A )</p>,
        value: "desc___status",
    },
    {
        label: <p>Base Location ( A &rarr; Z )</p>,
        value: "asc___base_location",
    },
    {
        label: <p>Base Location ( Z &rarr; A )</p>,
        value: "desc___base_location",
    },
    {
        label: <p>Added On (New &rarr; Old)</p>,
        value: "desc___created_at",
    },
    {
        label: <p>Added On (Old &rarr; New)</p>,
        value: "asc___created_at",
    },
    { label: <p>Updated (New &rarr; Old)</p>, value: "desc___updated_at" },

    { label: <p>Updated (Old &rarr; New)</p>, value: "asc___updated_at" },
];

export const calenderOpenClickHandler = (setCalender: SetCalenderTypes) => {
    setCalender((prev) => ({ ...prev, open: true }));
};

export const calenderCloseBtnClickHandler = (setCalender: SetCalenderTypes, okBtnApiCalls: (
    date: Date | null,
    tDate: Date | null,
    select: string | null,
    calenderType: string | null
) => void) => {
    setCalender((prev) => ({
        open: false,
        value: "",
        type: null,
        date: null,
        tDate: null,
        select: null
    }));
    // removing the date Range Filter
    okBtnApiCalls(null, null, null, null);
};


export const theme = createTheme({
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 12,
        h6: {
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#252B3B",
        },
        body1: {
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#252B3B",
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                    color: "#252B3B",
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#EC9324",
        },
    },
});

export const BadgeFilterOptions = [
    { label: "Ace", value: "ace" },
    { label: "Champ", value: "champion" },
    { label: "Pro", value: "pro" }
]

export const statusOptions = [
    "Identified",
    "Contacted",
    "Refused",
    "Onboarding",
    "Compliance Initiated",
    "Compliance Done",
    "Confirmed",
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
    {
        label: "Tutorial completion",
        value: "Tutorial completion",
    },
    {
        label: "Approved On",
        value: "confirmed_on",
    },
];

export const getNavbarFilters = (filterPayload: filterPayload): Partial<filterPayload> => ({
    statusFilter: filterPayload.statusFilter,
    badgeFilter: filterPayload.badgeFilter,
    pending_approvals: filterPayload.pending_approvals,
    otherSearchFilter: filterPayload.otherSearchFilter,
    dateFilter: filterPayload.dateFilter,
    typeFilter: filterPayload.typeFilter,
    sortFilter: filterPayload.sortFilter,
})
