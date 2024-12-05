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
} from "@mui/material";
import { useState } from "react";
import "./advance-settings-table.scss";
import { advanceSettingData } from "./helper";
import CheckIcon from "@mui/icons-material/Check";

const AdvanceSettingsTable = (props: any) => {
  const [rowStates, setRowStates] = useState(
    advanceSettingData.map(() => ({
      checked: Array(advanceSettingData.length - 1).fill(false),
    }))
  );

  const { selectSettings } = props;

  const toggleCellState = (rowIndex: number, cellIndex: number) => {
    const newRowStates = [...rowStates];
    newRowStates[rowIndex].checked[cellIndex] =
      !newRowStates[rowIndex].checked[cellIndex];
    setRowStates(newRowStates);
  };

  return (
    <>
      <Box className="advance-settings-table-container">
        <Typography className="advance-settings-table-name">Access</Typography>
        <TableContainer className="table-container">
          <Table>
            <TableHead className="table-header">
              <TableRow className="table-header-row">
                <TableCell align="center"></TableCell>
                <TableCell align="center">Projects</TableCell>
                <TableCell align="center">Calls</TableCell>
                <TableCell align="center">Expert</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Value Chain</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {advanceSettingData.map((data, rowIndex) => {
                return (
                  <TableRow key={rowIndex} className="table-body-row">
                    <TableCell align="left">{data}</TableCell>
                    {rowStates[rowIndex].checked.map((isChecked, cellIndex) => (
                      <TableCell key={cellIndex} align="center">
                        {selectSettings ? (
                          <Checkbox
                            size="small"
                            sx={{
                              "&.MuiCheckbox-root": { color: "#707070" },
                              "&.Mui-checked": { color: "#EC9324" },
                            }}
                            checked={isChecked}
                            onChange={() =>
                              toggleCellState(rowIndex, cellIndex)
                            }
                          />
                        ) : (
                          isChecked && (
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
                          )
                        )}
                      </TableCell>
                    ))}
                    <TableCell align="center"></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default AdvanceSettingsTable;
