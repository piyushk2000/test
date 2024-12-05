import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { ThemeProvider } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "../../../assets/images/expert/edit.png";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { Data, Order } from "./types";
import {
  getComparator,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClick,
  handleRequestSort,
  handleSelectAllClick,
  stableSort,
  theme,
} from "./helper";
import { paperStyle, tableBox, tableRowStyles, tableStyle } from "./style";
import { EnhancedTableHead } from "./tableHead";
import { EnhancedTableToolbar } from "./tableToolbar";
import { Chip, Tooltip } from "@mui/material";
import TooltipIcons from "../../../atoms/project-card-footer-icons";
import Loading from "../../../atoms/loading";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

type Props = {
  rows: Data[];
  loading: boolean;
  openEdit: (val: any) => void;
};

function GroupListDetails({ rows, loading, openEdit }: Props) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [currentRow, setCurrentRow] = React.useState<Data[]>(() =>
    rows.slice(0, 100)
  );
  const [orderBy, setOrderBy] = React.useState<keyof Data>("group_name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const isMobile = useIsMobile();

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows: any = React.useMemo(
    () => stableSort(currentRow as Data[], getComparator(order, orderBy)),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={tableBox}>
          <Paper sx={paperStyle}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={tableStyle}
                aria-labelledby="tableTitle"
                size={"small"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => handleSelectAllClick(event, currentRow, setSelected)}
                  onRequestSort={(
                    event: React.MouseEvent<unknown>,
                    property: keyof Data
                  ) =>
                    handleRequestSort(
                      event,
                      property,
                      setOrder,
                      setOrderBy,
                      order,
                      orderBy
                    )
                  }
                  rowCount={currentRow.length}
                />
                <TableBody>
                  {loading ? <Loading loading={loading} /> :
                    <>
                      {visibleRows.map((row: Data, index: number) => {
                        const isItemSelected = isSelected(row.group_name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.group_name}
                            selected={isItemSelected}
                            sx={tableRowStyles}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox onClick={(event) =>
                                handleClick(
                                  event,
                                  row.group_name,
                                  selected,
                                  setSelected
                                )
                              }
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              // component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.group_name}
                            </TableCell>
                            <TableCell >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  flexWrap: "wrap",
                                  minWidth: "30rem",
                                }}
                              >
                                {row.admins.map((admin) => (
                                  <Tooltip key={admin.id} title={admin.name} arrow>
                                    <Chip label={admin.name.split(" ")[0]} />
                                  </Tooltip>
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <TooltipIcons
                                isIcon={true}
                                icon={EditIcon}
                                title="Edit Group"
                                handleClick={() => openEdit(row)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 33 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </>}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[50, 100, 150]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
                newPage: number
              ) =>
                handleChangePage(
                  event,
                  newPage,
                  setPage,
                  setCurrentRow,
                  rowsPerPage,
                  rows
                )
              }
              onRowsPerPageChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) =>
                handleChangeRowsPerPage(
                  event,
                  setRowsPerPage,
                  setCurrentRow,
                  setPage,
                  rows
                )
              }
            />
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default GroupListDetails;
