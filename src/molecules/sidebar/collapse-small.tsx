import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import cn from "classnames";

import { NavLink } from "react-router-dom";
import { NavigationItemType } from "./items-small";

type Props = {
  itemSmall: NavigationItemType;
  isActive: (item: string) => boolean;
  activeSmallNavTitle: string;
};

export default function SidebarCollapse({
  itemSmall,
  isActive,
  activeSmallNavTitle,
}: Props) {
  const [open, setOpen] = React.useState(
    activeSmallNavTitle === itemSmall.title
  );

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        fontSize: "14px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ width: "100%" }} onClick={handleClick}>
        <ListItemText
          sx={{ width: "100%", paddingRight: open ? 2 : 1 }}
          primary={itemSmall.title}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {itemSmall.childrens.map((menuItem: any) => {
            return (
              <NavLink
                key={menuItem.title}
                to={menuItem.href}
                className={() =>
                  isActive(menuItem.href) ? "active-link-parent" : ""
                }
              >
                <ListItemButton sx={{ pl: isActive(menuItem.href) ? 2 : 4 }}>
                  <div className={"active-link"}>
                    <ListItemText
                      sx={{ fontSize: "14px" }}
                      primary={menuItem.title}
                    />
                  </div>
                </ListItemButton>
              </NavLink>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
