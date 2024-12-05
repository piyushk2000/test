import TableCell from "@mui/material/TableCell"
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { RowsData } from "./type";
import { Chip } from "@mui/material";

type Props = {
    row: RowsData;
    labelId: string;
    isSelected: boolean;
}

const TableCellsRow = ({ row, labelId, isSelected }: Props) => {
    return (
        <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={{ paddingLeft: isSelected ? "0" : "1rem", minWidth: "150px" }}
            >
                {row.expert_name}
            </TableCell>
            <TableCell align="left">
                <ChipField
                    label={row.excluded ? "YES": "NO"}
                    color={row.excluded ? "rgb(0, 144, 0) !important" : "gray"}
                />
            </TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.current_company_name}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.current_designation}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.relevant_company_name}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.relevant_designation}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.expert_base_location}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.added_on}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.last_updated}</TableCell>
        </>
    )
}

function ChipField({ label, color }: { label: string, color: string }) {
    return (
        <Chip label={label} sx={{
            color,
            fontWeight: "600",
            fontSize: "12px",
            borderRadius: "5px"
        }} />
    )
}

export default TableCellsRow