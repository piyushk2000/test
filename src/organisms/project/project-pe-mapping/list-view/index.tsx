import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
  openActions,
  stableSort,
  theme,
} from "./helper";
import {
  actionChipStyle,
  paperStyle,
  rowActionStyles,
  statusChipStyle,
  tableBox,
  tableRowStyles,
  tableStyle,
} from "./style";
import { EnhancedTableHead } from "./tableHead";
import { EnhancedTableToolbar } from "./tableToolbar";
import { selectAllowed, usePeMappingContext } from "../helper";

import InvitationChip from "../../../../atoms/project-details/invitationChip";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../../../constants";
import { useProjectPageContext } from "../../../../pages/Projects/helper";
import { setDialogTypes } from "../../../../pages/Projects/types";
import PEStatusChip from "../../../../atoms/project-details/agendaStatusChip";
import { useSnackbar } from "notistack";
import { ExpertBadge } from "../../../../atoms/profile-cardV1/ProfileCardV1";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import { LocalDayjs } from "../../../../utils/timezoneService";

type Props = {
  rows: Data[];
  project_id: string;
  setNoActionTaken: (value: boolean) => void;
  isNoActionTaken: boolean;
};

function PEExpertMappingListView({ rows, project_id, setNoActionTaken, isNoActionTaken }: Props) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [currentRow, setCurrentRow] = React.useState<Data[]>(() =>
    rows.slice(0, 100)
  );
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const { enqueueSnackbar } = useSnackbar();

  // CONTEXTS
  const { setPeDialog, refetch, setSelectExpert, selectExpert, selectedAction } = usePeMappingContext();
  const { setDialog }: { setDialog: setDialogTypes } = useProjectPageContext();

  const isSelected = (pe_id: number) => selectExpert.selectedCards.map((prev) => prev.value).indexOf(pe_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows: any = React.useMemo(
    () => stableSort(currentRow as Data[], getComparator(order, orderBy)),
    //eslint-disable-next-line
    [order, orderBy, page, rowsPerPage, JSON.stringify(currentRow)]
  );

  // URL SEARCH PARAMS
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project_title = queryParams.get("project_title") || null;
  const encoded_title = project_title ? "#" + project_id + ": " + project_title.replace(/%23/g, '#') : null;

  React.useEffect(() => {
    setCurrentRow(rows.slice(0, 100))
    //eslint-disable-next-line
  }, [JSON.stringify(rows)])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={tableBox}>
          <Paper sx={paperStyle}>
            <EnhancedTableToolbar
              numSelected={selectExpert.selectedCards.length}
              setNoActionTaken={setNoActionTaken}
              isNoActionTaken={isNoActionTaken}
              title={encoded_title}
            />
            <TableContainer>
              <Table
                sx={tableStyle}
                aria-labelledby="tableTitle"
                size={"small"}
              >
                <EnhancedTableHead
                  numSelected={selectExpert.selectedCards.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => handleSelectAllClick(event, currentRow, setSelectExpert, selectExpert, selectedAction)}
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
                  {visibleRows.map((row: Data, index: number) => {
                    const isItemSelected = isSelected(row.pe_id as number);
                    const labelId = `enhanced-table-checkbox-${index}-${row.pe_id}`;
                    const isSelectAllowed = selectAllowed(selectedAction, row);
                    const badge = row.badge;

                    return (
                      <>
                        {(isSelectAllowed || !selectExpert.isSelected) &&
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, row, selectExpert, setSelectExpert, isSelectAllowed)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                            sx={tableRowStyles}
                          >
                            {isSelectAllowed ?
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell> :
                              selectExpert.isSelected ?
                                <TableCell padding="checkbox">
                                </TableCell> : null
                            }

                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              sx={{ paddingLeft: !selectExpert.isSelected ? "1rem" : "0", minWidth: "150px" }}
                            >
                              <BoxFlex>
                                <Link
                                  to={
                                    AppRoutes.EXPERT_PROFILE +
                                    "?id=" +
                                    row.expert_id +
                                    "&page=1"
                                  }
                                  target="_blank"
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      "&:hover, &:active": {
                                        textDecoration: "underline",
                                      },
                                    }}
                                  >
                                    
                                    {row.name}            
                                  </Typography>
                                </Link>
                                {badge && (
                                        <ExpertBadge img_style={{width: "18px", borderRadius: "100%", margin: "0 5px", cursor: "pointer"}} badge={badge} />
                                )}
                              </BoxFlex>
                            </TableCell>
                            <TableCell>{row.expert_id}</TableCell>
                            <TableCell>{[row.curr_designation,row.curr_company_division].filter(f => !!f).join(" - ")}</TableCell>
                            <TableCell>{row.curr_company}</TableCell>
                            <TableCell>{row.calls_scheduled}</TableCell>
                            <TableCell>{row.calls_completed}</TableCell>
                            <TableCell>
                              <Stack direction={'column'}>
                                <div>{row?.meta?.first_invite_sent_to_expert?.state}</div>
                                <div>{row?.meta?.first_invite_sent_to_expert?.date ? LocalDayjs(row?.meta?.first_invite_sent_to_expert?.date).format('DD-MM-YYYY HH:mm') : ""}</div>
                              </Stack>
                              </TableCell>
                            <TableCell>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap="0.25rem"
                              >
                                <Chip sx={statusChipStyle(row.status)} label={row.status} />
                                {row.expert_invitation && (
                                  <InvitationChip title={row.expert_invitation} />
                                )}
                                {row.agenda_shared && (
                                  <PEStatusChip
                                    toolTipTitle={
                                      row.is_agenda_respond
                                        ? "Agenda Completed"
                                        : "Agenda Shared"
                                    }
                                    text="A"
                                    completed={row.is_agenda_respond}
                                  />
                                )}
                                {row.compliance_shared &&
                                  <PEStatusChip
                                    toolTipTitle={
                                      row.pe_compliance?.status === "Auto-Approved" ?
                                        "Compliance Auto Approved" :
                                        row.answers?.length ?
                                          "Compliance Answered" :
                                          "Compliance not answered by Expert"
                                    }
                                    text="CE"
                                    completed={row.pe_compliance?.status === "Auto-Approved"}
                                    pending={!!row.answers?.length}
                                    handleClick={async () => {
                                      if (row.answers?.length) {
                                        // Open the Answers Dialog
                                        await openActions(
                                          'Show Answers',
                                          setPeDialog,
                                          setDialog,
                                          project_id,
                                          row,
                                          refetch,
                                          enqueueSnackbar,
                                          false,
                                          row.answers
                                        );
                                      } else {
                                        if (row.pe_compliance) {
                                          await openActions(
                                            'Show Expert Compliance Questions',
                                            setPeDialog,
                                            setDialog,
                                            project_id,
                                            row,
                                            refetch,
                                            enqueueSnackbar,
                                            false
                                          );
                                        }
                                      }
                                    }}
                                  />
                                }
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Box sx={rowActionStyles}>
                                {row.Action.map((action, index) => (
                                  action === "C" ? <Tooltip title="Pending Client Compliance" arrow>
                                    <Chip
                                      key={action + index}
                                      sx={() => actionChipStyle(action)}
                                      label={action}
                                      onClick={async () => {
                                        await openActions(
                                          action,
                                          setPeDialog,
                                          setDialog,
                                          project_id,
                                          row,
                                          refetch,
                                          enqueueSnackbar
                                        );
                                      }}
                                    />
                                  </Tooltip> :
                                    <Chip
                                      key={action + index}
                                      sx={() => actionChipStyle(action)}
                                      label={action === "Shortlist" ? "Shortlist / Reject" : action}
                                      onClick={async () => {
                                        await openActions(
                                          action,
                                          setPeDialog,
                                          setDialog,
                                          project_id,
                                          row,
                                          refetch,
                                          enqueueSnackbar
                                        );
                                      }}
                                    />
                                ))}
                              </Box>
                            </TableCell>
                          </TableRow>
                        }
                      </>

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

export default PEExpertMappingListView;
