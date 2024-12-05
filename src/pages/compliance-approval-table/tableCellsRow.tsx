import TableCell from "@mui/material/TableCell"
import Box from "@mui/material/Box";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { Data } from "./type";
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useComplianceApproval } from "./context";

type Props = {
    row: Data;
    labelId: string;
    isSelected: boolean;
}

const TableCellsRow = ({ row, labelId, isSelected }: Props) => {
    const { dialog, setDialog } = useComplianceApproval();

    const show_answers_only = row.actions?.status === "SharedWithClient" ? false: true;

    return (
        <>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                sx={{ paddingLeft: isSelected ? "0" : "1rem" }}
            >
                {row.project_name}
            </TableCell>
            <TableCell align="left" ><Button onClick={() => {
                setDialog((prev) => ({
                    ...prev,
                    expert: {
                        state: true,
                        expert_id: row.expert_name.id
                    }
                }))
            }} sx={{ color: "black", fontSize: "14px", textTransform: "capitalize" }}>{row.expert_name.name}</Button></TableCell>
            <TableCell align="left" sx={{ maxWidth: "400px" }}>{row.current_company_designation}</TableCell>
            <TableCell align="left" sx={{ maxWidth: "400px" }}>{row.past_company_designation}</TableCell>
            <TableCell>
                
                {row.actions?.answers &&
                    <CustomBtnFilled
                        label={show_answers_only ? "Answers" : "Approve/Reject"}
                        onClick={() => {
                            setDialog((prev) => ({
                                ...prev,
                                reviewCompliance: {
                                    state: true,
                                    pe_compliance: row.actions,
                                    show_answers_only 
                                }
                            }))
                        }}
                        variant="contained"
                    />
                }

            </TableCell>
        </>
    )
}

export default TableCellsRow