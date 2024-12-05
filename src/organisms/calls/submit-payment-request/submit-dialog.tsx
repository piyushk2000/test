import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { checkboxDetails, hideAccountNumber } from "./helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { isExpert, isOnlyAdmins } from "../../../utils/role";
import { PrimaryBankValue } from "../../project/project-pe-mapping/actions/share-profile/email-format-dialog/types";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleSubmit(): Promise<void>;
    bankDetails: PrimaryBankValue | null;
}

export function SubmitDialog({ isOpen, handleClose, handleSubmit, bankDetails }: Props) {
    const [checked, setChecked] = useState({
        check_1: false,
        check_2: false,
        check_3: false,
        check_4: false
    });
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const handleSubmitClickHandler = async () => {
        if (!isExpert()) {
            if (!checked.check_1) {
                enqueueSnackbar("Check all boxes before proceeding", { variant: "warning" });
                return;
            }
        } else {
            if (!checked.check_1 || !checked.check_2 || !checked.check_3 || !checked.check_4) {
                enqueueSnackbar("Check all boxes before proceeding", { variant: "warning" });
                return;
            }
        }


        try {
            setLoading(true);
            await handleSubmit();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Please note that no change is allowed later on"}
        >
            <Grid container mt={2}>
                <Grid xs={12} mb={1}>
                    <p style={{ fontSize: "14px", fontWeight: "500" }}>
                        Bank Account Details:
                    </p>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <BoxFlex sx={{
                        backgroundColor: "#fbb01715",
                        padding: "1rem",
                        borderRadius: "10px",
                        width: "100%",
                        border: "1px solid var(--primary-color)",
                        "& p": {
                            fontSize: "14px",
                            fontWeight: "500"
                        }
                    }}>
                        <>
                            {bankDetails &&
                                <Grid container>
                                    <Grid item xs={6}>
                                        <p>Account Holder Name</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p>{bankDetails.account_holder_name}</p>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <p>Account Number</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p>
                                         {hideAccountNumber(bankDetails.bank_details.account_number)}
                                        </p>
                                    </Grid>
                                    {bankDetails.bank_details.ifsc_code &&
                                        <>
                                            <Grid item xs={6}>
                                                <p>
                                                    IFSC Code
                                                </p>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p>
                                                    {bankDetails.bank_details.ifsc_code}
                                                </p>
                                            </Grid>
                                        </>
                                    }
                                    {bankDetails.bank_details.swift_code &&
                                        <>
                                            <Grid item xs={6}>
                                                <p>
                                                    Swift Code
                                                </p>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p>
                                                    {bankDetails.bank_details.swift_code}
                                                </p>
                                            </Grid>
                                        </>
                                    }

                                    {bankDetails.pan &&
                                        <>
                                            <Grid item xs={6}>
                                                <p>
                                                    Pan Card
                                                </p>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p>
                                                    {bankDetails.pan}
                                                </p>
                                            </Grid>
                                        </>
                                    }
                                    {bankDetails?.gstin &&
                                        <>
                                            <Grid item xs={6}>
                                                <p>
                                                    GSTIN
                                                </p>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p>
                                                    {bankDetails?.gstin}
                                                </p>
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                            }
                        </>
                    </BoxFlex>
                </Grid>
                {(isOnlyAdmins() ? [checkboxDetails[0]] : checkboxDetails).map(({ name, label }) => (
                    <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox value={checked.check_1} onChange={(e, checked) => setChecked(prev => ({ ...prev, [name]: checked }))} />} label={label} />
                    </Grid>
                ))}
                <FormCancelSubmitBtns
                    handleClose={handleClose}
                    handleSubmitBtnClick={handleSubmitClickHandler}
                />
            </Grid>
        </DialogModal>
    )
}