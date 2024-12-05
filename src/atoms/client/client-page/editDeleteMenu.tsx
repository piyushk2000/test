import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Typography } from "@mui/material";

type Props = {
  editBtnClick(): void;
}

export default function EditDeleteMenu({ editBtnClick }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: "3px" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => {
          editBtnClick();
          handleClose();
        }} sx={menuStyles}>
          <EditOutlinedIcon sx={iconStyles} /> <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={menuStyles}>
          <DeleteOutlineOutlinedIcon sx={iconStyles} />{" "}
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

const menuStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  "& p": {
    fontSize: "14px",
  },
};

const iconStyles = { fontSize: "18px", mb: "0.20rem" };
