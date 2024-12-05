
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormCancelSubmitBtns from "../../../../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../../../../utils/hooks/useHookFormContext";
import { HookAutoComplete } from "../../../../../../../atoms/form-fields/SLFieldAutoComplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import BasicAutocomplete from '../../../../../../../molecules/autocompletes/basic-autocomplete';
import { HookCheckBox } from '../../../../../../../atoms/form-fields/SLFieldCheckBox';
import { HookRadioButton } from '../../../../../../../atoms/form-fields/SLFieldRadioButton';



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  handleClose: () => void;
  handleSubmitBtnClick?: (() => Promise<void>) | (() => void);
};

export const inputRow = {
  padding: "10px 5px",
};

export const zoomAudioOptionArr = [
  { label: "Both", value: "both" },
  { label: "Computer Audio", value: "voip" },
  { label: "Telephone", value: "telephony" },
];



const Fields = ({ handleClose,handleSubmitBtnClick }: Props) => {
  const { registerState } = useHookFormContext();
  return (
    <Grid container mt="1px">
      <Grid item xs={3} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Video:
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("video_host")}
          label="Host"
        />
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("video_participant")}
          label="Participant"
        />
      </Grid>

      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Name Masking:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("masking_participant")}
          label=""
        />
      </Grid>

      <Grid item xs={3} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Audio:
        </Typography>
      </Grid>
      <Grid item container xs={9} sx={inputRow}>
        <HookRadioButton
          {...registerState("audio")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          radioGroupProps={{
            style: { display: "flex", gap: "1rem" },
          }}
          fields={zoomAudioOptionArr}
        />
      </Grid>

      {/* <Grid item xs={3} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
        Alternate Hosts:
        </Typography>
      </Grid>
      <Grid sx={inputRow} item xs={9}>
        <HookAutoComplete
          {...registerState("alternate_hosts")}
          textFieldProps={{
            label: "Alternate Hosts",
            size: "small",
          }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid> */}

      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Enable Meeting Chat:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("meeting_chat")}
          label=""
        />
      </Grid>
      
      <Grid item xs={3} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
        Compliance Officers:
        </Typography>
      </Grid>
      <Grid sx={inputRow} item xs={9}>
      <HookAutoComplete
          {...registerState("compliance_officer")}
          textFieldProps={{
            label: "Compliance Officer",
            size: "small",
          }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      
      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Record Meeting:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("record_meeting")}
          label=""
        />
      </Grid>
      
      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Waiting Room:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("waiting_room")}
          label=""
        />
      </Grid>
      
      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Allow Participants to join anytime:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("joinAnytime")}
          label=""
        />
      </Grid>

      <Grid item xs={6} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
          Mute Participants Upon Entry:
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ ...inputRow }}>
        <HookCheckBox
          {...registerState("mute_entry")}
          label=""
        />
      </Grid>

      <FormCancelSubmitBtns handleSubmitBtnClick={handleSubmitBtnClick} handleClose={handleClose} />
    </Grid>
  );
};

export default Fields;
