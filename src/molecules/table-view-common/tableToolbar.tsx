import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { EnhancedTableToolbarProps } from "./types";
import BoxSpaceBtw from "../../atoms/boxSpaceBtw";

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, title, ToolbarRightElement } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            <BoxSpaceBtw sx={{width: "100%"}}>
                <div>
                    {numSelected > 0 ? (
                        <Typography
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                {title || ""}
                            </Typography>
                        </>
                    )}
                </div>

                <div>
                    {numSelected > 0 ? (
                        <></>
                    ) : (
                        <>
                            {ToolbarRightElement}
                        </>
                    )}
                </div>

            </BoxSpaceBtw>

        </Toolbar>
    );
}
