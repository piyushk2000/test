import { useMemo } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import Collapse from "./collapse";
import { getSidebarItems } from "./items";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Stack from "@mui/material/Stack";
import { AppRoutes } from "../../constants";

const drawerWidth = 200;

export default function SideBar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const { pathname, } = location;
  const items = getSidebarItems()

  function isActiveNavTitle() {
    const currentUrl = new URL(window.location.href);
    const currentPathname = currentUrl.pathname;
    const currentStatus = currentUrl.searchParams.get('status');

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].childrens.length; j++) {
        const child = items[i].childrens[j];
        if (isUrlMatch(child.href, currentPathname, currentStatus)) {
          return items[i].title;
        }
      }
    }
    return "/";
  }

  function isUrlMatch(itemHref: any, currentPathname: any, currentStatus: any) {
    const itemUrl = new URL(itemHref, window.location.origin);

    if (itemUrl.pathname.includes(AppRoutes.EXPERT_SEARCH)) {
      // If it does, also check the status query parameter
      const itemStatus = itemUrl.searchParams.get('status') || itemUrl.searchParams.get("added");
      return itemStatus === currentStatus && itemUrl.pathname === currentPathname
    }

    // For other pages, just compare the pathname
    return itemUrl.pathname === currentPathname;
  }

  const activeNavTitle = useMemo(
    isActiveNavTitle,
    //eslint-disable-next-line
    [pathname]
  );

  function isActive(checkingItem: string) {
    const currentUrl = new URL(window.location.href);
    const currentPathname = currentUrl.pathname;
    const currentStatus = currentUrl.searchParams.get('status') || currentUrl.searchParams.get("added");
    const isActiveNav = isUrlMatch(checkingItem, currentPathname, currentStatus);
    return isActiveNav;
  }

  return (
    <>
      <Drawer
        PaperProps={{ style: { border: "none" } }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <Stack
          sx={{ p: "8px 16px" }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              width: {
                xs: "100px",
              },
              height: "auto",
            }}
          >
            <img src={Logo} alt="Infollion Logo" />
          </Box>
          <IconButton
            disableFocusRipple
            onClick={onClose}
            sx={{
              width: {
                xs: "32px",
                sm: "24px",
              },
              height: {
                xs: "32px",
                sm: "24px",
              },
              padding: 0,
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <List component="nav">
          {items.map((item) => (
            <Collapse
              key={item.title}
              activeNavTitle={activeNavTitle}
              isActive={isActive}
              item={item}
              onClose={onClose}
            />
          ))}
        </List>
      </Drawer>
    </>
  );
}
