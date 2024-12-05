import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { EnhancedTableToolbarProps } from "./types";

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, setNoActionTaken, isNoActionTaken, title } = props;

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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 70%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title || "Experts"}
        </Typography>
      )}
      {numSelected > 0 ? (
        <></>
      ) : (
        <>
          <label style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: "500" }}>
              Added but no action taken
            </p>

            <Switch
              checked={isNoActionTaken}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNoActionTaken(event.target.checked);
              }}
              sx={{ color: "var(--primary-color)" }}
            />
          </label>
        </>
      )}
    </Toolbar>
  );
}
