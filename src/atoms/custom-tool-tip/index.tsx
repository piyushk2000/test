import { styled } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const CustomToolTip:any = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} leaveTouchDelay={5000} enterTouchDelay={0} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(41, 40, 40, 0.952)',
      // color: 'rgba(0, 0, 0, 0.945)', //text color
      maxWidth: 320,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      padding: theme.spacing(1),

    },
  }));

  export default CustomToolTip