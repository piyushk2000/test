import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import Fields from "./fields";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { downloadExcel } from "../../../../utils/download-excel";
import { HOSTURL_LOCAL } from "../../../../utils/services";
import { IsCalenderTypes } from "../../../../pages/Calls/types";
import { billsFormat, panVerifyFormat, vendorsFormat } from "./helper";
import CalenderPickerDialog from "../../../../molecules/calender-picker-dialog/calenderPickerDialog";
import { useState } from "react";
import { dataRangeFilter } from "../../../../molecules/nav-bars/calls-page/helper";
import { LocalDayjs } from "../../../../utils/timezoneService";

type Props = {
    handleClose: () => void;
}

const 
CallDownloadForm = ({ handleClose }: Props) => {
    const [isCalender, setCalender] = useState<IsCalenderTypes>({
        open: false,
        value: "",
        date: null,
        tDate: null,
        select: null,
    });
    const [dateUrl, setDateUrl] = useState("");

    const { setLoading } = useFullPageLoading();
    const defaultValues = {
        no_of_records: { label: "100", value: 100 },
        date_of_call: null,
        sheet_option: null
    }

    const methods = useForm({ defaultValues });

    const vendorsDownload = async (formData: any) => {
        await downloadExcel({
            title: "Vendors (For Zoho) Domestic",
            data: [vendorsFormat(formData,dateUrl,true)]
        }, setLoading)

        await downloadExcel({
            title: "Vendors (For Zoho) International",
            data: [vendorsFormat(formData,dateUrl,false)]
        },setLoading)
    }

    const billsDownload = async (formData: any) => {
        await downloadExcel({
            title: "Bills (For Zoho) Domestic",
            data: [billsFormat(formData,dateUrl,true)]
        }, setLoading)

        await downloadExcel({
            title: "Bills (For Zoho) International",
            data: [billsFormat(formData,dateUrl,false)]
        }, setLoading)
    }

    const panVerifyDownload = async () => {
        await downloadExcel({
            title: "Pan Verification",
            data: [panVerifyFormat()]
        }, setLoading)
    }


    const onSubmit = async (formData: any) => {
        try {
            if (formData.sheet_option === "Calls") {
                downloadExcel({
                    title: "call table",
                    data: [{
                        sheet_title: "Call",
                        apiUrl: HOSTURL_LOCAL + "/plan/call?embed=YES&notequalto___status=Scheduled&page=1&limit=1000&sort_by=desc___updated_at",
                        data_key: "data",
                        keyTitles: {
                            id: "Call ID",
                            fk_project: "Project ID",
                            account_manager: "Account Manager ID",
                            research_analyst: "Research Analyst ID",
                            title: "Title",
                            status: "Status",
                            fk_expert: "Expert ID",
                            "fk_expert_value.name": "Expert Name",
                            expert_rating: "Expert Rating",
                            expert_type: "Expert Type",
                            fk_client: "Client ID",
                            "fk_client_value.name": "Client",
                            client_participants: "Client Participants ID",
                            client_contact: "Client Contact",
                            billing_office_id: "Billing City ID",
                            "billing_office_id_value.name": "Billing City",
                            call_start_time: "Call Time",
                            call_type: "Call Type",
                            call_status: "Call Status",
                            call_medium: "Call Medium",
                            cost_price: "Cost Price",
                            cost_price_currency: "Cost Price Currency",
                            selling_price: "Selling Price",
                            selling_price_currency: "Selling Price Currency",
                            payable_mins: "Payable Minutes",
                            chargeable_mins: "Billable Minutes",
                            casecode: "Case Code",
                            geographies: "Geographies ID"
                        }
                    }]
                }, setLoading)
            } else if (formData.sheet_option === "Vendors") {
                await vendorsDownload(formData);
            } else if (formData.sheet_option === "Bills") {
                await billsDownload(formData);
            } else if (formData.sheet_option === "Vendors_Bills") {
                await vendorsDownload(formData);
                await billsDownload(formData);
            } else if(formData.sheet_option === "pan") {
                await panVerifyDownload();
            }

            handleClose();
        } catch (err: any) {
            console.log({ err });
        }
    }

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <>
        
            <FormProvider {...methods}>
                <ThemeProvider theme={defaultTheme}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <Fields handleClose={handleClose} isCalender={isCalender} setCalender={setCalender} />
                    </form>
                </ThemeProvider>
            </FormProvider>

            {/* Calender Picker Dialog */}
            {isCalender.open &&
                <CalenderPickerDialog
                    isOpen={isCalender.open}
                    handleClose={() =>
                        setCalender((prev: any) => ({ ...prev, open: false }))
                    }
                    setCalender={setCalender}
                    select={isCalender.select}
                    startDate={isCalender.date}
                    endDate={isCalender.tDate}
                    okBtnApiCalls={(
                        date: Date | null,
                        tDate: Date | null,
                        select: "between" | "on" | "before" | "after" | null,
                        calenderType: string | null
                    ) => {
                        const dateUrl = dataRangeFilter(date, tDate, select, calenderType, undefined, true);
                        setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))

                        if (dateUrl) {
                            setDateUrl(dateUrl);
                        }
                    }}
                    calenderType={"reviewed_on"}
                    titleRadioBtns={[]}
                    singleTitle={"Calender Filter: Reviewed On"}
                    resetCalenderBtnClickHandler={() => {
                        setCalender((prev: any) => ({
                            open: false,
                            value: "",
                            date: null,
                            tDate: null,
                            select: null
                        }))
                    }}
                />
            }
        </>
    );
};

export default CallDownloadForm;
