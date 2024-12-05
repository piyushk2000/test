import TableViewCommon from "../../molecules/table-view-common";
import { useFetch } from "../../utils/hooks/useFetch";
import { headCells } from "./headCells";
import { defaultDialog, defaultFilters, formatData, getUrl, handleClose, handleSelectAllClick, handleTableRowClick, reviewBulk } from "./helper";
import TableCellsRow from "./tableCellsRow";
import { Data, Dialog, Filters, Select, SelectedAction } from "./type";
import PageLayout from "../../atoms/page-layout";
import ComplianceApprovalTableHeader from "../../molecules/app-bars/compliance-approval-table";
import { ComplianceApprovalContext } from "./context";
import { useEffect, useRef, useState } from "react";
import ComplianceApprovalTableNavbar from "../../molecules/nav-bars/compliance-approval-table";
import { ExpertProfileDialog } from "./expert-profile-dialog";
import { ReviewCompliance } from "../../organisms/project/project-pe-mapping/actions/review-compliance";
import SkeletonLoader from "../../atoms/project-details/SkeletonLoader";
import { getParams } from "../../utils/utils";
import WarningDialog from "../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";



export default function ComplianceApprovalTable() {
    const page = getParams("page");
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [select, setSelect] = useState<Select>({
        isClicked: false,
        selectedCards: [],
        callAction: null
    });
    const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [dialog, setDialog] = useState<Dialog>(defaultDialog);
    const { setLoading } = useFullPageLoading();
    const navigate = useNavigate();
    const url = getUrl(filters, page,filters.rowsPerPage);
    const { data, refetchWithNewUrl , pagination } = useFetch(url);

    async function refetchCompliance() {
        await refetchWithNewUrl(url);
    }

    const selectRef = useRef(select);

    const bulkCompliances = (action: "Approve" | "Reject") => {
        setDialog((prev) => ({
            ...prev,
            reviewBulk: {
                state: true,
                action,
                pe_compliances: selectRef.current.selectedCards.map(d => d.actions.unique_code).join(",") || null
            }
        }))
    }

    useEffect(() => {
        selectRef.current = select;
    }, [select]);


    useEffect(() => {
        if (filters.isFilterChange) {
            refetchWithNewUrl(url);
        }
    }, [filters.isFilterChange]);



    return (
        <PageLayout>
            <ComplianceApprovalContext.Provider value={{
                filters,
                setFilters,
                resetFilters: () => setFilters(defaultFilters),
                setDialog,
                dialog,
                select,
                setSelect,
                selectedAction,
                setSelectedAction
            }}>
                <ComplianceApprovalTableHeader />
                <ComplianceApprovalTableNavbar
                    bulkCompliances={bulkCompliances}
                />

                {data ?
                    data.length > 0 ?
                    <TableViewCommon<Data>
                        rows={formatData(data)}
                        totalSelected={select.selectedCards.length}
                        title="Compliance Approval Table"
                        headCells={headCells}
                        isSelected={select.isClicked}
                        selectAllowed={(row) => row.actions.status === "SharedWithClient" && select.isClicked}
                        handleTableRowClick={(e, row, isSelectAllowed) => {
                            handleTableRowClick(e, row, isSelectAllowed, select, setSelect);
                        }}
                        tableCells={(row, labelId, isSelected) => <TableCellsRow
                            row={row}
                            labelId={labelId}
                            isSelected={isSelected}
                        />}
                        isItemSelected={(id) => {
                            return select.selectedCards.map((prev) => prev.id).indexOf(id) !== -1
                        }}
                        handleSelectAllClick={(e, currentRow) => {
                            handleSelectAllClick(e, currentRow, select, setSelect);
                        }}
                        isAsync
                        rowsPerPageOptions={[24,48,96]}
                        rowsPerPageDefault={filters.rowsPerPage}
                        defaultPage={page && +page > 0 ? +page - 1 : 0}
                        handleChangePageFn={(page) => 
                            {
                                navigate(`${AppRoutes.COMPLIANCE_APPROVAL_TABLE}?page=${page + 1}`)
                            }
                        }
                        handleChangeRowsPerPageFn={(rowsPerPage) => {
                            setFilters((prev) => ({
                                ...prev,
                                rowsPerPage: rowsPerPage,
                                isFilterChange: true,
                                isFilterApplied: true
                            }))
                        }}
                        totalRows={pagination.total}
                    /> : <>
                    <NoResultFoundFilters text="No Compliance Found" />
                    </>
                    : <>
                        <SkeletonLoader
                            width="100%"
                            height="700px"
                            style={{
                                marginTop: "54px"
                            }}
                        />
                    </>
                }

                {/* Expert Profile Dialog */}
                <ExpertProfileDialog
                    isOpen={dialog.expert.state}
                    handleClose={() => { handleClose(setDialog) }}
                    expert_id={dialog.expert.expert_id}
                />

                {/* Review Compliance */}
                <ReviewCompliance
                    isOpen={dialog.reviewCompliance.state}
                    handleClose={() => handleClose(setDialog)}
                    pe_compliance={dialog.reviewCompliance.pe_compliance}
                    show_answers_only={dialog.reviewCompliance.show_answers_only}
                    refetch={refetchCompliance}
                />

                {/* Approve / Reject Compliance Dialog */}
                {dialog.reviewBulk.action &&
                    <WarningDialog
                        open={dialog.reviewBulk.state}
                        text={`Are you sure you want to ${dialog.reviewBulk.action || "Approve/Reject"} all the selected Compliances`}
                        handleClose={() => {
                            handleClose(setDialog)
                        }}
                        handleYesClick={async () => {
                            await reviewBulk(enqueueSnackbar, dialog.reviewBulk.action || "Approve", dialog.reviewBulk.pe_compliances, setLoading,
                                () => handleClose(setDialog), async () => await refetchWithNewUrl(url),setSelect
                            )
                        }}
                    />
                }

            </ComplianceApprovalContext.Provider>
        </PageLayout>
    )
}