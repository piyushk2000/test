import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Attachment from "../../../assets/images/expert/attachment.png";
import Timeline from "../../../assets/images/expert/timeline.png";
import BankDetail from "../../../assets/images/expert/bank-detail.png";
import TooltipIcons from "../../../atoms/project-card-footer-icons";

export default function ExpertProfileMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = (funx: () => void) => {
    funx();
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        marginLeft: "0.25rem",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ width: "32px", height: "32px" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ fontSize: "12px" }}
      >
        <MenuList dense>
          <CustomMenuItem
            label="Attachment"
            icon={Attachment}
            onClick={() => onItemClick(props.toggleAttachment)}
          />
          <CustomMenuItem
            label="Timeline"
            icon={Timeline}
            onClick={() => onItemClick(props.toggleTimeline)}
          />
          <CustomMenuItem
            label="Bank Details"
            icon={BankDetail}
            onClick={() => onItemClick(props.toggleBankDetailsSection)}
          />
        </MenuList>
      </Menu>
    </div>
  );
}

const CustomMenuItem = ({
  label,
  icon,
  onClick,
}: {
  label: String;
  icon: string;
  onClick: () => void;
}) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <img src={icon} width="16px" height="16px" />
      </ListItemIcon>
      <ListItemText sx={{ fontSize: "12px" }} disableTypography>
        {label}
      </ListItemText>
    </MenuItem>
  );
};
