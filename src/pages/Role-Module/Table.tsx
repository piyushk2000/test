import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import "./style.scss";
import { modules, roleModulesMatrix, roles, options } from "./helper";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import BusinessIcon from "@mui/icons-material/BusinessOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { useLocalStorage } from "usehooks-ts";

const AdvanceSettingsTable = (props: any) => {
  const [RoleMatrix, setRoleMatrix] = useLocalStorage('roledata', roleModulesMatrix);
  const [activeRole, setActiveRole] = useState("")
  const [activeMoule, setActiveModule] = useState("")

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>, role: string, module: string) => {
    setAnchorEl(event.currentTarget);
    setActiveRole(role)
    setActiveModule(module)
  };

  const {enqueueSnackbar} = useSnackbar()

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    //validation 

    let atleastOnFA = false;
    let newRoleMatrix = RoleMatrix;

      if(RoleMatrix[activeRole][activeMoule] === options[index]){
        newRoleMatrix = { ...RoleMatrix, [activeRole]: { ...RoleMatrix[activeRole], [activeMoule]: "" } }
    } else{

         newRoleMatrix = { ...RoleMatrix, [activeRole]: { ...RoleMatrix[activeRole], [activeMoule]: options[index] } }
    }

    roles.forEach((role) => {
        if (newRoleMatrix[role][activeMoule] === "Full Access") {
            atleastOnFA = true;
        }
    })

    if (!atleastOnFA){
        enqueueSnackbar("At least one role should have full access on this module", {variant: "error"})
        return
    }

    setRoleMatrix(newRoleMatrix)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box className="advance-settings-table-container">
            {
                activeRole && activeMoule ?   <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={RoleMatrix[activeRole][activeMoule] === option}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu> : null
            }
        

          <Typography className="advance-settings-table-name">
            Access
          </Typography>
          <TableContainer className="table-container">
            <Table>
              <TableHead className="table-header">
                <TableRow className="table-header-row">
                  <TableCell align="center"></TableCell>
                  {
                    modules.map((module, index) => (
                      <TableCell key={index} align="center">{module}</TableCell>
                    ))
                  }
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((data, rowIndex) => {
                  return (
                    <TableRow key={rowIndex} className="table-body-row">
                      <TableCell  align="left">{data}</TableCell>
                      {Object.entries(RoleMatrix[data]).map(
                        (moduleData, cellIndex) => (
                          <TableCell
                            onClick={(e) => handleClickListItem(e, data, moduleData[0])}
                            key={cellIndex}
                            align="center"
                            sx={{
                              "&:hover": {
                                backgroundColor: "#EAEAEA",
                                cursor: "pointer",
                              },
                            }}
                          >
                            {
                                moduleData[1] === "Full Access" ?  <FullAccessIcon /> : null
                            }
                            {
                                moduleData[1] === "ReadOnly" ?  <ReadOnlyIcon /> : null
                            }
                            {
                                moduleData[1] === "Client Specific" ?  <ClientSpecificIcon /> : null
                            }
                          </TableCell>
                        )
                      )}
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Box mt={2} style={{display:"flex", gap: 2, justifyContent: "flex-end"}}>
                
                <Stack spacing={1.5} mr={4}>
                    <Box sx={{display:"flex", gap: 1, alignItems: "center"}}>
                        <ReadOnlyIcon /> <Typography>ReadOnly</Typography>
                    </Box>
                    <Box sx={{display:"flex", gap: 1, alignItems: "center"}}>
                        <FullAccessIcon /> <Typography>Full Access</Typography>
                    </Box>
                    <Box sx={{display:"flex", gap: 1, alignItems: "center"}}>
                        <ClientSpecificIcon /> <Typography>Client Specific</Typography>
                    </Box>
                </Stack>
            </Box>
          </TableContainer>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default AdvanceSettingsTable;


const FullAccessIcon = () => {
    return (
        <IconButton
            sx={{
                color: "#fff",
                backgroundColor: "#55C3AA",
                height: "26px",
                width: "55px",
                borderRadius: "23px",
                "&:hover": {
                    backgroundColor: "#55C3AA",
                },
            }}
        >
            <CheckIcon sx={{ fontSize: "20px" }} />
        </IconButton>
    );
};

const ReadOnlyIcon = () => {
    return (
        <IconButton
            sx={{
                color: "#fff",
                backgroundColor: "#EAEAEA",
                height: "26px",
                width: "55px",
                borderRadius: "23px",
                "&:hover": {
                    backgroundColor: "#EAEAEA", 
                },
            }}
        >
            <VisibilityIcon sx={{ fontSize: "20px", color: "#FFA500" }} /> 
        </IconButton>
    );
};

const ClientSpecificIcon = () => {
    return (
        <IconButton
            sx={{
                color: "#fff",
                backgroundColor: "#3F51B5",
                height: "26px",
                width: "55px",
                borderRadius: "23px",
                "&:hover": {
                    backgroundColor: "#3F51B5",
                },
            }}
        >
            <BusinessIcon sx={{ fontSize: "20px" }} />
        </IconButton>
    );
};
