import TableCell from "@mui/material/TableCell"

import { RowsData } from "./types";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useCEMappingExpertContext } from "../../pages/ce-mapping-expert/context";
import { PrioritizeExpert } from "../../atoms/prioritize-expert";
import { BoxFlex } from "../../atoms/boxSpaceBtw";

type Props = {
    row: RowsData;
    labelId: string;
    isSelected: boolean;
}

const TableCellsRow = ({ row, labelId, isSelected }: Props) => {
    const { setDialog, projectClientDetails } = useCEMappingExpertContext();
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <>
            <TableCell align="left">
                <PrioritizeExpert
                    isPriority={row.action}
                />
            </TableCell>
            {!projectClientDetails.nameMasking &&
                <TableCell
                    align="left"
                    sx={{ minWidth: "200px" }}
                >
                    <BoxFlex sx={{ gap: "0.5rem" }}>
                        <p>
                            {row.expert_name}
                        </p>
                    </BoxFlex>
                </TableCell>
            }
            <TableCell align="left">{row.status}</TableCell>

            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.current_company_name}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.current_designation}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.relevant_company_name}</TableCell>
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.relevant_designation}</TableCell>
            <TableCell align="left" sx={{ minWidth: "180px" }} >{row.expert_base_location}</TableCell>
            {
                !projectClientDetails.addedOnMasking &&
                <TableCell align="left" sx={{ minWidth: "150px" }} >{row.added_on}</TableCell>
            }
            {
                !projectClientDetails.lastUpdatedMasking &&
                <TableCell align="left" sx={{ minWidth: "150px" }} >{row.last_updated_on}</TableCell>
            }
            <TableCell align="left" sx={{ minWidth: "200px" }} >{row.action ? <></> : <CustomBtnFilled
                variant="contained"
                label="Prioritize Expert"
                onClick={() => {
                    isLoggedIn ? setDialog((prev) => ({
                        ...prev, prioritizeExpert: {
                            state: true,
                            rowData: row
                        }
                    })) : setDialog((prev) => ({
                        ...prev,
                        loginToContinue: { state: true }
                    }))
                }}
            />}</TableCell>
        </>
    )
}

export default TableCellsRow