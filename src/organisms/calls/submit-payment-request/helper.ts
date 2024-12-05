import { Dispatch, SetStateAction } from "react";

export type SectionType = "Generate Invoice" | "Upload Invoice" | "Confirm call details" | "";
export type SetSectionType = Dispatch<SetStateAction<SectionType>>;

export type SubmitDialogTypes = {
    state: boolean;
    handleSubmit: null | (() => Promise<void>);
}

export type SetSubmitDialog = Dispatch<SetStateAction<SubmitDialogTypes>>

export const checkboxDetails = [
    {name: "check_1", label: "Yes, I have checked everything. I am satisfied with the call details, bank A/C details and the amount payable."},
    {name: "check_2", label: "I understand that once I raise payment request, I can not ask for any changes."},
    {name: "check_3", label: "I confirm that I have complied with the terms and conditions of the Expert Agreement and have not disclosed any confidential information."},
    {name: "check_4", label:  "I confirm that I will not disclose or attempt to benefit from any information revealed to me during the engagement"} 
]

export const hideAccountNumber = (account_number: string) => {

    if(account_number.length < 4) {
        return account_number;
    }

    return`${Array.from(new Array((account_number.length - 4)), () => "X").join("")}${account_number.slice(-4)}`
}