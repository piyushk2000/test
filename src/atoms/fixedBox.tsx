import { Box, SxProps, Theme } from "@mui/material"


const FixedBox = ({ children, sx = {} }: { children: React.ReactNode, sx?: SxProps<Theme> | undefined }) => {
    return (
        <Box sx={{ ...sx, position: "sticky", top: "0px", backgroundColor: "#F5F5F5", zIndex: "1000" }}>{children}</Box>
    )
}

export default FixedBox