import TableCell from "@mui/material/TableCell"
import Box from "@mui/material/Box";
import { TableData } from "./types";
import { Typography, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { editAdminClickHandler } from "../../admin/admin-list/helper";

type Props = {
    row: TableData;
    labelId: string;
    isSelected: boolean;
    clientId: string;
    clientName: string;
}

const TableCellsRow = ({ row, labelId, isSelected, clientId, clientName }: Props) => {
    const navigate = useNavigate();
    return (
        <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={{ paddingLeft: isSelected ? "0" : "1rem" }}
            >
                {row.month}
            </TableCell>
            <TableCell align="left" >$ {row.total_revenue ? row.total_revenue.toFixed(2) : row.total_revenue}</TableCell>
            <TableCell align="left" >
                <Typography
                    sx={row.total_calls ? {
                        color: "rgb(35, 174, 73)",
                        textDecoration: "underline",
                        fontWeight: '500',
                        cursor: "pointer",
                        width: "fit-content"
                    } : {}}
                    onClick={() => {
                        if (row.total_calls) {
                            const url = `${AppRoutes.CALLS}?client_id=${clientId}&client_name=${clientName}&start_call_month=${row.call_month_year[0]}&start_call_year=${row.call_month_year[1]}`;
                            navigate(url);
                        }
                    }}
                >{row.total_calls}</Typography>
            </TableCell>
            <TableCell align="left">
                <Typography
                    sx={row.projects.length ? {
                        color: "rgb(35, 174, 73)",
                        textDecoration: "underline",
                        fontWeight: '500',
                        cursor: "pointer",
                        width: "fit-content"
                    } : {}}
                    onClick={() => {
                        if (row.projects.length) {
                            const url = `${AppRoutes.PROJECTS}/all?page=1&client_projects=${row.projects.join(",")}`;
                            navigate(url);
                        }
                    }}>{row.projects.length}</Typography>
            </TableCell>
            <TableCell align="left">
                <Typography
                    sx={row.client_contact.length ? {
                        color: "rgb(35, 174, 73)",
                        textDecoration: "underline",
                        fontWeight: '500',
                        cursor: "pointer",
                        width: "fit-content"
                    } : {}}
                    onClick={() => {
                        if (row.client_contact.length) {
                            const url = `${AppRoutes.CONTACTS}/all?fkClient=${clientId}&name=${clientName}&contact_ids=${row.client_contact.join(",")}`;
                            navigate(url);
                        }
                    }}>{row.client_contact.length ? `${row.client_contact.length} POCs` : "-"}</Typography>

            </TableCell>
            <TableCell align="left">
                <Typography
                    sx={row.POCs_added.length ? {
                        color: "rgb(35, 174, 73)",
                        textDecoration: "underline",
                        fontWeight: '500',
                        cursor: "pointer",
                        width: "fit-content"
                    } : {}}
                    onClick={() => {
                        if (row.POCs_added.length) {
                            const url = `${AppRoutes.CONTACTS}/all?fkClient=${clientId}&name=${clientName}&contact_ids=${row.POCs_added.map(c => c.value).join(",")}`;
                            navigate(url);
                        }
                    }}>
                    {row.POCs_added.length ?
                        <Tooltip title={row.POCs_added.map(c => c.label).join(", ")} arrow>
                            <span>{row.POCs_added.length} POCs</span>
                        </Tooltip>
                        : "-"}
                </Typography>
            </TableCell>
        </>
    )
}

export default TableCellsRow