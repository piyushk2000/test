import { useState } from "react";
import PageLayout from "../../atoms/page-layout";
import ExchangeRateHeader from "../../molecules/app-bars/exchange-rate";
import { ExchangeRateContext } from "./context";
import { Dialog, ExchangeRateData, Filters } from "./types";
import { defaultDialog, defaultFilters, getUrl } from "./helper";
import { useFetch } from "../../utils/hooks/useFetch";
import ExchangeRateNavbar from "../../molecules/nav-bars/exchange-rate-page";
import ExchangeRateListView from "./list-view";
import AddExchangeRateDialog from "./add-form";



export default function ExchangeRatePage() {
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [dialog, setDialog] = useState<Dialog>(defaultDialog);

    const url = getUrl(filters);
    const { data, loading: loadingData, refetchWithNewUrl } = useFetch<ExchangeRateData>(url);

    const resetFilters = () => setFilters(defaultFilters);

    return (
        <PageLayout>
            <ExchangeRateContext.Provider value={{ filters, setFilters, refetch: async () => refetchWithNewUrl(url), dialog, data, loadingData, setDialog }}>
                <ExchangeRateHeader />
                <ExchangeRateNavbar isFilterApplied={filters.isFilterApplied} resetFilters={resetFilters} />
                <ExchangeRateListView />

                {/* Add Exchange Rates Dialog */}

                {dialog.add.state &&
                    <AddExchangeRateDialog
                        isOpen={dialog.add.state}
                        handleClose={() => setDialog(defaultDialog)}
                    />}

            </ExchangeRateContext.Provider>
        </PageLayout>
    )
}