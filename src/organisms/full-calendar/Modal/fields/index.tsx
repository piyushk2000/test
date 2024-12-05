import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import styles from "../../../../common/inputs.module.scss";
import { commonInputStyles } from "../../../../common/input-styles";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import HookTimePicker from "../../../../atoms/form-fields/SLFieldTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { typeArr } from "../helper";
import { HookSelect } from "../../../../atoms/form-fields/SLFieldSelect";
import { useEffect } from "react";
import PeExpert from "./peExperts";
import { useReadLocalStorage } from "usehooks-ts";
import getDurationOptions from "../../../../utils/getDurationOptions";
import { LocalDayjs } from "../../../../utils/timezoneService";
import { isAdmin, isSuperAdmin } from "../../../../utils/role";

type Props = {
  handleClose: () => void;
  eventInfos: any;
  isEditCard: boolean;
  projectId: string | null;
};

export default function Feilds({
  handleClose,
  eventInfos,
  isEditCard,
  projectId,
}: Props) {
  const { registerState, watch, setValue } = useHookFormContext();

  const start_time = isEditCard ? eventInfos?.event?.start : eventInfos?.start;
  const end_time = isEditCard ? eventInfos?.event?.end : eventInfos?.end;

  console.log(eventInfos);
  const type_value = watch("type");

  const isSA = isSuperAdmin() || isAdmin();

  useEffect(() => {
    if (isEditCard) {
      // setValue("name", eventInfos?.event?.title);
      const entityType = eventInfos?.event?.extendedProps?.type;
      setValue("type", entityType);
      if (entityType === "Expert") {
        setValue("expert", eventInfos?.event?.title);
      }
    }
    setValue("start_time", LocalDayjs(start_time));
    setValue("duration", LocalDayjs(end_time).diff(start_time, "minutes"));
  }, [start_time.getTime(), end_time.getTime(), isEditCard]);

  return (
    <Grid container>
      {isSA ? (
        <Grid className={styles.inputRow} item xs={12}>
          <HookSelect
            rules={{
              required: { value: true, message: "This is a required Feild" },
            }}
            {...registerState("type")}
            label="Type"
            items={typeArr}
            selectProps={{ ...commonInputStyles, disabled: isEditCard }}
          />
        </Grid>
      ) : null}

      {projectId && isSA ? (
        <PeExpert
          projectId={projectId}
          is_visible={type_value === "Expert"}
          disabled={isEditCard}
        />
      ) : null}

      <Grid className={styles.inputRow} item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookTimePicker
            {...registerState("start_time")}
            textFieldProps={{
              ...commonInputStyles,
              label: "Start Time",
            }}
            timePickerProps={{
              ampm: false,
              // timezone: timeZone ? timeZone : undefined
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid className={styles.inputRow} item xs={12} sm={6}>
        <HookSelect
          rules={{
            required: { value: true, message: "This is a required Feild" },
          }}
          {...registerState("duration")}
          label="Duration"
          items={getDurationOptions(15, 720)}
          selectProps={{ ...commonInputStyles }}
        />
      </Grid>

      <Grid className={styles.actionRow} item xs={12}>
        <CustomBtnFilled
          label="cancel"
          variant="outlined"
          onClick={handleClose}
        />
        <CustomBtnFilled
          // disabled={props.submitting}
          label="submit"
          variant="contained"
          buttonType="submit"
        />
      </Grid>
    </Grid>
  );
}
