import { Grid } from "@mui/material";
import DialogModal from "../../../../../atoms/dialog";
import { bulkRevertHandler, handleSubmitClose } from "../../helper";
import { isDialogState, SelectExpert, setAlertNBackdropOpen, setDialogState } from "../../type";
import MultipleExperts from "../multipleExperts";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";

type Props = {
    isDialog: isDialogState;
    setPeDialog: setDialogState;
    selectExpert: SelectExpert;
    refetch: () => Promise<void>;
    handleCloseSubmit: () => void;
}

export default function BulkRevert({ isDialog, setPeDialog, selectExpert, handleCloseSubmit, refetch }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    return (
        <DialogModal
            isOpen={isDialog.actions.bulkRevert.state}
            handleClose={() => handleSubmitClose(setPeDialog)}
            title={"Bulk Revert"}
        >
            <Grid container>
                {selectExpert.selectedCards.length > 0
                    ?
                    <>
                        <Grid item xs={12}>
                            <MultipleExperts
                                selectedCards={selectExpert.selectedCards}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ "& p": { fontSize: "16px", fontWeight: "500" } }}>
                            <p>Are you sure you want to revert the selected expert(s) to 'Added' state?</p>
                        </Grid>
                        <FormCancelSubmitBtns
                            handleClose={() => handleSubmitClose(setPeDialog)}
                            handleSubmitBtnClick={async () => {
                                await bulkRevertHandler(selectExpert, enqueueSnackbar, setPeDialog, setLoading, refetch)
                                handleCloseSubmit();
                            }
                            }
                        />
                    </>
                    :
                    <Grid item xs={12}>
                        <p>Please select one or more experts to revert</p>
                    </Grid>
                }
            </Grid>
        </DialogModal>
    )
}