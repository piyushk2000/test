

import TableCell from "@mui/material/TableCell"
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { RowData } from "./types";
import { Button, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { LocalDayjs } from "../../utils/timezoneService";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { actionClickHandler } from "./helper";
import { usePaymentsRequestsContext } from "./context";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { handleCopy } from "../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import AttachmentIcon from '@mui/icons-material/Attachment';



const TableCellsRow = ({ row, labelId, isSelected }: { row: RowData, labelId: string, isSelected: boolean }) => {
    const { setDialog } = usePaymentsRequestsContext();
    const { enqueueSnackbar } = useSnackbar();

    const isCallRemarksAvailable = !!row.calls.find(d => !!d.remark);

    return (
        <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={{ paddingLeft: isSelected ? "0" : "1rem", minWidth: "120px" }}
            >
                {row.expert_id}
            </TableCell>
            <TableCell sx={{ minWidth: "200px" }}>
                <BoxFlex sx={{ gap: "1rem" }}>
                    <span>
                        {row.expert_name}
                    </span>
                    {row.no_pe_certificate &&
                        <Link
                            to={row.no_pe_certificate}
                            target="_blank"
                        >
                            <Tooltip title="PE Certificate">
                                <IconButton
                                    sx={{ color: "var(--primary-color)", padding: "5px", marginTop: "3px" }}
                                >
                                    <AttachmentIcon sx={{ fontSize: "18px" }} />

                                </IconButton>
                            </Tooltip>
                        </Link>
                    }
                </BoxFlex>
            </TableCell>
            <TableCell sx={{ minWidth: "125px" }}>
                <BoxFlex sx={{ gap: "0.5rem", alignItems: 'center' }}>
                    <p
                        style={{ color: "var(--primary-color)", textDecoration: "underline" }}
                        onClick={() => {
                            setDialog((prev) => ({
                                ...prev,
                                callDetails: {
                                    state: true,
                                    rowData: row
                                }
                            }))
                        }}
                    >{row.total_calls}</p>

                    {isCallRemarksAvailable &&
                        <Tooltip title="View Call Remarks" arrow>
                            <IconButton sx={{ color: "var(--primary-color)", padding: "5px", marginTop: "3px" }}
                                onClick={() => {
                                    setDialog((prev) => ({
                                        ...prev,
                                        callDetails: {
                                            state: true,
                                            rowData: row
                                        }
                                    }))
                                }}
                            >
                                <MarkUnreadChatAltIcon sx={{ width: "15px", height: "15px" }} />
                            </IconButton>
                        </Tooltip>
                    }
                </BoxFlex>
            </TableCell>
            <TableCell sx={{ minWidth: "140px" }}>{row.callIds.split(",").length <= 2 ? row.callIds :
                <>
                    {row.callIds.split(",").slice(0, 2).join(", ")}
                    <Tooltip title={row.callIds.split(",").slice(2).join(", ")} arrow>
                        <span style={{ color: "var(--green-color)", marginLeft: "0.5rem", textDecoration: "underline" }}>+{row.callIds.split(",").slice(2).length} more</span>
                    </Tooltip>
                </>
            }</TableCell>
            <TableCell sx={{ minWidth: "130px" }}>{row.amount}</TableCell>
            <TableCell sx={{ minWidth: "130px" }}>
            {(row.status === "Approved" || row.status === "Paid" || row.status === "Partially Paid") ?
                    <BoxFlex>
                        <Tooltip title={<BoxFlex sx={{ gap: "0.25rem" }}><EditIcon sx={{ fontSize: "14px" }} /> <p>Click to Edit</p></BoxFlex>} arrow>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    },
                                    fontSize: "0.75rem",
                                    width: '100%'
                                }}
                                onClick={() => {
                                    setDialog((prev) => ({
                                        ...prev,
                                        editTdsAmount: {
                                            state: true,
                                            row_data: row
                                        }
                                    }))
                                }}
                            >{row.tds_amount}</Typography>
                        </Tooltip>
                    </BoxFlex>
                     : <></>}
            </TableCell>
            <TableCell sx={{ minWidth: "130px" }}>
                {(row.status === "Approved" || row.status === "Paid" || row.status === "Partially Paid") ?
                    <BoxFlex>
                        <Tooltip title={<BoxFlex sx={{ gap: "0.25rem" }}><EditIcon sx={{ fontSize: "14px" }} />{row.declaration_date ? <p>Click to Edit</p> : <p>Click to Add</p>}</BoxFlex>} arrow>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    },
                                    fontSize: "0.75rem",
                                    width: '100%'
                                }}
                                onClick={() => {
                                    setDialog((prev) => ({
                                        ...prev,
                                        editDeclarationDate: {
                                            state: true,
                                            rows_data: [row],
                                            isBulk: false
                                        }
                                    }))
                                }}
                            >

                                {row.declaration_date ? LocalDayjs(row.declaration_date).format("DD MMM YYYY") : <CustomBtnFilled variant="contained" label="Add Date" />}
                            </Typography>
                        </Tooltip>
                    </BoxFlex>
                    : ""}</TableCell>
            <TableCell sx={{ minWidth: "120px" }}>
                <ChipField
                    label={row.currency}
                    color={row.currency === "USD" ? "#002665" : row.currency === "INR" ? "#FF7E2A" : "gray"}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "150px" }}>
                <ChipField
                    label={row.request_generated_by?.title}
                    color={row.request_generated_by?.title === "Expert" ? "#009000" : "gray"}
                    name = {row.request_generated_by?.name}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "160px" }}>
                <Tooltip title={LocalDayjs(row.requested_on).format("DD/MM/YYYY HH:mm:ss")} arrow>
                    <p>{LocalDayjs(row.requested_on).format("DD/MM/YYYY")}</p>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ minWidth: "145px" }}>
                {row.reviewed_on ?
                    <Tooltip title={LocalDayjs(row.reviewed_on).format("DD/MM/YYYY HH:mm:ss")} arrow>
                        <p>{LocalDayjs(row.reviewed_on).format("DD/MM/YYYY")}</p>
                    </Tooltip> :
                    "-"
                }
            </TableCell>
            <TableCell>
                <Box
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    {
                        row.invoice ?
                            row.invoice.includes("/documents?type=Invoice") ?
                                <TooltipIcons
                                    title="Invoice Url"
                                    isIcon={false}
                                    isMaterialIcon={true}
                                    MaterialIcon={LinkIcon}
                                    sxIconButton={{ padding: "5px", width: "30px", height: "30px" }}
                                    sxMaterialIcon={{ fontSize: "20px" }}
                                    handleClick={() => {
                                        setDialog((prev) => ({
                                            ...prev,
                                            invoice: {
                                                state: true,
                                                invoice_url: row.invoice_no
                                            }
                                        }))
                                    }}
                                /> :
                                <Link
                                    to={row.invoice}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <TooltipIcons
                                        title="Invoice Url"
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
            <TableCell>
                <ChipField
                    label={row.status}
                    color={
                        (() => {
                            switch (row.status) {
                                case "Requested": {
                                    return "#00308F"
                                }
                                case "Approved": {
                                    return "var(--green-color)"
                                }
                                case "On Hold": {
                                    return "gray"
                                }
                                case "Rejected": {
                                    return "red"
                                }
                                default: {
                                    return "gray"
                                }
                            }
                        })()
                    }
                />
            </TableCell>
            <TableCell sx={{ minWidth: "120px" }}>
                <BoxFlex>
                    {row.high_priority ?
                        <BoxFlex sx={{ justifyContent: "center", backgroundColor: "#ff5252", color: "white", fontWeight: "500", borderRadius: "100%", width: "30px", height: "30px" }}>
                            <p>{row.high_priority}</p>
                        </BoxFlex>
                        : "-"}
                </BoxFlex>
            </TableCell>
            <TableCell sx={{ minWidth: "170px", maxWidth: "250px" }}>
                <Box
                    sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                    {row.review_remarks ?
                        <Box sx={{ maxWidth: "90%" }}>
                            <Tooltip title={row.review_remarks} arrow>
                                <Box sx={{
                                    "& p": {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "100%",
                                        fontWeight: "500",
                                    }
                                }}>
                                    <p>{row.review_remarks}</p>
                                </Box>
                            </Tooltip>
                        </Box>
                        : ""}
                    {
                        row.infollion_remarks_details ?
                            <TooltipIcons
                                title={row.infollion_remarks_details}
                                isIcon={false}
                                text="i"
                                isMaterialIcon={false}
                                MaterialIcon={false}
                                sxIconButton={{ padding: "5px", width: "30px", height: "30px" }}
                                sxMaterialIcon={{ fontSize: "20px" }}
                                sxText={{ fontFamily: "serif !important" }}
                            />
                            : "-"
                    }
                </Box>
            </TableCell>
            <TableCell sx={{ minWidth: "160px" }}>
                <ChipField
                    label={row.auto_generated}
                    color={row.auto_generated === "Yes" ? "rgb(0, 144, 0) !important" : "gray"}
                />
            </TableCell>
            <TableCell sx={{ minWidth: "220px" }}>
                {row.invoice_no ?
                    <Button sx={{ textTransform: "unset", fontSize: "12px" }} onClick={() => handleCopy(row.invoice_no || "", enqueueSnackbar, "Invoice Number")}>
                        {row.invoice_no}
                    </Button> : <></>
                }
            </TableCell>
            <TableCell sx={{ minWidth: "250px" }}>
                <div>
                    {row.actions.map(action =>
                        <CustomBtnFilled
                            key={action}
                            label={action}
                            variant="contained"
                            onClick={() => actionClickHandler(row, setDialog, action)}
                        />
                    )}
                </div>
            </TableCell>
        </>
    )
}

function ChipField({ label, color, name }: { label: string, color: string, name?:string }) {
    return (
        <Tooltip title={name}>
            <Chip label={label} sx={{
                color,
                fontWeight: "600",
                fontSize: "12px",
                borderRadius: "5px"
            }} />
        </Tooltip>
    )
}

export default TableCellsRow