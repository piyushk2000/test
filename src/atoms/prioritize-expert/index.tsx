import StarIcon from '@mui/icons-material/Star';
import { IconButton, Tooltip } from '@mui/material';


export function PrioritizeExpert({ isPriority}: { isPriority: boolean }) {
    return (
        <>
            {isPriority &&
                <Tooltip title="Expert Prioritized" arrow>
                    <IconButton sx={{padding: "2px"}}>
                        <StarIcon sx={{ color: "var(--primary-color)" }} />
                    </IconButton>
                </Tooltip>}
        </>

    )
}