import { Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import TableCell from "@mui/material/TableCell"
import { TableData } from "../types";
import defaultImage from "../../../../assets/images/expert/default_profle_image.png"
import LockResetIcon from '@mui/icons-material/LockReset';
import { useSnackbar } from "notistack";
import { Link, useLocation } from "react-router-dom";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { sendForgetPassLink } from "../../../login/helper";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { AppRoutes } from "../../../../constants";
import { linkTableStyle } from "../helper";

type Props = {
    row: TableData;
    labelId: string;
    isSelected: boolean;
    openEditContact: (id: number) => void;
}


const TableCellsRow = ({ row, labelId, isSelected, openEditContact }: Props) => {
    const { setLoading: setSubmitted } = useFullPageLoading();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const company = queryParams.get("name");

    return (
        <>
            <TableCell
                align="left"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <Avatar className="img" src={defaultImage} />
                <Chip label="Active" sx={{ marginLeft: '5px' }} />
                {row.is_compliance_officer &&
                    <Chip sx={{ fontWeight: "500", fontSize: "12px", marginLeft: '5px', backgroundColor: "var(--primary-color)" }} label="Compliance Officer" />
                }
            </TableCell>

            <TableCell align="left" >{row.name}
            </TableCell>
            <TableCell align="left">{row.designation}
            </TableCell>
            <TableCell align="left">{company || ""}
            </TableCell>
            <TableCell align="left">
                {row.email}
            </TableCell>
            <TableCell align="left">
                {row.mobile}
            </TableCell>
            <TableCell sx={{ minWidth: "145px" }} align="left">
                <LinkTableCell 
                    link={row.total_projects ? `${AppRoutes.PROJECTS}/all?page=1&client_projects=${row.total_projects}` : undefined}
                    label={row.total_projects ? row.total_projects.split(",").length.toString() : "0"}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "170px" }} align="left">
                <LinkTableCell 
                    link={row.serviced_projects ? `${AppRoutes.PROJECTS}/all?page=1&client_projects=${row.serviced_projects}` : undefined}
                    label={row.serviced_projects ? row.serviced_projects.split(",").length.toString() : "0"}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "145px" }} align="left">
                <LinkTableCell 
                    link={row.calls_taken ? `${AppRoutes.CALLS}?call_ids=${row.calls_taken}` : undefined}
                    label={row.calls_taken ? row.calls_taken.split(",").length.toString() : "0"}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "155px" }} align="left">
                {row.revenue_done == '0' ? "0" : `$ ${row.revenue_done}`}
            </TableCell>
            <TableCell sx={{ display: "flex", alignItems: "center", width: "fit-content" }} >
                <BoxFlex sx={{ gap: "0.5rem" }}>
                    <Tooltip title="Edit Contact Details" arrow>
                        <IconButton onClick={() => {
                            openEditContact(row.id)
                        }}>
                            <EditNoteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset Password" arrow>
                        <IconButton onClick={async () => {
                            setSubmitted(true);
                            await
                                sendForgetPassLink(
                                    row.email,
                                    () => { },
                                    setSubmitted,
                                    enqueueSnackbar,
                                    true
                                )
                        }}>
                            <LockResetIcon />
                        </IconButton>
                    </Tooltip>
                </BoxFlex>
            </TableCell>
        </>
    )
}

function LinkTableCell({ link, label }: { link?: string, label: string }) {

    return (
        <>
            {link ?
                <Link style={linkTableStyle} rel="noreferrer noopener" target="_blank" to={link}>
                    {label}
                </Link> :
                <>
                    {label}
                </>
            }
        </>
    )

}

export default TableCellsRow