import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, styled, Tooltip } from '@mui/material';

interface TopSideMarkProps {
    internal_notes: string;
    placement?: string;
}

const SideMark = styled('div')({
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderTop: '30px solid #EC9324',
    borderLeft: '30px solid transparent',
    borderTopRightRadius: '14px',
    marginTop: '-16px',
    marginRight: '-24px',
    cursor: 'pointer',
    display: 'inline-block',

});


const TopSideMark: React.FC<TopSideMarkProps> = ({ internal_notes }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Tooltip title={internal_notes} arrow placement="left-start">
            <SideMark>
                <Button
                    id="internal notes"
                    aria-controls={open ? 'internal notes' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                </Button>

            </SideMark>
        </Tooltip>
    );
};

export default TopSideMark;




