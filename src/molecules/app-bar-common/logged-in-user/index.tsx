import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import User from "../../../assets/images/expert/user.png";
import ArrowDown from "../../../assets/images/expert/arrow-down.png";
import { useNavigate } from "react-router-dom";
import { userProfileStyle } from "./styles";
import { handleLogoutClickHandler } from "./helper";
import { useSnackbar } from "notistack";
import { AppRoutes } from "../../../constants";
import { useIsTab } from "../../../utils/hooks/useIsTab";
import { Backdrop, CircularProgress } from "@mui/material";
import { useBoolean } from "usehooks-ts";
import { isExpert, isInfollion } from "../../../utils/role";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ChangePasswordDialog from "../../../organisms/change-pass-dialog";
import WarningDialog from "../../form-close-warning";
import ProfileDialog from "./profileDialog";
import FullPageLoading from "../../../atoms/full-page-loading";

export default function LoggedInUser() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isChangePass, setChangePass] = React.useState({
    state: false,
    isChange: false,
  });
  const {
    value: isAlertBox,
    setTrue: openAlertBox,
    setFalse: closeAlertBox,
  } = useBoolean();
  const {
    value: isProfileDialogOpen,
    setTrue: openProfileDialog,
    setFalse: closeProfileDialog,
  } = useBoolean();
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isTab = useIsTab();
  const expert = isExpert();
  const expertId = localStorage.getItem("expert_id");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePassChangeClose = () => {
    setChangePass({ state: false, isChange: false });
  };

  const profileClickHandler = () => {
    if (expert && expertId) {
      navigate(`${AppRoutes.EXPERT_PROFILE + "?id=" + expertId}`);
    } else {
      openProfileDialog();
    }
  };

  const { value: isLoading, setValue: setLoading } = useBoolean();

  return (
    <React.Fragment>
      <FullPageLoading />
      <Box sx={userProfileStyle} onClick={handleClick}>
        <img src={User} className="user-icon" alt="User" />
        {!isTab ? (
          <>
            {/* <p>{!expert ? localStorage.getItem("name") : "Expert Login"}</p> */}
            <p>{localStorage.getItem("name")}</p>
            <img src={ArrowDown} className="arrow-down" alt="Arrow" />
          </>
        ) : null}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 18,
              height: 18,
              // ml: -0.5,
              // mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!isInfollion() ? (
          <MenuItem onClick={profileClickHandler}>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            Profile
          </MenuItem>
        ) : null}
        {!isInfollion() ? (
          <MenuItem
            onClick={() => {
              setChangePass((prev) => ({ ...prev, state: true }));
            }}
          >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            Change Password
          </MenuItem>
        ) : null}

        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          My account
        </MenuItem> */}
        {!isInfollion() ? <Divider /> : null}
        {(!isInfollion() && !isExpert()) ? (
          <MenuItem onClick={() => navigate(AppRoutes.SETTINGS)}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Set timezone
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() =>
            handleLogoutClickHandler(enqueueSnackbar, navigate, setLoading)
          }
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Change Password */}
      {isChangePass.state && (
        <ChangePasswordDialog
          isOpen={isChangePass.state}
          handleClose={
            isChangePass.isChange
              ? () => openAlertBox()
              : () => handlePassChangeClose()
          }
          isChange={() => {
            setChangePass((prev) => ({ ...prev, isChange: true }));
          }}
          handleSubmitClose={handlePassChangeClose}
        />
      )}

      {/* Close Form Warning Dialog For Change Password [ NOTE: Change handleYesClick if needed ] */}
      {isAlertBox && (
        <WarningDialog
          open={isAlertBox}
          handleClose={closeAlertBox}
          handleYesClick={() => {
            closeAlertBox();
            handlePassChangeClose();
          }}
        />
      )}

      <Backdrop sx={{ color: "#FBB017", zIndex: 2000 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Profile Dialog */}
      {isProfileDialogOpen && (
        <ProfileDialog
          isOpen={isProfileDialogOpen}
          handleClose={closeProfileDialog}
          openChangePassword={() =>
            setChangePass((prev) => ({ ...prev, state: true }))
          }
        />
      )}
    </React.Fragment>
  );
}
