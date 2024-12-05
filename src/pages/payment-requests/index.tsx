import PageLayout from "../../atoms/page-layout";
import PaymentRequestsHeader from "../../molecules/app-bars/payment-requests";
import TableViewCommon from "../../molecules/table-view-common";
import { Dialog, Filters, RowData, RowsData, Select, TransactionData } from "./types";
import { APIRoutes, AppRoutes } from "../../constants";
import { useFetch } from "../../utils/hooks/useFetch";
import { dataRangeFilter, defaultDialogs, defaultFilterValues, formatAmountRangeData, getRowsData, handleSelectAllClick, handleTableRowClick, headCells, selectAllowed } from "./helper";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import TableCellsRow from "./tableRows";
import { useEffect, useState } from "react";
import { PaymentsRequestsContext } from "./context";
import SkeletonLoader from "../../atoms/project-details/SkeletonLoader";
import ApproveHoldRejectDialog from "./approve-reject-hold";
import { useSnackbar } from "notistack";
import PaymentsRequestsNavbar from "../../molecules/nav-bars/payments-requests-page";
import CallDetailsDialog from "./calls-dialog";
import { SelectedAction } from "../../molecules/nav-bar-common/type";
import BulkActionPayments, { bulkActionTitles } from "./bulkAction";
import DialogModal from "../../atoms/dialog";
import ViewInvoicePage from "../documents/view-invoice-page";
import { getParams } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { FormatToLVCommon } from "../../common/formatData";
import UpdateInvoiceNumberDialog from "./update-invoice-num";
import { DownloadBtnDialog } from "../../organisms/calls/download-btn-form";
import EditTdsDialog from "./edt-tds-form";
import EditDeclarationDialog from "./edit-declaration-form";

function getUrl(filters: Filters, page: string | null, limit: number) {
    return APIRoutes.getPayments
        + "?type=Payment Requested For Calls&embed=YES&limit=" + limit
        + (page ? "&page=" + page : "&page=1")
        + (filters.expert_id ? `&equalto___fk_expert=${filters.expert_id}` : "")
        + (filters.expert_name ? `&expert_name=${filters.expert_name}` : "")
        + (filters.total_calls ? `&total_calls=${filters.total_calls}` : "")
        + (filters.currency.length > 0 ? `&in___currency=${filters.currency.join(",")}` : "")
        + (filters.generated_by !== "all" ? `&request_generated_by=${filters.generated_by}` : "")
        + (filters.status !== "all" ? `&equalto___status=${filters.status}` : "")
        + (filters.reviewed_by !== "all" ? `&equalto___reviewed_by=${filters.reviewed_by}` : "")
        + (filters.high_priority ? `&equalto___high_priority=1` : "")
        + (filters.auto_generated === "yes" ? `&equalto___infollion_generated_invoice=1` : filters.auto_generated === "no" ? "&equalto___infollion_generated_invoice=0" : "")
        + (filters.requested_on || "")
        + (formatAmountRangeData(filters.amount_range))
        + (filters.search_review ? "&like___review_remarks=" + filters.search_review : "")
        + (filters.call_id ? "&call_ids=" + filters.call_id : "")
        + (filters.invoice_num ? "&equalto___invoice_num=" + filters.invoice_num : "")
        + (filters.payment_location !== "all" ? "&equalto___bank_account_is_outside_india=" + (filters.payment_location === "Domestic" ? "0" : "1") : "")
}

