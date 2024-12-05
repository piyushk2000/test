import Box from "@mui/material/Box";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { rejectInvitation } from "../helper";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { useSnackbar } from "notistack";
import { genericPostPatch } from "../../../utils/services";
import WarningDialog from "../../../molecules/form-close-warning";
import { useBoolean } from "../../../utils/hooks/useBoolean";

type Props = {
  invitationId?: string;
  submitLabel: string;
  onSubmit: () => void;
};

export default function ActionButtons({
  invitationId,
  submitLabel,
  onSubmit,
}: Props) {
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();

  const {
    value: warningModalOpen,
    setValue: setWarningModalOpen,
    setFalse: setWarningModalClose,
  } = useBoolean();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: 3 }}>
      {invitationId ? (
        <CustomBtnFilled
          label="Decline"
          variant="outlined"
          onClick={setWarningModalOpen}
        />
      ) : null}

      <Box sx={{ flex: "1 1 auto" }} />
      <CustomBtnFilled
        label={submitLabel}
        variant="contained"
        onClick={onSubmit}
        buttonType="submit"
      />
      {invitationId ? (
        <WarningDialog
          handleClose={setWarningModalClose}
          handleYesClick={() => {
            genericPostPatch(
              () => rejectInvitation(invitationId),
              enqueueSnackbar,
              setLoading
            );
            setWarningModalClose();
          }}
          open={warningModalOpen}
          text="Are you sure you want to decline this project? Once declined, you'll not be able to accept the project."
          yesLabel="Yes. I want to decline"
        />
      ) : null}
    </Box>
  );
}
