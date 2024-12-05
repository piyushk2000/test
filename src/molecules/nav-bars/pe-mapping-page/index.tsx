import { Box, Typography } from '@mui/material';
import NavbarCommon from '../../nav-bar-common'
import { NavbarActions, NavbarActionsLength } from './navbarActions';
import PEMappingNavbarItems from './navbarItems';
import { useMemo } from 'react';

type Props = {
    isSelectedClicked: boolean;
    inviteClickHandler(s: boolean): void;
    bulkRevertClickHandler(): void;
    ShortlistClickHandler(): void;
    bulkShareClickHandler(): void;
    expertDetailsClickHandler: () => void
    isFilterApplied: boolean;
    resetFilters(): void;
    totalSelected: number;
    selectClickHandler(): void;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectedAction: { title: string, label: React.ReactNode, onClick(): void } | null
    projectData: any
}

const PEMappingNavbar = ({
    isSelectedClicked,
    inviteClickHandler,
    ShortlistClickHandler,
    expertDetailsClickHandler,
    isFilterApplied,
    resetFilters,
    totalSelected,
    projectData,
    selectClickHandler, onActionSelect, selectedAction, bulkShareClickHandler, bulkRevertClickHandler }: Props) => {

        const memoizedActions = useMemo(() => 
            NavbarActions(
              inviteClickHandler, 
              ShortlistClickHandler, 
              bulkShareClickHandler,
              expertDetailsClickHandler,
              bulkRevertClickHandler
            ),
            [inviteClickHandler, ShortlistClickHandler, bulkShareClickHandler, expertDetailsClickHandler, bulkRevertClickHandler]
          );

    return (
        <>
            {projectData &&
                <Box sx={{ mb: -3, mt: -1, pb: 1 }}>
                    <section>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "450",
                                fontSize: "22px",
                                textTransform: "capitalize",
                            }}
                        >
                            {`#${projectData?.id}:`} {projectData?.topic}
                        </Typography>
                    </section>
                </Box>
            }

            <NavbarCommon
                isSelectClicked={isSelectedClicked}
                Actions={memoizedActions}
                ActionsLength={NavbarActionsLength}
                NavbarItems={<PEMappingNavbarItems />}
                resetFilters={resetFilters}
                isFilterApplied={isFilterApplied}
                totalSelected={totalSelected}
                selectClickHandler={selectClickHandler}
                onActionSelect={onActionSelect}
                selectedAction={selectedAction}
                selectActionSubmitBtnName='Choose Expert'
            />
        </>
    )
}

export default PEMappingNavbar