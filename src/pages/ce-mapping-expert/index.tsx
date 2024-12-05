import { useEffect, useState } from "react";
import PageLayout from "../../atoms/page-layout";
import CEMappingExpertHeader from "../../molecules/app-bars/ce-mapping-experts-page";
import { CEMappingExpertTable } from "../../organisms/ce-mapping-experts/ce-experts";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { decode } from "../../utils/utils";
import { applyFilters, defaultDialogValues, defaultFilterValues, getExperts } from "./helper";
import { useSnackbar } from "notistack";
import { CalenderTypes, Dialog, FiltersPayload, GetCEExpertsResponseData } from "./types";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import WarningDialog from "../../molecules/form-close-warning";
import { useNavigate } from "react-router-dom";
import { CEMappingExpertContext } from "./context";
import { AppRoutes } from "../../constants";
import CEMappingExpertsNavbar from "../../molecules/nav-bars/ce-mapping-experts";
import { calendarDialogType } from "../../molecules/nav-bars/ce-mapping-experts/helper";

export function CEMappingExpert() {
    const [data, setData] = useState<GetCEExpertsResponseData | null>(null);
    const [filters, setFilters] = useState<FiltersPayload>(defaultFilterValues);
    const [dialog, setDialog] = useState<Dialog>(defaultDialogValues);

    const code = useGetParams("code");
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();
    const navigate = useNavigate();
    const decoded = code ? decode(code) : null;
    const project_id = decoded ? decoded.split("_")[0] : null;
    const client_id = decoded ? decoded.split("_")[1] : null;
    const [projectClientDetails, setProjectClientDetails] = useState<{
        nameMasking: boolean,
        addedOnMasking: boolean,
        lastUpdatedMasking: boolean
    }>({ nameMasking: false, addedOnMasking: false, lastUpdatedMasking: false });
    const [isCalender, setCalender] = useState<CalenderTypes>({
        open: false,
        value: "",
        type: "",
        date: null,
        tDate: null,
        select: null
    });



    useEffect(() => {
        if (!filters.isFilterChange) {
            if (project_id) {
                getExperts(project_id, filters, setData, setLoading, code, setProjectClientDetails, enqueueSnackbar,setCalender);
            }
        }
    }, [filters.isFilterChange]);

    useEffect(() => {
        if (filters.isFilterChange) {
            setFilters((filters) => ({
                ...filters,
                isFilterChange: false,
            }));
            applyFilters(filters, setData, setFilters, setLoading, data);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.isFilterChange]);

    if (!code) {
        enqueueSnackbar("Code not found", {
            variant: "error"
        })

        return <></>
    }

    return (
        <PageLayout>
            <CEMappingExpertContext.Provider
                value={{
                    dialog, setDialog, filters, setFilters, data, code, project_id,
                    refetch: async () => await getExperts(project_id, filters, setData, setLoading, code, setProjectClientDetails, enqueueSnackbar,setCalender),
                    projectClientDetails, isCalender, setCalender
                }}>
                <CEMappingExpertHeader />
                {data &&
                    <CEMappingExpertsNavbar
                        isFilterApplied={filters.isFilterApplied}
                        resetFilters={() => setFilters(() => (defaultFilterValues))}
                    />
                }
                <CEMappingExpertTable />


                <WarningDialog
                    open={dialog.loginToContinue.state}
                    handleClose={() => setDialog((prev) => ({ ...prev, loginToContinue: { state: false } }))}
                    text="Please login to perform this action"
                    yesLabel="Login with OTP"
                    handleYesClick={() => {
                        const redirect_url = window.location.pathname + window.location.search;
                        if (redirect_url !== "/") {
                            navigate(`/login/otp?redirect_url=${redirect_url}`);
                        } else {
                            navigate("/login/otp");
                        }
                    }}
                />
            </CEMappingExpertContext.Provider>
        </PageLayout>
    )
}