import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

type Props = {
    text:  React.ReactNode;
}

export const EllipsisBox = ({ text }: Props) => {
    return (
        <Box sx={{width: "90%"}}>
        <Tooltip title={text} arrow>
            <Box sx={{
                "& p" : {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    fontWeight: "500",
                }
            }}>
                <p>{text}</p>
            </Box>
        </Tooltip>
        </Box>
    )
}