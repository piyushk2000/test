import Grid from "@mui/material/Grid";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { complianceResponseArr, responseArr } from "../helper";
import { inputRow } from "../style";
import RefusalFields from "./refusalFields";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { useEffect } from "react";

const Fields = (props: any) => {
  const { handleClose, isComplianceDone, handleFormChange } = props;
  const { registerState, watch } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (handleFormChange) {
          handleFormChange();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Grid container>
        {/* Response */}
        <Grid item container xs={12} sx={inputRow}>
          <HookRadioButton
            {...registerState("response")}
            label="Your Response:*"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={isComplianceDone ? complianceResponseArr : responseArr}
          />
        </Grid>
        {/* All Refusal Fields */}
        <RefusalFields />

        <FormCancelSubmitBtns handleClose={handleClose} />
      </Grid>
    </>
  );
};

export default Fields;
