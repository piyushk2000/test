import TableCell from "@mui/material/TableCell"
import Box from "@mui/material/Box";

import { editAdminClickHandler, getColorsForRole } from "./helper";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAdminContext } from "../../../pages/Admin/context";
import { Data } from "./types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CustomChip } from "../../../atoms/chips/CustomChip";

type Props = {
    row: Data;
    labelId: string;
    isSelected: boolean;
    refetchAdminData(): Promise<void>
}

const TableCellsRow = ({ row, labelId, isSelected, refetchAdminData }: Props) => {
    const { setDialogOpen } = useAdminContext();
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
            <TableCell align="left" >{row.id}</TableCell>
            <TableCell align="left" >{row.mobile}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="left">
                <CustomChip
                    label={row.role}
                    color={getColorsForRole(row.role).color}
                    bg={getColorsForRole(row.role).bg}
                    sx={{
                        "& span": {
                            fontSize: "12px !important",
                            fontWeight: "500"
                        }
                    }}
                />
            </TableCell>
            <TableCell sx={{ display: "flex", alignItems: "center", width: "fit-content" }}>
                {row.actions ?
                    <> <Tooltip title="Edit Admin" arrow>
                        <IconButton disabled={!row.is_active} onClick={() => editAdminClickHandler(setDialogOpen, row, refetchAdminData)}>
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                        <Tooltip title="Change Password" arrow>
                            <IconButton disabled={!row.is_active} onClick={() => setDialogOpen((prev) => ({
                                ...prev,
                                changePass: {
                                    state: true,
                                    admin_id: row.id.toString(),
                                    admin_name: row.name
                                }
                            }))}>
                                <LockIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={row.is_active ? "Deactivate" : "Activate"} arrow>
                            <IconButton
                                // disabled={!row.is_active}
                                onClick={() => setDialogOpen((prev) => ({
                                    ...prev,
                                    [row.is_active ? 'deactivate' : 'activate']: {
                                        state: true,
                                        admin_id: row.id.toString(),
                                        admin_name: row.name
                                    }
                                }))}>
                                {row.is_active ? (
                                    <BlockIcon style={{ fill: '#fa30309b' }} />
                                ) : (
                                    <CheckCircleIcon style={{ fill: '#4caf50' }} />
                                )}
                            </IconButton>
                        </Tooltip>
                       
                    </>
                    : <></>
                }
                <Tooltip title="Dashboards" arrow>
                    <IconButton onClick={() => setDialogOpen((prev) => ({
                        ...prev,
                        changeDashboard: {
                            state: true,
                            admin_id: row.id.toString(),
                            dashboards: row?.meta?.metabase || "",
                            refetchAdmin: refetchAdminData,
                        }
                    }))}>
                        <img src="/src/assets/images/dashboard.png" width={25} height={30} />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell align="left">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        justifyContent: "flex-start",
                    }}
                >
                    {row.groups}
                </Box>
            </TableCell>
        </>
    )
}

export default TableCellsRow