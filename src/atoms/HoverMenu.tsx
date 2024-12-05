import * as React from "react";
import "../molecules/project-card/style.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TooltipIcons from "../atoms/project-card-footer-icons";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip";
import { isAdmin, isSuperAdmin } from "../utils/role";

export default function BasicMenu({
  icon,
  title,
  type,
  workstream_allowed,
  onLogExtensionClick,
  onLogWorkStreamClick,
  handleViewProject,
  isLinkedProjects,
  noOfProjectsLinked,
  handleLinkProject,
  handleDeLinkProject,
  isAccountManager
}: {
  icon: string;
  title: string;
  type:string;
  workstream_allowed:boolean;
  onLogExtensionClick: () => void;
  onLogWorkStreamClick: () => void;
  handleViewProject: (b: boolean) => void;
  isLinkedProjects: boolean;
  noOfProjectsLinked: number | undefined;
  handleLinkProject: () => void;
  handleDeLinkProject: () => void;
  isAccountManager:boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => {
    onLogExtensionClick();
    setAnchorEl(null);
  };
  const handleOpenWorkstreamModal = () => {
    onLogWorkStreamClick();
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const CustomFontTheme = createTheme({
    typography: {
      fontSize: 12.25,
      fontFamily: "'Montserrat', sans-serif",
    },
  });

  // Checking if the project linked projects are not undefined and not Zero
  const projectsLinkedNo = noOfProjectsLinked ? (noOfProjectsLinked > 0 ? noOfProjectsLinked : null) : null;

  return (
    <div>
      <ThemeProvider theme={CustomFontTheme}>
        <Box sx={{ position: "relative" }}>
          <TooltipIcons
            icon={icon}
            isIcon={true}
            title="Link Menu"
            handleClick={handleClick}
          />
          {projectsLinkedNo && <Typography sx={{
            position: "absolute",
            px: "5px",
            backgroundColor: isLinkedProjects ? "#EC9324" : "#E8EAE9",
            borderRadius: "100%",
            fontSize: "5px",
            top: "-11px",
            right: "-11px",
            color: isLinkedProjects ? "#fff !important" : "black"
          }}>{projectsLinkedNo}</Typography>}
        </Box>


        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            style: {
              fontSize: "14px",
            },
          }}
          sx={{ fontSize: "14px" }}
        >
          {!isAdmin() &&
            <MenuItem onClick={() => {
              handleLinkProject();
              handleClose();
            }}>Link Project</MenuItem>
          }
          {(!isAdmin() && (type == "Project") ) &&
            <MenuItem onClick={handleOpenModal}>Log Extension</MenuItem>
          }
          
            {((type === 'Project') && (workstream_allowed)) && <MenuItem onClick={handleOpenWorkstreamModal}>New Workstream</MenuItem>}
          
          {projectsLinkedNo &&
            <MenuItem onClick={() => {
              handleViewProject(isLinkedProjects);
              handleClose();
            }}
              sx={{
                color: isLinkedProjects ? "white" : "initial",
                backgroundColor: isLinkedProjects ? "#EC9324" : "initial",

                "&:hover": {
                  color: isLinkedProjects ? "white" : "initial",
                  backgroundColor: isLinkedProjects ? "#EC9324" : "initial"
                }
              }}
            >{isLinkedProjects ? "View All Projects" : "View Linked Projects"}</MenuItem>
          }
          {projectsLinkedNo && !isAdmin() &&
            <Tooltip title="Delink this project from all other projects" arrow>
              <MenuItem onClick={handleDeLinkProject}>Delink</MenuItem>
            </Tooltip>
          }
        </Menu>
        {/* <LogExtension open={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </ThemeProvider>
    </div>
  );
}
