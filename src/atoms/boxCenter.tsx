import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";

const totalBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

type props = {
  children: any;
  sx?: SxProps<Theme> | undefined
};

const BoxCenter = (props: props) => {
  return <Box sx={{ ...totalBoxStyles, ...props.sx }}>{props.children}</Box>;
};

export default BoxCenter;
