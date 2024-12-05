import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { SxProps, Theme, ThemeProvider } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { getComparator, handleChangePage, handleChangeRowsPerPage, handleRequestSort, stableSort, theme } from "./helper"
import { paperStyle, tableBox, tableRowStyles, tableStyle } from "./style"
import { EnhancedTableToolbar } from "./tableToolbar";
import { EnhancedTableHead } from "./tableHead";
import React from "react";
import { HeadCell, Order } from "./types";


type Props<T> = {
    totalSelected: number; // number of total selected Elements
    title: string;
    ToolbarRightElement?: JSX.Element;
    rows: T[];
    handleSelectAllClick(e: React.ChangeEvent<HTMLInputElement>, currentRow: T[]): void; // In TableHead, Fn is used to tell if we selected all the elements or not
    isSelected: boolean; // isSelected means that "Select" button is clicked in navbar or not
    headCells: readonly HeadCell[];
    isItemSelected: (id: number) => boolean;
    selectAllowed: (row: T) => boolean;
    handleTableRowClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: T, isSelectAllowed: boolean) => void;
    tableCells: (row: T, labelId: string, isSelected: boolean) => JSX.Element;
    rowsPerPageOptions?: number[];
    rowsPerPageDefault?: number;
    defaultPage?: number;
    handleChangePageFn?: (page: number) => void;
    handleChangeRowsPerPageFn?: (rowPerPage: number) => void
    totalRows?: number | null;
    isAsync?: boolean;
    containerSx?: SxProps<Theme>,
    outerBoxSx?: SxProps<Theme>,
    paperSx?: SxProps<Theme>,
}


function TableViewCommon<T extends { id: number }>({
    rows,
    totalSelected,
    title,
    ToolbarRightElement = <></>,
    handleSelectAllClick,
    isSelected,
    headCells,
    isItemSelected,
    selectAllowed,
    handleTableRowClick,
    tableCells,
    rowsPerPageOptions,
    rowsPerPageDefault,
    defaultPage,
    handleChangePageFn,
    handleChangeRowsPerPageFn,
    totalRows,
    isAsync = false,
    containerSx = {},
    outerBoxSx = {},
    paperSx = {}
}: Props<T>) {
    const [order, setOrder] = React.useState<Order>("asc");
    const [currentRow, setCurrentRow] = React.useState<T[]>(() =>
        rows.slice(0, rowsPerPageDefault || 100)
    );
    const [orderBy, setOrderBy] = React.useState<keyof T>("name" as keyof T);
    const [page, setPage] = React.useState(defaultPage || 0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageDefault || 100);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        (page > 0 && !isAsync) ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows: T[] = React.useMemo(
        () => stableSort<T>(currentRow as T[], getComparator(order, orderBy)),
        //eslint-disable-next-line
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{...tableBox, ...outerBoxSx}}>
                <Paper sx={{...paperStyle, ...paperSx}}>
                    {title && <EnhancedTableToolbar
                        numSelected={totalSelected}
                        title={title}
                        ToolbarRightElement={ToolbarRightElement}
                    />}
                    <TableContainer sx={{maxHeight: "300px", ...containerSx}}>
                        <Table
                            sx={tableStyle}
                            aria-labelledby="tableTitle"
                            size={"small"}
                            stickyHeader
                        >
                            <EnhancedTableHead<T>
                                numSelected={totalSelected}
                                isSelected={isSelected}
                                order={order}
                                orderBy={orderBy as string}
                                onSelectAllClick={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectAllClick(e,currentRow)}
                                onRequestSort={(
                                    event: React.MouseEvent<unknown>,
                                    property: keyof T
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
                                headCells={headCells}
                            />
                            
                            <TableBody>
                                {visibleRows.map((row: T, index: number) => {
                                    const itemSelected = isItemSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const isSelectAllowed = selectAllowed(row);
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
                                                    handleTableRowClick(event, row,isSelectAllowed)
                                                }
                                                role="checkbox"
                                                aria-checked={itemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={itemSelected}
                                                sx={tableRowStyles}
                                            >
                                                {isSelectAllowed ?
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={itemSelected}
                                                            inputProps={{
                                                                "aria-labelledby": labelId,
                                                            }}
                                                        />
                                                    </TableCell> :
                                                    isSelected ?
                                                        <TableCell padding="checkbox">
                                                        </TableCell> : null
                                                }
                                                {tableCells(row, labelId, isSelected)}
                                            </TableRow>
                                            <TableRow>
                                                <>
                                                </>
                                            </TableRow>
                                        </>
                                    )
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
                        rowsPerPageOptions={rowsPerPageOptions || [50, 100, 150]}
                        component="div"
                        count={totalRows || rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(
                            event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
                            newPage: number
                        ) =>
                            handleChangePageFn && handleChangePageFn(newPage) ||
                            handleChangePage<T>(
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
                            handleChangeRowsPerPageFn && handleChangeRowsPerPageFn(+event.target.value) ||
                            handleChangeRowsPerPage<T>(
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
    )
}

export default TableViewCommon