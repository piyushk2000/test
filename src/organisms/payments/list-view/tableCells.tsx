import TableCell from "@mui/material/TableCell"
import LinkIcon from '@mui/icons-material/Link';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { RowData } from "../../../pages/payments/types"
import TooltipIcons from "../../../atoms/project-card-footer-icons";
import { AppRoutes } from "../../../constants";



const TableCellsRow = ({ row, labelId, isSelected }: { row: RowData, labelId: string, isSelected: boolean }) => {
    return (
        <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={{ paddingLeft: "1rem", minWidth: "105px" }}
            >
                {row.id}
            </TableCell>
            <TableCell sx={{ minWidth: "118px" }}>
                <Link to={AppRoutes.EXPERT_PROFILE + "?id=" + row.expert_id + "&page=1"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p style={{ color: "#ec9324", textDecoration: "underline" }}>#{row.expert_id}</p>
                </Link>
            </TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell sx={{ minWidth: "130px" }}>{row.amount_in_usd}</TableCell>
            <TableCell sx={{ minWidth: "130px" }}>{row.amount_in_inr}</TableCell>
            <TableCell sx={{ minWidth: "120px" }}>{row.date}</TableCell>
            <TableCell>
                <Box
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    {
                        row.doc_link ?
                            <Link
                                to={row.doc_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TooltipIcons
                                    title="Transaction Document Url"
                                    isIcon={false}
                                    isMaterialIcon={true}
                                    MaterialIcon={LinkIcon}
                                    sxIconButton={{ padding: "5px", width: "30px", height: "30px" }}
                                    sxMaterialIcon={{ fontSize: "20px" }}
                                />
                            </Link>
                            : "-"
                    }
                </Box>
            </TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.narration}</TableCell>
        </>
    )
}

export default TableCellsRow