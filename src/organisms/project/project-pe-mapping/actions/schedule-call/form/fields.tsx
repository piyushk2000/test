import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormCancelSubmitBtns from "../../../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../../../utils/hooks/useHookFormContext";
import {
  commonInputStyles,
  formatClientContact,
  formatResearchAnalyst,
  scheduleTypeStyle,
  zoomBoxStyles,
} from "../helper";
import { HookTextField } from "../../../../../../atoms/form-fields/SLFieldTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDateTimePicker from "../../../../../../atoms/form-fields/SLFieldDateTimePicker";
import { HookSelect } from "../../../../../../atoms/form-fields/SLFieldSelect";
import { HookCheckBox } from '../../../../../../atoms/form-fields/SLFieldCheckBox';
import { useFetch } from "../../../../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../../../../constants";
import { HookAutoComplete } from "../../../../../../atoms/form-fields/SLFieldAutoComplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useMemo, useState } from "react";
import getDurationOptions from "../../../../../../utils/getDurationOptions";
import { HookRichTextField } from "../../../../../../atoms/rich-text-editor/HookRichTextEditor";
import BasicAutocomplete from '../../../../../../molecules/autocompletes/basic-autocomplete';
import DialogModal from '../../../../../../atoms/dialog';
import ZoomForm from './zoom-settings';
import { HookRadioButton } from '../../../../../../atoms/form-fields/SLFieldRadioButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import { tabsStyle, tabStyle } from '../../../../../../molecules/calender-picker-dialog/helper';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const zoomOptionArr = [
  { label: "Zoom (Automated)", value: "zoom" },
  { label: "Manual", value: "manual" },
  { label: "None", value: "none" }
];

type Props = {
  handleClose: () => void;
  project_id: string | null;
};

export const inputRow = {
  padding: "10px 5px",
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}




