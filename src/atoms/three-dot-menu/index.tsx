import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  items: { label: React.ReactNode; handleClick: any }[];
};

export default function ThreeDotMenu({ items }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (func: () => void) => {
    func();
    handleClose();
  };

  const CustomFontTheme = createTheme({
    typography: {
      fontSize: 10.5,
      fontFamily: "'Montserrat', sans-serif",
    },
  });

  return (
    <div>
      <ThemeProvider theme={CustomFontTheme}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disableRipple
          sx={{ padding: 0 }}
        >
          <MoreVertIcon width={"20px"} height="20px" />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {items.map((item) => (
            <MenuItem
              key={Math.random()}
              onClick={() => handleItemClick(item.handleClick)}
              sx={{ fontWeight: "12px", color: "#252B3B" }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </ThemeProvider>
    </div>
  );
}
