import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";

const totalBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

type props = {
    children: any;
    sx?: SxProps<Theme> | undefined
    onClick?: React.MouseEventHandler<HTMLDivElement>
};

const BoxSpaceBtw = (props: props) => {
    return <Box sx={{ ...totalBoxStyles, ...props.sx }}>{props.children}</Box>;
};

export const BoxFlex = (props: props) => {
    return <Box onClick={props.onClick} sx={{ ...totalBoxStyles, justifyContent: "flex-start", ...props.sx }}>{props.children}</Box>;
};

export default BoxSpaceBtw;
