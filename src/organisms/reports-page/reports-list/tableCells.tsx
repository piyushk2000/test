import TableCell from "@mui/material/TableCell"
import Box from "@mui/material/Box";
import LinkIcon from '@mui/icons-material/Link';
import { Link } from "react-router-dom";

import TooltipIcons from "../../../atoms/project-card-footer-icons";
import { Data } from "./type";

type Props = {
    row: Data;
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
                sx={{ paddingLeft: isSelected ? "0" : "1rem" }}
            >
                {row.name}
            </TableCell>
            <TableCell align="left" >
                <Box
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "fit-content" }}
                >
                    {
                        row.report_url ?
                            <Link
                                to={row.report_url}
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
        </>
    )
}

export default TableCellsRow