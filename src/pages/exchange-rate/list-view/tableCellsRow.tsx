import { TableCell } from "@mui/material";
import { Data } from "../types";

type Props = {
    row: Data;
    labelId: string;
    isSelected: boolean;
}

const TableCellsRow = ({ row, labelId, isSelected }: Props) => {

    return (
        <>
            <TableCell align="left">
                {row.date}
            </TableCell>
            <TableCell align="left">
                {row.currency}
            </TableCell>
            <TableCell align="left">
                {row.buy_rate}
            </TableCell>
        </>
    )
}

export default TableCellsRow;