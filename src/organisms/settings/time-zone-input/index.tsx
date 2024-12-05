import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { timeZonesOptions } from "../../../constants/timezones";
import { Typography } from "@mui/material";
import EditIcon from "../../../assets/images/expert/edit.png";
import CustomButton from "../../../atoms/Button";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useSnackbar } from "notistack";
import { setTimeZone } from "./helper";
import { useLocalStorage } from "usehooks-ts";

export default function TimeZoneInput() {
  const [timeZoneSaved, setTimeZoneSaved] = useLocalStorage<string | undefined>('timezone', undefined)
  const [timeZone, setValue] = useState<string | undefined>(
    timeZoneSaved
  );

  const { enqueueSnackbar } = useSnackbar() 

  return (
    <>
      <Typography sx={{ fontWeight: "medium", mb: "4px", fontSize: "12px" }}>
        Timezone:
      </Typography>
      <Autocomplete
        sx={{ backgroundColor: "white", minWidth: "200px" }}
        size="small"
        fullWidth
        onChange={(e, data) => setValue(data)}
        value={timeZone}
        options={timeZonesOptions}
        disableClearable
        renderInput={(params: any) => (
          <TextField {...params} placeholder={"Select Your TimeZone"} />
        )}
      />

      {timeZone && timeZoneSaved != timeZone ? (
        <CustomBtnFilled
          styles={{ marginTop: "24px" }}
          label={"Update"}
          variant="contained"
          onClick={() => setTimeZone(timeZone, enqueueSnackbar, setTimeZoneSaved)}
        />
      ) : null}
    </>
  );
}
