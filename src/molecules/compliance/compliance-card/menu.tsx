import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import editIcon from "../../../assets/images/client/edit_client.png";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { useSnackbar } from "notistack";
import { sendForgetPassLink } from "../../../organisms/login/helper";

type Props = {
  contact_email: string;
}

export default function ContactCardMenu({ contact_email }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { setLoading: setSubmitted } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();

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
        sx={{ width: "32px", height: "32px", fontFamily: "inherit" }}
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
        sx={{ fontSize: "12px", fontFamily: "inherit" }}
      >
        <MenuList dense>
          <CustomMenuItem
            label={"Reset Password"}
            icon={editIcon}
            onClick={async () => {
              setSubmitted(true);
              await
                sendForgetPassLink(
                  contact_email,
                  () => { },
                  setSubmitted,
                  enqueueSnackbar,
                  true
                )
            }}
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
      <ListItemText
        sx={{ fontSize: "12px", fontFamily: "inherit" }}
        disableTypography
      >
        {label}
      </ListItemText>
    </MenuItem>
  );
};
