import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AccordionActionsButtons from '../common/accordianAction';
import { useProjectCalenderContext } from '../../../../pages/project-calendar/context';
import { useProjectCalenderFilterContext } from '../filterContext';
import { isClient, isExpert } from '../../../../utils/role';

const statusFilter = () => (isClient() || isExpert()) ?
    [
        { label: "Scheduled", value: "Scheduled" },
        { label: "Completed", value: "Completed" }
    ]
    : [
        { label: "Scheduled", value: "Scheduled" },
        { label: "Completed", value: "Completed" },
        { label: "Confirmed", value: "Confirmed" },
        { label: "Payment Requested", value: "Payment Requested" },
        { label: "Paid", value: "Paid" }
    ];

const Status = () => {
    const statusIndexes = (isClient() || isExpert()) ? [0, 1] : [0, 1, 2, 3, 4]
    const [checked, setChecked] = React.useState(statusIndexes);
    const { setFiltersWithKey } = useProjectCalenderContext();
    const { setExpanded, expanded } = useProjectCalenderFilterContext();

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleSubmit(newChecked);
    };

    const handleSubmit = (newChecked: number[]) => {

        const status: string[] = [];

        for (let idx of newChecked) {
            switch (idx) {
                case 0: {
                    status.push("Scheduled")
                    break;
                }
                case 1: {
                    if (isClient() || isExpert()) {
                        status.push(...["Completed", "Confirmed", "Payment Requested", "Paid"])
                    } else {
                        status.push("Completed")
                    }
                    break;
                }
                case 2: {
                    status.push("Confirmed")
                    break;
                }
                case 3: {
                    status.push("Payment Requested")
                    break;
                }
                case 4: {
                    status.push("Paid");
                    break;
                }
            }
        }

        setFiltersWithKey("status", status);
        setExpanded((prev) => ({ ...prev, status: !prev.status }))
    }

    const clearAllBtn = () => {
        setChecked([]);
        handleSubmit([]);
        setExpanded((prev) => ({ ...prev, status: !prev.status }))
    }

    const selectAllBtn = () => {
        setChecked(statusIndexes);
        handleSubmit(statusIndexes);
        setExpanded((prev) => ({ ...prev, status: !prev.status }))
    }

    return (
        <>
            {expanded.status &&
                <>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {statusFilter().map((status, value) => {
                            const labelId = `checkbox-list-label-${status.value}`;

                            return (
                                <ListItem
                                    key={status.value}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={status.label} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <AccordionActionsButtons
                        clearAllAction={clearAllBtn}
                        selectAllAction={selectAllBtn}
                        checkedLength={checked.length}
                        hideApplyBtn
                    />
                </>
            }

        </>

    )
}

export default Status