import React, { useEffect, useMemo, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import { CallDetails, SelectedCards, SetSelect } from "../../../pages/Calls/types";
import { checkAllValuesAreSame } from "../../../utils/utils";
import NoResultFoundFilters from "../../../atoms/noResultsFilters";
import SubmitPaymentRequestTable from "./table";
import { isGenerateInvoiceAllowed, requestPaymentSubmit } from "../../../pages/Calls/helpers";
import { PrimaryBankValue } from "../../project/project-pe-mapping/actions/share-profile/email-format-dialog/types";
import { useSnackbar } from "notistack";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { SectionType, SubmitDialogTypes } from "./helper";
import Box from "@mui/material/Box";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import { SubmitDialog } from "./submit-dialog";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { ViewInvoiceType } from "../view-invoice/types";
import { getInvoice } from "../generate-invoice/helper";
import ViewInvoice from "../view-invoice";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import CircularProgress from "@mui/material/CircularProgress";
import { isExpert } from "../../../utils/role";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    callDetails: CallDetails;
    refetch(callIds: number[]): Promise<void>;
    setSelect: SetSelect;
}

export default function SubmitPaymentRequest({ isOpen, handleClose, callDetails, refetch, setSelect }: Props) {
    const [bankDetails, setBankDetails] = useState<PrimaryBankValue | null>(null);
    const { value: generateInvoiceAllowed, setValue: setGenerateInvoiceAllowed } = useBoolean();
    const [invoice, setInvoice] = useState<ViewInvoiceType>(null);
    const [section, setSection] = useState<SectionType>("");
    const [noResult, setNoResult] = useState<React.ReactNode | null>(null);
    const [select, setSelected] = useState<SelectedCards[]>(callDetails.map(d => ({ ...d, value: d.id })));
    const [submitDialog, setSubmitDialog] = useState<SubmitDialogTypes>({
        state: false,
        handleSubmit: null
    });
    const [imageUrl, setImageUrl] = useState("");
    const [controller, setController] = useState({
        control: null,
        for: "",
        setSelectedFile: null,
    }); // abort controller

    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    // --------- Is Calls Currency Same Or NOT ----------------------------------------------------- //
    const is_currency_same = useMemo(() => {
        const currency_arr = callDetails.map((call) => call.cost_price_currency);
        return checkAllValuesAreSame<string>(currency_arr)
    }, [isOpen])
    // --------------------------------------------------------------------------------------------- //


    const handleBtnClick = async (section: SectionType) => {
        if (section !== "Confirm call details" && select.length === 0) {
            enqueueSnackbar("Select call before invoice action", {
                variant: "warning"
            })
            return;
        }

        if (section === "Generate Invoice") {
            await getInvoice(select[0].fk_expert.toString(), select, setInvoice, bankDetails, setLoading);
        }

        setSection(section);
    }

    const submitUploadInvoice = async () => {
        try {
            await requestPaymentSubmit(
                imageUrl,
                select.map(c => c.id).join(","),
                setLoading,
                enqueueSnackbar,
                setSelect,
                false,
                undefined,
                undefined,
                async () => { },
                callDetails[0].fk_expert
            );
            refetch(select.map((c) => c.id));
            setSubmitDialog((prev) => ({ ...prev, state: false, handleSubmit: null }))
            handleClose();
        } catch (err) {
            console.log(err);
        }

    }

    const submitGenerateInvoice = async () => {
        if (!invoice) {
            enqueueSnackbar("No invoice found", {
                variant: "warning"
            })
            return;
        }

        const select_ids = select.map((c) => c.id).join(",");

        const payload = {
            action: "RequestPayment",
            invoice_num: invoice.invoice_no.replace('#', ''),
            meta: invoice,
            ids: select_ids,
            expert_id: callDetails[0].fk_expert
        }

        setLoading(true);
        try {
            const response = await RequestServer(APIRoutes.scheduleCall, "PATCH", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                setSelect(() => ({
                    callAction: null,
                    isClicked: false,
                    selectedCards: [],
                }));
                refetch(select.map((c) => c.id));
                setSubmitDialog((prev) => ({ ...prev, state: false, handleSubmit: null }))
                handleClose();
            } else {
                console.log({ response });
                enqueueSnackbar(response.message || response.error || "Something Went Wrong", {
                    variant: "warning",
                    autoHideDuration: 10000
                })
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        (async () => {
            const callDetail = callDetails[0];
            if (isOpen && callDetail) {
                setLoading(true);
                const bank_id = callDetail?.fk_expert_value.primary_bank_value?.id?.toString() || null;
                const { isAllowed, bankDetails } = await isGenerateInvoiceAllowed(callDetail?.fk_expert?.toString() || null, bank_id, enqueueSnackbar, true);
                if (isExpert()) {
                    setGenerateInvoiceAllowed(isAllowed);
                }
                setBankDetails(bankDetails)
                setSection("Confirm call details");
                setLoading(false);
            } else if (callDetails.length === 0) {

                if (isExpert()) {
                    const fkExpert = localStorage.getItem("expert_id");
                    const request = await RequestServer(APIRoutes.scheduleCall + "?status=completed&fk_expert=" + fkExpert, "GET");
                    if (request.data.length === 0) {
                        setNoResult(`Payment request is already submitted for all the calls.`)
                    } else {
                        setNoResult(
                            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                                <span style={{ fontSize: "18px", marginBottom: "1rem" }}>
                                    Please select calls with “Status = Completed” before requesting payment.
                                </span>
                                <span style={{ fontSize: "16px", marginBottom: "0.5rem" }}>
                                    • If no completed calls appear, use the status filter.
                                </span>
                                <span style={{ fontSize: "16px" }}>
                                    • The filter is located to the left of the ‘Submit Payment Request’ button.
                                </span>
                            </span>
                        )
                    }
                } else {
                    setNoResult("Please select Completed Calls before requesting for Payments");
                }
            }
        })()
    }, [isOpen]);

    return (
        <>
            <DialogModal
                isOpen={isOpen}
                handleClose={handleClose}
                title={section}
            >
                {callDetails.length === 0 ?
                    <>
                        {noResult ?
                            <NoResultFoundFilters sx={{ paddingBottom: "12px" }} sxItem={{ justifyContent: "flex-start !important" }} text={noResult} />
                            : <CircularProgress sx={{ mt: "10px" }} />
                        }
                    </>
                    :
                    <>
                        {!is_currency_same ?
                            <NoResultFoundFilters sx={{ paddingBottom: "12px" }} text="Please select calls with same payable currency" /> :
                            !callDetails[0]?.fk_expert_value?.primary_bank ?
                                <NoResultFoundFilters sx={{ paddingBottom: "12px" }} text="Please add Bank Account before requesting payment" /> :
                                <>
                                    {section !== "Generate Invoice" &&
                                        <SubmitPaymentRequestTable section={section} callDetails={callDetails} select={select} setSelected={setSelected} />
                                    }

                                    {section === "Confirm call details" &&
                                        <BoxFlex sx={{ gap: "1rem", justifyContent: "flex-end", mt: "1rem" }}>
                                            {generateInvoiceAllowed &&
                                                <CustomBtnFilled
                                                    label="Generate Invoice"
                                                    variant="contained"
                                                    onClick={() => handleBtnClick("Generate Invoice")}
                                                />
                                            }
                                            <CustomBtnFilled
                                                label="Upload Invoice"
                                                variant="contained"
                                                onClick={() => handleBtnClick("Upload Invoice")}
                                            />
                                        </BoxFlex>
                                    }

                                    {section !== "Confirm call details" &&
                                        <>
                                            {section === "Upload Invoice" ?
                                                <>
                                                    {!imageUrl ?
                                                        <Box sx={{ p: "1rem", pt: "32px" }}>
                                                            <FileUpload
                                                                setUrl={setImageUrl}
                                                                setLoading={setLoading}
                                                                setController={setController}
                                                                dropzoneConfig={{
                                                                    maxSize: 5,
                                                                    text:
                                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                                                            <p>Upload Invoice (File should be upto 5MB)</p>
                                                                            <p>[ Drag 'n' drop file here, or click to select file ]</p>
                                                                        </div>
                                                                }}
                                                            />
                                                        </Box> :
                                                        <BoxFlex sx={{ gap: "1rem", p: "1rem", border: "1px solid rgba(0,0,0,0.6)", borderRadius: "5px" }}>
                                                            <a style={{ textDecoration: "underline", color: "var(--green-color)", fontSize: "14px" }} target="_blank" rel="noopener noreferrer" href={imageUrl}>Uploaded Invoice</a>
                                                            <CustomBtnFilled
                                                                label="remove"
                                                                variant="outlined"
                                                                onClick={() => setImageUrl("")}
                                                            />
                                                        </BoxFlex>
                                                    }
                                                </> :
                                                <>
                                                    {invoice &&
                                                        <ViewInvoice
                                                            invoice={invoice}
                                                            showPrintBtn={false}
                                                        />
                                                    }
                                                </>
                                            }



                                            <BoxFlex sx={{
                                                gap: "1rem", justifyContent: "flex-end", mt: "1rem", '@media print': {
                                                    display: 'none', // Hide the button when printing
                                                },
                                            }}>
                                                {bankDetails &&
                                                    <CustomBtnFilled
                                                        label="Back"
                                                        variant="outlined"
                                                        onClick={() => handleBtnClick("Confirm call details")}
                                                    />
                                                }
                                                <CustomBtnFilled
                                                    label="Submit"
                                                    variant="contained"
                                                    onClick={() => {
                                                        if ((imageUrl && section === "Upload Invoice") || section === "Generate Invoice") {
                                                            setSubmitDialog(() => ({
                                                                state: true,
                                                                handleSubmit: section === "Generate Invoice" ? submitGenerateInvoice : submitUploadInvoice
                                                            }))
                                                        } else {
                                                            enqueueSnackbar("Upload invoice before payment request", {
                                                                variant: "warning"
                                                            })
                                                        }

                                                    }}
                                                />
                                            </BoxFlex>
                                        </>
                                    }
                                </>
                        }
                    </>
                }
            </DialogModal>

            {submitDialog.handleSubmit &&
                <SubmitDialog
                    isOpen={submitDialog.state}
                    handleClose={() => setSubmitDialog((prev) => ({ ...prev, state: false, handleSubmit: null }))}
                    handleSubmit={submitDialog.handleSubmit}
                    bankDetails={bankDetails}
                />
            }

        </>

    )
}