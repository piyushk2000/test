import Grid from "@mui/material/Grid";
import { HookSwitch } from "../../../atoms/form-fields/SLFieldSwitch";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { switchStyles } from "../../edit-expert/styles";
import { inputRow } from "../style";
import { allowQc } from "../helper";

const SwitchFields = () => {
  const { registerState } = useHookFormContext();
  return (
    <>
      <Grid
        item
        container
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0",
        }}
      >
        {/* Self Registered */}
        <div>
          <HookSwitch
            {...registerState("self_registered")}
            label="Self Registered"
            labelProps={{
              sx: switchStyles,
            }}
          />
        </div>

        {/* Public Profile */}
        <div>
          <HookSwitch
            {...registerState("private_profile")}
            label="Private Profile"
            labelProps={{
              sx: switchStyles,
            }}
          />
        </div>

        {/* Premium expert */}
        <div>
          <HookSwitch
            {...registerState("premium_expert")}
            label="Premium"
            labelProps={{
              sx: switchStyles,
            }}
          />
        </div>

        {/* DND */}
        <div>
          <HookSwitch
            {...registerState("dnd")}
            label="DND"
            labelProps={{
              sx: switchStyles,
            }}
          />
        </div>
        {/* qc_notes */}
        {
          allowQc() &&
          <div>
          <HookSwitch
            {...registerState("qc_notes")}
            label="NO QC"
            labelProps={{
              sx: switchStyles,
            }}
          />
        </div>
        }
        
      </Grid>
    </>
  );
};

export default SwitchFields;
