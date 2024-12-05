import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import DialogModal from "../../../../../atoms/dialog";
import ShowAnswersForm from "../../../../compliances/autoAprovalDialog/showAnswersForm";
import { MetaType, PeComplianceData, setDialogState } from "../../type";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import React, { useState } from "react";
import DocumentForProof from "../../../../../pages/Expert-Compliance/upload-document";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import CustomBtnFilled from "../../../../../atoms/form-molecules/CustomBtnFilled";
import { isAdmin, isSuperAdmin } from "../../../../../utils/role";
import { GetComplianceOfficers } from "./helper";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    pe_compliance: PeComplianceData | null;
    refetch(): Promise<void>;
    setPeDialog?: setDialogState;
    snippet?: string | null;
    expert_id?: number | null;
    company?: string | null;
    designation?: string | null;
    meta?: MetaType;
    openLoginWarning?: () => void; // only used in Client View - Profile Shared
    show_answers_only?: boolean;
}

export function ReviewCompliance({ isOpen, handleClose, pe_compliance, setPeDialog, snippet, expert_id, company, designation, meta, refetch, openLoginWarning, show_answers_only = false }: Props) {
    const [url, setUrl] = useState<string | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const is_admin = (isSuperAdmin() || isAdmin())
    const { setLoading } = useFullPageLoading();

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<Array<{ label: string, value: number }> | null>(null);
    const [complianceOfficer, setComplianceOfficer] = React.useState<{ label: string, value: number } | null>(null);
    const loading = open && !options;

    const handleSubmit = async (action: "Approve" | "Reject") => {

        if (!pe_compliance) {
            enqueueSnackbar("PE compliance not found", {
                variant: "error"
            })
            return;
        }

        if (is_admin) {
            if (!url) {
                enqueueSnackbar("Upload proof document", {
                    variant: "warning"
                })
                return;
            }

            if (!complianceOfficer) {
                enqueueSnackbar("Select compliance officer", {
                    variant: "warning"
                })
                return;
            }
        }


        const payload: any = {
            action,
            unique_code: pe_compliance.unique_code,
        }

        if (url) {
            payload.client_compliance_proof_url = url;
        }

        if (complianceOfficer) {
            payload.compliance_officer_user_id = complianceOfficer.value;
        }

        setLoading(true);

        try {
            const response = await RequestServer(APIRoutes.PE_COMPLIANCE + "/client", "POST", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success",
                });

                handleClose();
                refetch();

            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString() || response.error.toString() || "something went wrong", {
                    variant: "warning",
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {

        if (!open) {
            setOptions([]);
        } else {
            if (pe_compliance) {
                GetComplianceOfficers(pe_compliance, setOptions)
            }
        }

    }, [loading, open]);


    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={ show_answers_only ? "Answers" : "Review Compliance"}
            TitleEl={
                <>
                    {is_admin && !show_answers_only &&
                        <CustomBtnFilled
                            label={"View Expert Details"}
                            variant="outlined"
                            onClick={() => {
                                if (snippet !== undefined && expert_id !== undefined && company !== undefined && designation !== undefined && meta !== undefined) {
                                    // opening Expert details to page - copy to clipboard
                                    setPeDialog && setPeDialog((prev) => ({
                                        ...prev,
                                        actions: {
                                            ...prev.actions,
                                            shareProfile: {
                                                ...prev.actions.shareProfile,
                                                email_format: true,
                                                snippet: snippet,
                                                expert_id: expert_id,
                                                company: company,
                                                designation: designation,
                                                charges: meta.selling_price_currency && meta.selling_price ? `${meta.selling_price_currency} ${meta.selling_price}` : "",
                                                meta: meta
                                            }
                                        }
                                    }))
                                }
                            }}
                        />
                    }
                </>

            }
        >
            <ShowAnswersForm questions={pe_compliance?.answers || null} isInfo={false} />
            {is_admin && !show_answers_only &&
                <>
                    <DocumentForProof
                        setUrl={setUrl}
                    />
                    <Autocomplete
                        id="asynchronous-demo"
                        sx={{ backgroundColor: "white" }}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        onChange={(event, value) => {
                            setComplianceOfficer(value);
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options || []}
                        noOptionsText={"No Compliance Officer Found for the Client"}
                        loading={!!options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Approve/Reject on behalf of *"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {!!options ? <CircularProgress sx={{ color: "Var(--primary-color)" }} size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </>
            }


            {!show_answers_only &&
                <Grid container mt={"10px"}>
                    <FormCancelSubmitBtns
                        submitLabel="Approve"
                        cancelLabel="Reject"
                        handleClose={openLoginWarning ? openLoginWarning : async () => await handleSubmit("Reject")}
                        handleSubmitBtnClick={openLoginWarning ? openLoginWarning : async () => await handleSubmit("Approve")}
                    />
                </Grid>
            }

        </DialogModal>
    )
}