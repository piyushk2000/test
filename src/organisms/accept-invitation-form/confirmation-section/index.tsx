import { Box, Link, Typography } from "@mui/material";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ActionButtons from "../action-buttons";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { acceptAgreement } from "../helper";
import { genericPostPatch } from "../../../utils/services";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";

type Props = {
  invitationId: string;
  projectId: string;
  expertId: string;
};

export default function ConfirmationSection({
  invitationId,
  projectId,
  expertId,
}: Props) {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const { setLoading } = useFullPageLoading();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit() {
    if (!checked) {
      enqueueSnackbar("Check the checkbox", {
        variant: "warning",
      });
    } else {
      genericPostPatch(
        () => acceptAgreement(expertId),
        enqueueSnackbar,
        setLoading,
        () => {
          navigate(
            AppRoutes.CALENDER +
              "?id=" +
              projectId +
              "&expertId=" +
              expertId +
              "&new_user=true"
          );
        }
      );
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography>
        By participating in this consultation, you are deemed to consent to
        Infollion and/or Clients, its agents and subcontractors recording and/or
        transcribing (whether by means of Al-based tools or otherwise) this
        consultation. In addition, you agree that all recordings are owned by
        Infollion or its clients. By agreeing to participate in this project,
        you hereby consent to such recordings and/or transcriptions.
      </Typography>
      <Box sx={{ mt: 3, fontSize: "10px" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={<TermsAndConditionLabel />}
          />
        </FormGroup>
      </Box>
      <ActionButtons
        // invitationId={invitationId}
        submitLabel="Accept"
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

const TermsAndConditionLabel = () => {
  return (
    <Typography sx={{ fontSize: "12px" }}>
      I acknowledge that I am bound by the{" "}
      <Link href="https://www.infollion.com/expert-agreement" target="_blank">
        Terms & Conditions
      </Link>{" "}
      and my participation in this project does not present a conflict of
      interest or violate any confidentiality or other obligation to past or
      present employers or any third party
    </Typography>
  );
};
