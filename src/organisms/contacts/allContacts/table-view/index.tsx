import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {  getAllContactsAPI, headCells, TableData } from "../types";
import NoResultFoundFilters from "../../../../atoms/noResultsFilters";
import { Skeleton } from "@mui/material";
import TableViewCommon from "../../../../molecules/table-view-common";
import TableCellsRow from "./tableCells";
import { formatDataClientTable } from "../helper";

type Props = {
    apiData: getAllContactsAPI | null;
    isFilter: boolean;
    openEditContact: (id: number) => void;
};

const ContactTable = ({ apiData, isFilter , openEditContact}: Props) => {
    return (
        <>
            {apiData?.success ? (
                <>
                    {apiData?.data?.length > 0 ? (
                        <Grid container>
                            <TableViewCommon<TableData>
                                rows={formatDataClientTable(apiData?.data || [])}
                                totalSelected={0}
                                title={``}
                                headCells={headCells}
                                isSelected={false}
                                selectAllowed={(row) => false}
                                handleTableRowClick={(e, row) => { }}
                                tableCells={(row, labelId, isSelected) => <TableCellsRow
                                    row={row}
                                    labelId={labelId}
                                    isSelected={isSelected}
                                    openEditContact={openEditContact}
                                />}
                                isItemSelected={(id) => false}
                                handleSelectAllClick={(e) => { }}
                            />
                        </Grid>
                    ) : (
                        <>
                            {!isFilter ? (
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        mt={4}
                                    >
                                        <Typography
                                            variant="h2"
                                            sx={{ fontSize: "20px", fontWeight: "500" }}
                                        >
                                            No Client Contacts Found
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <NoResultFoundFilters />
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    {[1, 2, 3, 4, 5].map(() => (
                        <>
                            <Grid item xs={2} sx={{ padding: "10px 5px", paddingLeft: "1rem" }}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={2} sx={{ padding: "10px 5px" }}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={2} sx={{ padding: "10px 5px" }}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={2} sx={{ padding: "10px 5px" }}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={2} sx={{ padding: "10px 5px" }}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={2} sx={{ padding: "10px 5px" }}>
                                <Skeleton />
                            </Grid>
                        </>
                    ))}
                </>
            )}
        </>
    );
};

export default ContactTable;
