import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DialogModal from "../../../atoms/dialog"
import { Select, SetSelect } from "../../../pages/Calls/types";
import ViewInvoice from "../view-invoice";
import { useEffect, useState } from "react";
import { getInvoice } from "./helper";
import { ViewInvoiceType } from "../view-invoice/types";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { PrimaryBankValue } from "../../project/project-pe-mapping/actions/share-profile/email-format-dialog/types";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { useSnackbar } from "notistack";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    select: Select;
    setSelect: SetSelect;
    bankDetails: PrimaryBankValue | null;
    refetch: () => Promise<void>;
}

const GenerateInvoice = ({ isOpen, handleClose, select, setSelect, bankDetails, refetch }: Props) => {
    const [invoice, setInvoice] = useState<ViewInvoiceType>(null);
    const expert_id = localStorage.getItem("expert_id");
    const isMobile = useIsMobile();
    const { setLoading } = useFullPageLoading();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmitBtnClickHandler = async () => {
        if (!invoice) {
            enqueueSnackbar("No invoice found", {
                variant: "warning"
            })
            return;
        }

        const select_ids = select.selectedCards.map((c) => c.id).join(",");

        const payload = {
            action: "RequestPayment",
            invoice_num: invoice.invoice_no.replace('#', ''),
            meta: invoice,
            ids: select_ids,
        }

        setLoading(true);
        try {
            const response = await RequestServer(APIRoutes.scheduleCall, "PATCH", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                setSelect((prev) => ({
                    callAction: null,
                    isClicked: false,
                    selectedCards: [],
                }));
                refetch();
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
        isOpen && getInvoice(expert_id, select.selectedCards, setInvoice, bankDetails,setLoading);
    }, [isOpen])

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Generate Invoice"}
        >
            <Grid container mt={"10px"}>
                <Box sx={{
                    padding: isMobile ? "1rem" : "0",
                    overflowX: "auto",
                }}>
                    {invoice &&
                        <ViewInvoice
                            invoice={invoice}
                            showPrintBtn={false}
                        />
                    }
                </Box>
                <FormCancelSubmitBtns
                    handleClose={handleClose}
                    sx={{
                        '@media print': {
                            display: 'none', // Hide the button when printing
                        },
                    }}
                    handleSubmitBtnClick={handleSubmitBtnClickHandler}
                />
            </Grid>
        </DialogModal>
    )
}

export default GenerateInvoice