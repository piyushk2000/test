import NavbarCommon from '../../nav-bar-common'
import { NavbarActions, NavbarActionsLength } from './navbarActions';
import CETrackerNavbarItems from './navbarItems';
import { useMemo } from 'react';

type Props = {
    isSelectedClicked: boolean;
    includeExperts: () => void;
    excludeExperts: () => void;
    isFilterApplied: boolean;
    resetFilters(): void;
    totalSelected: number;
    selectClickHandler: any;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null;
}

const CETrackerNavbar = ({
    isSelectedClicked,
    includeExperts,
    excludeExperts,
    isFilterApplied,
    resetFilters,
    totalSelected,
    selectClickHandler, onActionSelect, selectedAction }: Props) => {

    const memoizedActions = useMemo(() =>
        NavbarActions(
            includeExperts,
            excludeExperts
        ),
        [includeExperts, excludeExperts]
    );

    return (
        <>
            <NavbarCommon
                isSelectClicked={isSelectedClicked}
                Actions={memoizedActions}
                ActionsLength={NavbarActionsLength}
                NavbarItems={<CETrackerNavbarItems />}
                resetFilters={resetFilters}
                isFilterApplied={isFilterApplied}
                totalSelected={totalSelected}
                selectClickHandler={selectClickHandler}
                onActionSelect={onActionSelect}
                selectedAction={selectedAction}
                selectActionSubmitBtnName='Choose Experts'
            />
        </>
    )
}

export default CETrackerNavbar