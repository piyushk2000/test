import { Grid } from "@mui/material";
import { allCheckBox } from "../helper";
import { HookCheckBox } from "../../../../../atoms/form-fields/SLFieldCheckBox";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import BoxSpaceBtw, { BoxFlex } from "../../../../../atoms/boxSpaceBtw";
import CustomBtnFilled from "../../../../../atoms/form-molecules/CustomBtnFilled";
import { inputRowCommonStyles } from "../../../../../common/formStyles";
import { HookRadioButton } from "../../../../../atoms/form-fields/SLFieldRadioButton";
import { actionFields } from "./helper";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { useBoolean } from "../../../../../utils/hooks/useBoolean";

type Props = {
    handleClose(): void;
}


export const inputRow = {
    padding: "10px 5px",
};

export function Fields({ handleClose }: Props) {
    const { registerState, setValue } = useHookFormContext();

    const handleSelectBtnClick = (selectAll: boolean) => {
        for (let checkbox of allCheckBox) {
            if (!selectAll) {
                setValue(checkbox.value, false);
            } else {
                setValue(checkbox.value, true);
            }
        }
    }



    return (
        <Grid container>
            <Grid item container xs={12} sx={{ backgroundColor: "#f4f4f4", padding: "1rem", margin: "10px 0", borderRadius: "10px" }}>
                <Grid item container xs={12}>
                    <BoxFlex sx={{ gap: "1rem" }}>
                        <CustomBtnFilled
                            label="Select All"
                            variant="contained"
                            onClick={() => handleSelectBtnClick(true)}
                        />
                        <CustomBtnFilled
                            label="Clear All"
                            variant="outlined"
                            onClick={() => handleSelectBtnClick(false)}
                        />
                    </BoxFlex>
                </Grid>
                {allCheckBox.map((checkbox) =>
                    <Grid item xs={3} sx={inputRow}>
                        <HookCheckBox
                            {...registerState(checkbox.value)}
                            label={checkbox.label}
                        />
                    </Grid>
                )}
            </Grid>


            {/* Choose an Action */}
            <Grid item xs={12} md={6} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("action")}
                    label="Choose an Action"
                    radioGroupProps={{
                        sx: {
                            "& .MuiTypography-root": {
                                marginLeft: "-5px !important",
                            },
                        },
                    }}
                    fields={actionFields}
                />
            </Grid>

            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}