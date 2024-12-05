import TableViewCommon from "../../molecules/table-view-common";
import { useCEMappingExpertContext } from "../../pages/ce-mapping-expert/context";
import { formatData, headCells } from "./helper";
import TableCellsRow from "./tableCells";
import { RowsData } from "./types";
import { PrioritizeExpertDialog } from "./prioritize-experts";
import handleCloseDialog from "../../pages/ce-mapping-expert/helper";

export function CEMappingExpertTable() {
    const { data, dialog, setDialog, projectClientDetails } = useCEMappingExpertContext();

    return (
        <>
            {data &&
                <TableViewCommon<RowsData>
                    key={'id'}
                    rows={formatData(data)}
                    totalSelected={0}
                    title=" "
                    headCells={headCells(projectClientDetails)}
                    isSelected={false}
                    selectAllowed={(row) => false}
                    handleTableRowClick={(e, row) => { }}
                    tableCells={(row, labelId, isSelected) => <TableCellsRow
                        row={row}
                        labelId={labelId}
                        isSelected={isSelected}
                    />}
                    isItemSelected={(id) => false}
                    handleSelectAllClick={(e) => { }}
                    containerSx={{maxHeight: "70vh"}}
                />
            }

            {/* Prioritize Expert Dialog */}
            {dialog.prioritizeExpert.rowData &&
                <PrioritizeExpertDialog
                    isOpen={dialog.prioritizeExpert.state}
                    data={dialog.prioritizeExpert.rowData}
                    handleClose={() => handleCloseDialog(setDialog)}
                />
            }

        </>
    )
}