import * as React from 'react';

import List from '@mui/material/List';
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { statusFilter } from '../../helper';
import { statusDotStyle } from '../../style';
import AccordionActionsButtons from '../common/accordianAction';
import { useMyCalenderContext } from '../../../../pages/my-calendar/context';
import { isClient, isExpert } from '../../../../utils/role';
import { handleSubmit } from '../helper';
import { useMyCalenderFilterContext } from '../filterContext';

const Status = () => {
    const isClientOrExpert = isClient() || isExpert();
    const { setFilters } = useMyCalenderContext();
    const { clearFilter } = useMyCalenderFilterContext();
    const [checked, setChecked] = React.useState(isClientOrExpert ? [0, 1] : [0, 1, 2]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleSubmit(newChecked, setFilters);
    };



    const clearAllBtn = () => {
        setChecked([]);
        handleSubmit([], setFilters);
    }

    const selectAllBtn = () => {
        if (isClientOrExpert) {
            setChecked([0, 1]);
            handleSubmit([0, 1], setFilters);
        } else {
            setChecked([0, 1, 2]);
            handleSubmit([0, 1, 2], setFilters);
        }
    }

    React.useEffect(() => {
        if (clearFilter.current > 0) {
            if (isClientOrExpert) {
                setChecked([0, 1]);
            } else {
                setChecked([0, 1, 2]);
            }
        }
    }, [clearFilter.current]);

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {statusFilter().map((status, index) => {
                    const labelId = `checkbox-list-label-${status.value}`;

                    return (
                        <ListItem
                            key={status.value}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <Box sx={statusDotStyle(status.color)}></Box>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(index) !== -1}
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
                handleSubmit={() => { }}
                checkedLength={checked.length}
                hideApplyBtn
            />
        </>

    )
}

export default Status