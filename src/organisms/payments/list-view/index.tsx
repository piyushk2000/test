import NoResultFoundFilters from "../../../atoms/noResultsFilters";
import TableViewCommon from "../../../molecules/table-view-common"
import { usePaymentsContext } from "../../../pages/payments/context"
import { RowData } from "../../../pages/payments/types";
import { headCells } from "./headCells";
import TableCellsRow from "./tableCells";

const PaymentsList = () => {
    const { rowsData } = usePaymentsContext();

    return (
        <>
            {rowsData?.length ?
                <TableViewCommon<RowData>
                    rows={rowsData}
                    totalSelected={0}
                    title="Payments"
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
                : <NoResultFoundFilters text="No Payment Found" />
            }
        </>
    )
}

export default PaymentsList