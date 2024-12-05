import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from "react-router-dom";
import CustomBtnFilled from "./form-molecules/CustomBtnFilled";
import { useIsMobile } from "../utils/hooks/useIsMobile";

const DownloadBtn = (
    { link, onClick , mobile_view}: { link?: string, onClick?: () => (Promise<void> | void), mobile_view?: boolean }
) => {

    return (
        <>
            {link ?
                <Link to={link} target="_blank" rel="noopener noreferrer">
                </Link> : <ButtonEl onClick={onClick} mobile_view={mobile_view} />
            }
        </>


    )
}

const ButtonEl = ({ onClick = () => { }, mobile_view }: { onClick?: () => (Promise<void> | void) , mobile_view?: boolean}) => {
    const isMobile = mobile_view || useIsMobile();
    return (
        <>
            {isMobile ?
                <IconButton onClick={onClick} sx={{
                    padding: "5px", backgroundColor: "var(--green-color)", color: "white", "&:hover": {
                        color: "white",
                        backgroundColor: "var(--green-color)"
                    }
                }}>
                    <DownloadIcon sx={{ fontSize: "15px" }} />
                </IconButton> :
                <Tooltip title="Download Calls" arrow>
                    <CustomBtnFilled
                        label="Download"
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={onClick}
                    />
                </Tooltip>
            }
        </>
    )
}

export default DownloadBtn