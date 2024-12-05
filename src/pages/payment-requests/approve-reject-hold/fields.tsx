import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import { Box } from "@mui/material";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { useEffect } from "react";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";

type Props = {
    handleClose(): void;
    payment_options: { label: string, value: string }[];
    setImageUrl: any;
    setController: any;
    showInvoiceUpload: boolean;
    showInvoiceNum: boolean;
    showRemarks: boolean;
    showPaymentsOptions?: boolean;
    is_bulk_action?: boolean;
    action?: string;
}

export const rejectedOptions = [
    { label: "Invoice is incorrect", value: "Invoice is incorrect" },
    { label: "Payment already paid", value: "Payment already paid" },
  ];

const ApproveRejectHoldFields = ({ handleClose, payment_options, setImageUrl, setController, showInvoiceUpload, showPaymentsOptions, showRemarks, showInvoiceNum , is_bulk_action, action}: Props) => {
    const { registerState, watch } = useHookFormContext();
    const { setLoading } = useFullPageLoading();
    const payment_options_value = watch("payment_options");
    const { value: showInvoice, setTrue: allowInvoiceUpload, setFalse: donotAllowInvoiceUpload } = useBoolean();

    const isPaymentRejected = payment_options_value === "PaymentRequestRejected" || action === "PaymentRequestRejected"

    useEffect(() => {
        let subscription = watch((value, { name, type }) => {
            if (name === "payment_options") {
                if (value.payment_options === "ApproveForPayment") {
                    allowInvoiceUpload();
                } else {
                    donotAllowInvoiceUpload();
                }
            }
        });

        return () => subscription.unsubscribe();
        //eslint-disable-next-line
    }, [watch]);

    return (
        <Grid container spacing={3} mt={"5px"}>
            {showPaymentsOptions &&
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <HookRadioButton
                        {...registerState("payment_options")}
                        label="Choose an Option"
                        radioGroupProps={{
                            sx: {
                                "& .MuiTypography-root": {
                                    marginLeft: "-5px !important",
                                },
                            },
                        }}
                        fields={payment_options}
                    />
                </Grid>
            }

            {showInvoiceUpload && showInvoice &&
                <Grid item xs={16}>
                    <Box>
                        <FileUpload
                            setUrl={setImageUrl}
                            setLoading={setLoading}
                            setController={setController}
                            dropzoneConfig={{
                                maxSize: 5,
                                text:
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                        <p>You can re-upload the invoice [Optional]</p>
                                        <p>Upto 5MB .pdf / .png / .jpg / .jpeg is allowed</p>
                                        <p>[ Drag 'n' drop file here, or click to select file ]</p>
                                    </div>
                            }}
                        />
                    </Box>
                </Grid>
            }

            {isPaymentRejected && 
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <BasicAutocomplete
                        label="Reason"
                        registerName="reason"
                        options={rejectedOptions}
                    />
                </Grid>}

            {showRemarks &&
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <RequiredTextField
                        id="remarks"
                        label="Remarks"
                        max={500}
                        required={false}
                    />
                </Grid>
            }

            {isPaymentRejected &&
             <Grid item xs={12} sx={inputRowCommonStyles}>
                 <HookCheckBox
                    {...registerState("rejected_checkbox")}
                    label="Are you sure you want to reject because this action is irrevocable?"
                    formControlLabelProps={{
                        sx: {
                            color: "red",
                            fontWeight: "700"
                        },
                        label:""
                    }}
                    />
            </Grid>}

            {payment_options_value === "ApproveForPayment" && showInvoiceNum &&
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <RequiredTextField
                        id="invoice_num"
                        label="Invoice Number*"
                        required={true}
                    />
                </Grid>
            }



            {/* ACTION BUTTONS */}

            {(is_bulk_action ? true : !!payment_options_value) &&
                <FormCancelSubmitBtns
                    handleClose={handleClose}
                />
            }

        </Grid>
    );
};

export default ApproveRejectHoldFields;
