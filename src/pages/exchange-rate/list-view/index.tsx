import NoResultFoundFilters from "../../../atoms/noResultsFilters";
import SkeletonLoader from "../../../atoms/project-details/SkeletonLoader";
import TableViewCommon from "../../../molecules/table-view-common";
import { useExchangeRateContext } from "../context";
import { Data, ExchangeRateData } from "../types";
import { headCells } from "./headCells";
import TableCellsRow from "./tableCellsRow";

export default function ExchangeRateListView() {
    const { filters, data, loadingData: loading } = useExchangeRateContext();

    if (loading || !data) {
        return (
            <SkeletonLoader
                width="100%"
                height="500px"
                style={{
                    marginTop: "20px",
                    borderRadius: "5px"
                }}
            />
        )
    }

    return (
        <>
            {(data.length === 0) ?
                <NoResultFoundFilters text={filters.isFilterApplied ? undefined : "No Data Found...."} /> :
                <TableViewCommon<Data>
                    rows={data || []}
                    totalSelected={0}
                    title={``}
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
                    containerSx={{ maxHeight: "initial" }}

                />
            }

        </>
    )
}