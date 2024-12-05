import { useEffect, useState } from "react";
import PageLayout from "../../atoms/page-layout"
import PaymentsHeader from "../../molecules/app-bars/payments-page"
import PaymentsList from "../../organisms/payments/list-view";
import { Filters, Mode, RowsData, TransactionData } from "./types";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import { PaymentsContext } from "./context";
import { defaultFilterValues, getRefetchUrl, getRowsData } from "./helper";
import PaymentsNavbar from "../../molecules/nav-bars/payments-page";
import { isExpert } from "../../utils/role";

function getUrl() {
    const expert_id = localStorage.getItem("expert_id");
    return APIRoutes.getPayments + (isExpert() ? "?fk_expert=" + expert_id : "")
}

const PaymentsPage = () => {
    const [mode, setMode] = useState<Mode>("list");

    const { data, formattedData: rowsData, refetchWithNewUrl: refetchData } = useFetch<TransactionData[], RowsData>(getUrl(), {
        formatter: getRowsData
    });
    const [filters, setFilters] = useState<Filters>(defaultFilterValues);

    useEffect(() => {
        if (filters.isFilterChange) {
            refetchData(getRefetchUrl(filters));
            setFilters((prev) => ({ ...prev, isFilterChange: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.isFilterChange])

    return (
        <PageLayout>
            <PaymentsContext.Provider value={{
                mode,
                setMode,
                data,
                rowsData,
                filters,
                setFilters
            }}>
                <PaymentsHeader />
                <PaymentsNavbar />

                {mode === "list"
                    && <PaymentsList />
                }
            </PaymentsContext.Provider>

        </PageLayout>
    )
}

export default PaymentsPage