export default function PaymentRequestsPage() {
    const page = getParams("page");
    const [filters, setFilters] = useState<Filters>(defaultFilterValues);
    const { formattedData: rowsData, refetchWithNewUrl: refetchData, pagination } = useFetch<TransactionData[], RowsData>(getUrl(filters, page, filters.rowsPerPage), {
        formatter: getRowsData,
        disabled: filters.isFilterChange
    });
    const { formattedData: FinanceUsers } = useFetch(APIRoutes.users + "?role=FINANCE&show_columns=id,name", {
        formatter(data) {
            const fData = FormatToLVCommon<any, "name", "id">(data, "name", "id");
            fData.unshift({ label: "All", value: "all" });
            return fData;
        },
    })
    const [dialog, setDialog] = useState<Dialog>(defaultDialogs);
    const [select, setSelect] = useState<Select>({
        isClicked: false,
        selectedCards: [],
        callAction: null
    });
    const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const refetchDataFn = async (page?: string | null) => {
        await refetchData(getUrl(filters, page || "1", filters.rowsPerPage));
    }

    useEffect(() => {
        if (filters.isFilterChange) {
            setFilters((prev) => ({ ...prev, isFilterChange: false }));
            navigate(`${AppRoutes.PAYMENT_REQUESTS}?page=1`);
        }
    }, [filters.isFilterChange]);



    return (
        <PageLayout>
            <PaymentsRequestsContext.Provider value={{ dialog, setDialog, refetchData: async () => await refetchDataFn(page), filters, setFilters, FinanceUsers }}>
                <PaymentRequestsHeader />
                <PaymentsRequestsNavbar
                    okBtnApiCalls={(
                        date,
                        tDate,
                        select,
                        calenderType
                    ) =>
                        dataRangeFilter(
                            date,
                            tDate,
                            select,
                            calenderType,
                            setFilters
                        )}
                    onActionSelect={(action) => setSelectedAction(action)}
                    selectedAction={selectedAction}
                    select={select}
                    setSelect={setSelect}
                    approveClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            bulkPayments: {
                                state: true,
                                title: bulkActionTitles.approve
                            }
                        }))
                    }}
                    onHoldClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            bulkPayments: {
                                state: true,
                                title: bulkActionTitles.hold
                            }
                        }))
                    }}
                    updateInvoiceNumClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            invoice_num: {
                                state: true
                            }
                        }))
                    }}
                    rejectClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            bulkPayments: {
                                state: true,
                                title: bulkActionTitles.reject
                            }
                        }))
                    }}
                    updateDeclarationDateClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            editDeclarationDate: {
                                state: true,
                                isBulk: true,
                                rows_data: []
                            }
                        }))
                    }}
                    setHighPriorityClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            bulkPayments: {
                                state: true,
                                title: bulkActionTitles.high_priority
                            }
                        }))
                    }}
                    setLowPriorityClickHandler={() => {
                        setDialog((prev) => ({
                            ...prev,
                            bulkPayments: {
                                state: true,
                                title: bulkActionTitles.low_priority
                            }
                        }))
                    }}
                />
                {!rowsData ?
                    <>
                        <SkeletonLoader
                            width="100%"
                            height="80vh"
                        />
                    </> :
                    <>
                        {rowsData?.length ?
                            <TableViewCommon<RowData>
                                rows={rowsData}
                                totalSelected={select.selectedCards.length}
                                title="Payments Requests"
                                containerSx={{ maxHeight: "calc(100vh - 207px)" }}
                                paperSx={{ marginBottom: "0" }}
                                outerBoxSx={{ mt: "0" }}
                                headCells={headCells}
                                isSelected={select.isClicked}
                                selectAllowed={(row) => select.isClicked && selectAllowed(selectedAction, row)}
                                handleTableRowClick={(e, row) => {
                                    handleTableRowClick(e, row, select.isClicked && selectAllowed(selectedAction, row), select, setSelect);
                                }}
                                tableCells={(row, labelId, isSelected) => <TableCellsRow
                                    row={row}
                                    labelId={labelId}
                                    isSelected={isSelected}
                                />}
                                isItemSelected={(id) =>
                                    select.selectedCards.map((prev) => prev.id).indexOf(id) !== -1
                                }
                                handleSelectAllClick={(e, row) => {
                                    handleSelectAllClick(e, row, select, setSelect, selectedAction);
                                }}
                                isAsync
                                rowsPerPageOptions={[25, 50, 100, 150]}
                                rowsPerPageDefault={filters.rowsPerPage}
                                defaultPage={page && +page > 0 ? +page - 1 : 0}
                                handleChangePageFn={(page) => {
                                    navigate(`${AppRoutes.PAYMENT_REQUESTS}?page=${page + 1}`)
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
                            /> :
                            <NoResultFoundFilters text="No Payment Found" />
                        }
                    </>
                }

                {/* Approve / Reject / Hold Dialog */}
                {dialog.approveRejectHold.rowData &&
                    <ApproveHoldRejectDialog
                        isOpen={dialog.approveRejectHold.state}
                        rowData={dialog.approveRejectHold.rowData}
                        handleClose={() => setDialog(() => (defaultDialogs))}
                    />
                }

                {dialog.editDeclarationDate.state &&
                    <EditDeclarationDialog
                        isOpen={dialog.editDeclarationDate.state}
                        rowDatas={dialog.editDeclarationDate.isBulk ? select.selectedCards : dialog.editDeclarationDate.rows_data }
                        isBulk={dialog.editDeclarationDate.isBulk}
                        handleClose={() => setDialog(() => (defaultDialogs))}
                    />
                }

                {
                    dialog.download.state &&
                    <DownloadBtnDialog
                        isOpen={dialog.download.state}
                        handleClose={() => setDialog(() => (defaultDialogs))}
                    />
                }

                {dialog.bulkPayments.state &&
                    <BulkActionPayments
                        isOpen={dialog.bulkPayments.state}
                        handleClose={() => {
                            setDialog(() => (defaultDialogs));
                        }}
                        handleSubmitClose={() => {
                            setSelect(prev => ({
                                ...prev,
                                selectedCards: [],
                                isClicked: false,
                                callAction: null
                            }))
                        }}
                        title={dialog.bulkPayments.title || ""}
                        rowsData={select.selectedCards}
                    />
                }

                {dialog.callDetails.rowData &&
                    <CallDetailsDialog
                        isOpen={dialog.callDetails.state}
                        handleClose={() => setDialog(() => (defaultDialogs))}
                        allCalls={dialog.callDetails.rowData.calls}
                    />
                }

                {/* Chnage Invoice Number */}
                {dialog.invoice_num.state &&
                    <UpdateInvoiceNumberDialog
                        handleClose={() => setDialog(() => (defaultDialogs))}
                        isOpen={dialog.invoice_num.state}
                        rowsData={select.selectedCards}
                        setSelect={setSelect}
                    />
                }

                {/* Change TDS */}
                {dialog.editTdsAmount.row_data &&
                    <EditTdsDialog
                        handleClose={() => setDialog(() => (defaultDialogs))}
                        isOpen={dialog.editTdsAmount.state}
                        rowData={dialog.editTdsAmount.row_data}
                    />
                }

                {/* View Invoice Dialog */}
                {dialog.invoice.state &&
                    <DialogModal
                        handleClose={() => setDialog(() => (defaultDialogs))}
                        isOpen={dialog.invoice.state}
                        title={"Invoice"}
                        contentSx={{ padding: "0" }}
                    >
                        <ViewInvoicePage
                            invoiceNo={dialog.invoice.invoice_url}
                        />
                    </DialogModal>
                }


            </PaymentsRequestsContext.Provider>
        </PageLayout>
    )
}