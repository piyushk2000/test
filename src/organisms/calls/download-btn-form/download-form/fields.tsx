import { Grid, IconButton, Typography } from "@mui/material";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { inputRowCommonStyles } from "../../../../common/formStyles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDatePicker from "../../../../atoms/form-fields/SLFieldDatePicker";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { dateClearBtnStyles } from "../../../edit-expert/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../../../../utils/hooks/useIsMobile";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import { HookRadioButton } from "../../../../atoms/form-fields/SLFieldRadioButton";
import { sheet_options } from "../helper";
import { IsCalenderTypes, SetCalender } from "../../../../pages/Calls/types";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";

type Props = {
    handleClose: () => void;
    isCalender: IsCalenderTypes;
    setCalender: SetCalender;
}

export default function Fields({ handleClose, isCalender, setCalender }: Props) {
    const { registerState, watch, setValue, } = useHookFormContext();

    const [date_of_call_value, sheet_option_value] = watch(["date_of_call", "sheet_option"]);
    const isMobile = useIsMobile();

    const handleClearBtn = () => {
        setValue("date_of_call", null);
    };

    return (
        <Grid container>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("sheet_option")}
                    label="Choose an option to download excel"
                    radioGroupProps={{
                        sx: {
                            "& .MuiTypography-root": {
                                marginLeft: "-5px !important",
                            },
                        },
                    }}
                    fields={sheet_options}
                />
            </Grid>

            {sheet_option_value !== "Calls" && sheet_option_value !== "pan"  && sheet_option_value &&
                <>
                    <Grid item xs={12} sx={inputRowCommonStyles}>
                        <BasicAutocomplete
                            registerName="no_of_records"
                            label="No of Records"
                            options={[
                                { label: "25", value: 25 },
                                { label: "50", value: 50 },
                                { label: "100", value: 100 },
                                { label: "200", value: 200 },
                                { label: "500", value: 500 }
                              ]}
                        />
                    </Grid>
                    <Grid item xs={12} sx={inputRowCommonStyles}>
                        <BoxFlex
                            sx={{gap: "1rem"}}
                            onClick={() => setCalender(prev => ({...prev, open: true}))}
                        >
                            <Typography fontWeight={500}>
                                Approved On:
                            </Typography>
                            <Typography sx={{backgroundColor: "white", padding: "10px", borderRadius: "10px", cursor: "pointer", border: "1px solid rgba(0,0,0,0.3)"}}>
                                {isCalender.value || "Click to Choose a Date"}
                            </Typography>
                        </BoxFlex>
                    </Grid>
                </>
            }

            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}