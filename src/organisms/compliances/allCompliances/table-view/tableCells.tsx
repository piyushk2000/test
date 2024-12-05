import { Chip, IconButton, Tooltip } from "@mui/material";
import TableCell from "@mui/material/TableCell"
import { TableData, complianceData } from "../types";
import { NumberQuestion } from "../../autoAprovalDialog/types";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import EditIcon from '@mui/icons-material/Edit';


type Props = {
    row: TableData;
    labelId: string;
    isSelected: boolean;
    openReviewDialog: (questions: NumberQuestion[]) => void;
    openEditDialog: (row: Partial<complianceData>) => void;
}


const TableCellsRow = ({ row, labelId, isSelected, openReviewDialog , openEditDialog}: Props) => {

    return (
        <>
            <TableCell align="left" >{row.title}
            </TableCell>
            <TableCell align="left">{row.questions.length || 0}
            </TableCell>
            <TableCell align="left">{row?.state == 'Active' && <Chip sx={{ background: '#e3f3ef' }} label={'Active'} />}{row?.state != 'Active' && <Chip sx={{ background: '#e3f3ef' }} label={'Inactive'} />}
            </TableCell>
            <TableCell sx={{ display: "flex", alignItems: "center", width: "fit-content" }} >
            <BoxFlex>
            <Tooltip title="Edit" arrow>
              <IconButton onClick={() => row && openEditDialog(row)}>
                <EditIcon sx={{ width: "20px" }} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Auto Approve Depedency" arrow>
              <IconButton>
                <ShareIcon style={{ width: '15px' }} />
              </IconButton>
            </Tooltip> */}
          </BoxFlex>
            </TableCell>
            <TableCell align="left">
                <CustomBtnFilled
                    styles={{ justifySelf: "flex-end" }}
                    label="Review"
                    variant="outlined"
                    onClick={() => {
                        openReviewDialog(row?.questions || [])
                    }}
                />
            </TableCell>
        </>
    )
}

export default TableCellsRow