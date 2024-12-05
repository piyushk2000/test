import * as React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import cn from "classnames";

import { NavLink } from "react-router-dom";
import { NavigationItemType } from "./items";
import { isAdmin } from "../../utils/role";

type Props = {
  item: NavigationItemType;
  isActive: (item: string) => boolean;
  activeNavTitle: string;
  onClose: () => void;
};

export default function SidebarCollapse({
  item,
  isActive,
  activeNavTitle,
  onClose
}: Props) {
  const openDefaultValue = () => {
    if (isAdmin()) {
      if (item.title === "Engagements" || item.title === "Experts") {
        return true;
      }
    }

    return activeNavTitle === item.title
  }
  const [open, setOpen] = React.useState(openDefaultValue());
  const [buttonStyle, setButtonStyle] = useState({
    fontSize: "14px",
    fontWeight: "500",
  });
  const handleStyleClick = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      fontSize: "25px",
      fontWeight: "600",
    }));
  };

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
      <ListItemButton
        onClick={handleClick}
        sx={{
          backgroundColor: open ? "rgba(236, 147, 36, 0.12)" : "",
          borderBottomRightRadius: "32px",
          borderTopRightRadius: "32px",
          borderLeft: open ? "3px solid #EC9324" : "",
          color: open ? "#EC9324" : "",
          "&:hover": {
            backgroundColor: open ? "rgba(236, 147, 36, 0.12)" : "",
          },
        }}
      >
        <ListItemText primaryTypographyProps={{ fontSize: "14px" }} primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.childrens.map((menuItem: any) => {
            return (
              <NavLink
                key={menuItem.title}
                to={menuItem.href}
                className={() =>
                  isActive(menuItem.href) ? "active-link-parent" : ""
                }
                onClick={menuItem.href ? onClose : undefined}
              >
                <ListItemButton sx={{ pl: isActive(menuItem.href) ? 2 : 3 }}>
                  <div
                    className={"active-link"}
                    style={{
                      backgroundColor: isActive(menuItem.href)
                        ? "transparent"
                        : "",
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "12px" }}
                      primary={menuItem.title}
                      sx={{
                        fontSize: open ? "14px" : "",
                        color: isActive(menuItem.href) ? "#EC9324" : "",
                        fontWeight: isActive(menuItem.href) ? "900" : "",
                        margin: "1px 0px"
                      }}
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
