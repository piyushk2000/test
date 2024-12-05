import React from 'react';
import { TableCell } from "@mui/material";
import { ClientUsageData, SetDialog } from "./types";
import { LocalDayjs } from "../../../../utils/timezoneService";
import { getMinWidth } from './helper';
import { ShowAnswersDialog } from '../../../project/project-pe-mapping/actions/show-answers';
import CustomBtnFilled from '../../../../atoms/form-molecules/CustomBtnFilled';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../constants';

type Props = {
    row: ClientUsageData;
    labelId: string;
    isSelected: boolean;
    setDialog: SetDialog;
}


const TableCellsRow: React.FC<Props> = ({ row, labelId, isSelected, setDialog }) => {
    const keys = Object.keys(row)

    return (
        <>
            {keys.map((key, index) => (
                <TableCell
                    key={key}
                    component={index === 0 ? "th" : "td"}
                    id={index === 0 ? labelId : undefined}
                    scope={index === 0 ? "row" : undefined}
                    padding={index === 0 ? "none" : "normal"}
                    align="left"
                    sx={{ paddingLeft: index === 0 && isSelected ? "0" : "1rem", minWidth: getMinWidth(key) }}
                >
                    {renderCellContent(row, key, setDialog)}
                </TableCell>
            ))}
        </>
    );
};

const renderCellContent = (row: Record<string, any>, key: string, setDialog: SetDialog) => {
    switch (key) {
        case "client_compliance_responses":
            return (
                <>
                    {row[key]?.answers ? <CustomBtnFilled
                        label='Show Responses'
                        variant='contained'
                        onClick={() => setDialog((prev) => ({
                            ...prev, show_answers: {
                                ...prev,
                                state: true,
                                compliances: row[key]
                            }
                        }))}
                    /> : <></>}

                </>
            )
        case 'premium_expert':
        case 'current_us_govt_employee':
            return row[key] ? 'Yes' : 'No';
        case 'client_contact_name':
        case 'client_contact_email':
            return row[key] || '-';
        case 'account_manager':
            return row[key]?.name || '-';
        case 'call_date':
        case "client_compliance_date":
            return row[key] ? LocalDayjs(row[key]).format("DD/MM/YYYY") : '-';
        case "call_log_time":
            return row[key] ? LocalDayjs(row[key]).format("DD/MM/YYYY HH:mm") : '-';
        case "expert_name":
            return <Link target='_blank' to={AppRoutes.EXPERT_PROFILE + "?id=" + row.expert_id + "&page=1"}>{row.expert_name}</Link>
        default:
            return row[key] ?? '-';
    }
};

export default TableCellsRow;