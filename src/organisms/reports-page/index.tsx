import TableViewCommon from "../../molecules/table-view-common";
import { headCells } from "./reports-list/headCells";
import { rowsData } from "./reports-list/helper";
import TableCellsRow from "./reports-list/tableCells";
import { Data } from "./reports-list/type";

const ReportList = () => {

    return <TableViewCommon<Data>
        rows={rowsData}
        totalSelected={0}
        title="Reports"
        headCells={headCells}
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
    />
};

export default ReportList;
