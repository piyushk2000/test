import { Grid, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import { useEffect, useState } from "react";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../common/input-styles";
import { VisiblityIconStyles, VisiblityStyle } from "./style";

type Props = {
    isChange(): void;
    handleClose(): void;
}

const Fields = ({ isChange, handleClose }: Props) => {
    const { watch, registerState } = useHookFormContext();
    const [show, setShow] = useState({
        new_pass: false,
        old_pass: false,
        confirm_pass: false
    });

    useEffect(() => {
        const subscription = watch((value: any, { name, type }: any) => {
            if (type === "change") {
                isChange();
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);

    return (
        <Grid container spacing={2} mt="1px">
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("old_pass")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Old Password",
                        required: true,
                        type: show.old_pass ? "text" : "password",
                    }}
                />
                <IconButton
                    sx={VisiblityIconStyles}
                    onClick={() => setShow((prev) => ({ ...prev, old_pass: !prev.old_pass }))}>
                    {show.old_pass ? <VisibilityIcon sx={VisiblityStyle} /> : <VisibilityOffIcon sx={VisiblityStyle} />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("new_pass")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "New Password",
                        required: true,
                        type: show.new_pass ? "text" : "password",
                    }}
                />
                <IconButton
                    sx={VisiblityIconStyles}
                    onClick={() => setShow((prev) => ({ ...prev, new_pass: !prev.new_pass }))}>
                    {show.new_pass ? <VisibilityIcon sx={VisiblityStyle} /> : <VisibilityOffIcon sx={VisiblityStyle} />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("confirm_pass")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={
                        {
                            ...commonInputStyles,
                            label: "Confirm New Password",
                            required: true,
                            type: show.confirm_pass ? "text" : "password",
                        }
                    }
                />
                <IconButton
                    sx={VisiblityIconStyles}
                    onClick={() => setShow((prev) => ({ ...prev, confirm_pass: !prev.confirm_pass }))}>
                    {show.confirm_pass ? <VisibilityIcon sx={VisiblityStyle} /> : <VisibilityOffIcon sx={VisiblityStyle} />}
                </IconButton>
            </Grid>

            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Fields