const Fields = ({ handleClose, project_id }: Props) => {
  const [valueTab, setValueTab] = useState(0);
  const [dialogOpen, setdialogOpen] = useState(false);
  const { registerState, watch, setValue } = useHookFormContext();
  const [videoLinkOptionValue] = watch(["videoLinkOption"]);
  const [zoomSettings] = watch(["zoomSettings"]);
  const {
    loading,
    data: projectDetails,
  } = useFetch(APIRoutes.projects + "?id=" + project_id);

  const clientContact = useMemo(
    () => formatClientContact(projectDetails),
    //eslint-disable-next-line
    [loading]
  );

  const research_analysts = useMemo(
    () => formatResearchAnalyst(projectDetails),
    //eslint-disable-next-line
    [loading]
  );

  const handleZoomSettings = () => {
    setdialogOpen(false)
  }

  const handleZoomSubmitSettings = (valueSent: any) => {
    setdialogOpen(false)
    setValue("zoomSettings", valueSent || {})
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <>
      <Grid container mt="1px">
        <Grid item xs={6} sx={{ ...inputRow, position: "relative" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HookDateTimePicker
              {...registerState("scheduled_start_time")}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              dateTimePickerProps={{
                format: "DD/MM/YYYY hh:mm A",
                className: "date-time-picker",
                label: "Call Date & Time in IST",
                slotProps: { textField: { size: "small", fullWidth: true } },
                // disablePast: true,
                sx: {
                  backgroundColor: "white",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} sx={{ ...inputRow }}>
          <BasicAutocomplete
            label="Duration"
            registerName="duration"
            isRequired
            options={getDurationOptions(15, 240)}
          />
        </Grid>

        <Grid item xs={2} sx={{ ...inputRow }}>
          <Typography sx={{ paddingTop: '9px', fontSize: "14px", fontWeight: "500" }}>
            VC/Meeting Link:
          </Typography>
        </Grid>
        <Grid item container xs={10} sx={inputRow}>
          <HookRadioButton
            {...registerState("videoLinkOption")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={zoomOptionArr}
          />
        </Grid>

        {videoLinkOptionValue == 'zoom' ? <Grid item xs={6}>
          <div onClick={() => setdialogOpen(true)} style={zoomBoxStyles}>Zoom Configuration <SettingsApplicationsIcon fontSize="medium" /></div>
        </Grid> : ''}

        {videoLinkOptionValue == 'manual' ?
          <Grid sx={inputRow} item xs={12}>
            <HookRichTextField
              {...registerState("meetingLink")}
              rules={{
                required: { value: true, message: "This field is required" },
                maxLength: {
                  value: 10000,
                  message: "Meeting link should not be greater than 200 characters",
                },
              }}
              quillProps={{
                placeholder: "Meeting Link",
              }}
            />
          </Grid> : ''}
        <Grid sx={inputRow} item xs={12} md={12}>
          <HookAutoComplete
            {...registerState("research_analyst")}
            textFieldProps={{
              label: "Research Analyst *",
              size: "small",
            }}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              size: "small",
              disablePortal: true,
              options: research_analysts,
              style: { backgroundColor: "white" },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={valueTab}
              onChange={handleChange}
              aria-label="Client Yab"
            >
              <Tab label="Client" {...a11yProps(0)} sx={{ ...tabStyle, fontSize: '14px' }} />
              <Tab label="Expert" {...a11yProps(1)} sx={{ ...tabStyle, fontSize: '14px' }} />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <CustomTabPanel value={valueTab} index={0}>
              <Grid sx={inputRow} item xs={12}>
                <HookTextField
                  rules={{
                    required: { value: true, message: "This field is required" },
                  }}
                  {...registerState("title")}
                  textFieldProps={{
                    ...commonInputStyles,
                    label: "Title",
                  }}
                />
              </Grid>
              <Grid sx={inputRow} item xs={12}>
                <HookAutoComplete
                  {...registerState("client_participants")}
                  rules={{
                    required: { value: true, message: "This field is required" },
                  }}
                  textFieldProps={{
                    label: "Client Participants",
                    size: "small",
                  }}
                  autocompleteProps={{
                    isOptionEqualToValue: (option: any, value: any) =>
                      option?.value === value?.value,
                    size: "small",
                    options: clientContact,
                    multiple: true,
                    disableCloseOnSelect: true,
                    renderOption: (props, option: any, { selected }) => {
                      return (
                        <li {...props} key={option.value}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option?.label}
                        </li>
                      );
                    },
                    style: { backgroundColor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ ...inputRow }}>
                <HookRichTextField
                  {...registerState("invitation_text")}
                  rules={{
                    required: { value: true, message: "This field is required" },
                    maxLength: {
                      value: 10000,
                      message: "Invitation Text should be upto 10000 characters",
                    },
                  }}
                  quillProps={{
                    placeholder: "Invitation Text",
                  }}
                />
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>
              <Grid sx={inputRow} item xs={12}>
                <HookTextField
                  rules={{
                    required: { value: true, message: "This field is required" },
                  }}
                  {...registerState("call_title_for_expert")}
                  textFieldProps={{
                    ...commonInputStyles,
                    label: "Title",
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ ...inputRow }}>
                <HookRichTextField
                  {...registerState("invitation_text_for_expert")}
                  rules={{
                    required: { value: true, message: "This field is required" },
                    maxLength: {
                      value: 10000,
                      message: "Invitation Text should be upto 10000 characters",
                    },
                  }}
                  quillProps={{
                    placeholder: "Invitation Text",
                  }}
                />
              </Grid>
            </CustomTabPanel>
          </Box>
        </Grid>

        <Grid item xs={5} sx={{ ...inputRow }}>
          <Typography sx={{ paddingTop: '9px', fontSize: "14px", fontWeight: "500" }}>
            Do not send email to client and expert:
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ ...inputRow }}>
          <HookCheckBox
            {...registerState("doNotSendEmail")}
            label=""
          />
        </Grid>
        <FormCancelSubmitBtns handleClose={handleClose} />
      </Grid>

      <DialogModal
        title={
          "Zoom Configuration Settings"
        }
        isOpen={dialogOpen}
        handleClose={() =>
          setdialogOpen(false)
        }
      >
        <ZoomForm
          zoomSettings={zoomSettings}
          handleClose={() =>
            handleZoomSettings()
          }
          handleSubmitClose={(val) =>
            handleZoomSubmitSettings(val)
          }
        />
      </DialogModal>

    </>
  );
};

export default Fields;
