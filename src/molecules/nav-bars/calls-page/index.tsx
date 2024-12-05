import { useState } from 'react';
import { IsCalenderTypes, Select, SetSelect, filterPayload, setFilterPayload } from '../../../pages/Calls/types';
import NavbarCommon from '../../nav-bar-common'
import { NavbarActions, NavbarActionsLength } from './navbarActions'
import CallsNavbarItems from './navbarItems';
import { isAdmin, isClient, isExpert, isSuperAdmin } from '../../../utils/role';

type Props = {
    filterPayload: filterPayload;
    setFilterPayload: setFilterPayload;
    select: Select;
    setSelect: SetSelect;
    handleFiltersReset: () => void;
    isFilterApplied: boolean;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null;
    queryString: string | null;
    submitPaymentRequest(): Promise<void>;
    SubmitPaymentRequestClickHandler: () => void;
    changeCaseCodeClickHandler(): void;
}

const CallPageNavbar = ({
    select,
    setSelect,
    handleFiltersReset,
    filterPayload,
    setFilterPayload,
    isFilterApplied,
    onActionSelect,
    selectedAction,
    queryString,
    submitPaymentRequest,
    SubmitPaymentRequestClickHandler,
    changeCaseCodeClickHandler
}: Props) => {
    const [isCalender, setCalender] = useState<IsCalenderTypes>({
        open: false,
        value: "",
        select: null,
        date: null,
        tDate: null
    });

    const resetFilters = () => {
        handleFiltersReset();
        setCalender(() => ({
            open: false,
            value: "",
            select: null,
            date: null,
            tDate: null
        }));
    }

    return (
        <>
            <NavbarCommon
                isSelectClicked={select.isClicked}
                Actions={NavbarActions(SubmitPaymentRequestClickHandler,changeCaseCodeClickHandler)}
                ActionsLength={NavbarActionsLength}
                NavbarItems={<CallsNavbarItems
                    queryString={queryString}
                    filterPayload={filterPayload}
                    setFilterPaylod={setFilterPayload}
                    setCalender={setCalender}
                    isCalender={isCalender}
                    submitPaymentRequest={submitPaymentRequest}
                />}
                outerBoxStylesx={{ marginTop: (isSuperAdmin() || isAdmin()) ? "0" : "1.5rem" }}
                resetFilters={resetFilters}
                isFilterApplied={isFilterApplied}
                totalSelected={select.selectedCards.length}
                selectClickHandler={() => {
                    setSelect((prev) => ({
                        selectedCards: [],
                        isClicked: !prev.isClicked,
                        callAction: null
                    }))
                }}
                isSelectApplied={(isClient() || isExpert()) ? false : true}
                onActionSelect={onActionSelect}
                selectedAction={selectedAction}
                selectActionSubmitBtnName='Choose Call'
            />
        </>
    )
}

export default CallPageNavbar