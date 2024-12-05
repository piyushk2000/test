import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsTab(){
    const theme = useTheme();
    const isTab = useMediaQuery(theme.breakpoints.down("md"));
    return isTab
}