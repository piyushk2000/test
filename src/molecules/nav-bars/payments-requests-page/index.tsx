import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePaymentsRequestsContext } from "../../../pages/payment-requests/context";
import { defaultFilterValues } from "../../../pages/payment-requests/helper";
import NavbarCommon from "../../nav-bar-common"
import PaymentsNavbarItems from "./navbarItems";
import { Select, SetSelect } from "../../../pages/payment-requests/types";
import { NavbarActions, NavbarActionsLength } from "./helper";
import { Dayjs } from "dayjs";

export type IsCalenderTypes = {
    open: boolean;
    value: string;
    type: string | null;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null,
    tDate: Dayjs | null,
}

export type SetCalenderTypes = Dispatch<SetStateAction<IsCalenderTypes>>

type Props = {
    okBtnApiCalls: (
        date: Date | null,
        tDate: Date | null,
        select: string | null,
        calenderType: string | null
    ) => void;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null;
    select: Select;
    setSelect: SetSelect;
    approveClickHandler: () => void,
    onHoldClickHandler: () => void,
    rejectClickHandler: () => void,
    setHighPriorityClickHandler: () => void,
    setLowPriorityClickHandler: () => void,
    updateInvoiceNumClickHandler: () => void,
    updateDeclarationDateClickHandler: () => void
}

const PaymentsRequestsNavbar = ({ okBtnApiCalls, onActionSelect, selectedAction, select, setSelect, approveClickHandler, onHoldClickHandler, rejectClickHandler, setHighPriorityClickHandler, setLowPriorityClickHandler, updateInvoiceNumClickHandler , updateDeclarationDateClickHandler}: Props) => {
    const { filters, setFilters } = usePaymentsRequestsContext();

    const [isCalender, setCalender] = useState<IsCalenderTypes>({
        open: false,
        value: "",
        type: filters.status === "Requested" ? "recorded_at" : "reviewed_on",
        date: null,
        tDate: null,
        select: null
    });

    useEffect(() => {
        if (filters.isFilterChange) {
            setCalender((prev) => ({ ...prev, type: filters.status === "Requested" ? "recorded_at" : "reviewed_on" }))
        }
    }, [filters.status])

    return (
        <NavbarCommon
            NavbarItems={<PaymentsNavbarItems isCalender={isCalender} setCalender={setCalender} okBtnApiCalls={okBtnApiCalls} />}
            Actions={NavbarActions(approveClickHandler, onHoldClickHandler, rejectClickHandler, setHighPriorityClickHandler, setLowPriorityClickHandler, updateInvoiceNumClickHandler, updateDeclarationDateClickHandler)}
            ActionsLength={NavbarActionsLength}
            resetFilters={() => {
                setFilters((prev) => ({
                    ...defaultFilterValues,
                    isFilterChange: true
                }))
            }}
            isFilterApplied={filters.isFilterApplied}
            isSelectApplied={true}
            onActionSelect={onActionSelect}
            selectedAction={selectedAction}
            isSelectClicked={select.isClicked}
            selectActionSubmitBtnName='Choose Payments'
            totalSelected={select.selectedCards.length}
            selectClickHandler={() => {
                setSelect((prev) => ({
                    selectedCards: [],
                    isClicked: !prev.isClicked,
                    callAction: null
                }))
            }}
        />
    )
}

export default PaymentsRequestsNavbar