import { Grid, IconButton, InputAdornment } from "@mui/material";
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import { HookTextField } from "../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles, } from "../../common/formStyles";
import { commonInputStyles } from "../../common/input-styles";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    handleClose(): void;
}

type TextFieldProps = {
    register_id: string;
    label: string;
    isNumber?: boolean;
}

export const HookTextFieldWithClose = ({ register_id, label, isNumber = false }: TextFieldProps) => {
    const { registerState, watch, setValue } = useHookFormContext();
    const value = watch(register_id);

    return (
        <HookTextField
            {...registerState(register_id)}
            textFieldProps={{
                ...commonInputStyles,
                label,
                type: isNumber ? "number" : "text",
                InputProps: {
                    endAdornment:
                        value ?
                            <InputAdornment
                                sx={{ cursor: "pointer" }}
                                position="end"
                                onClick={() => { setValue(register_id, "") }}
                            >
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment> : null
                }
            }}
        />
    )
}


const Fields = ({ handleClose }: Props) => {
    const { registerState } = useHookFormContext();

    return (
        <Grid container mt={"10px"}>

            {/* Search By ID */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="id"
                    label="ID"
                />
            </Grid>

            {/* Search By Name */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="name"
                    label="Name"
                />
            </Grid>

            {/* Search By Nick Name */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="nick_name"
                    label="Nick Name"
                />
            </Grid>

            {/* Search By Email */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="email"
                    label="Email"
                />
            </Grid>

            {/* Search By Mobile */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="mobile"
                    label="Mobile"
                />
            </Grid>

            {/* Search By Headline */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="headline"
                    label="Headline"
                />
            </Grid>

            {/* Search By Bio */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="bio"
                    label="Bio"
                />
            </Grid>

            {/* Search By Functions */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="functions"
                    label="Functions"
                />
            </Grid>

            {/* Search By Company */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="company"
                    label="Company"
                />
            </Grid>

            {/* Search By Domain */}
            <Grid item xs={12} md={4} sx={inputRowCommonStyles}>
                <HookTextFieldWithClose
                    register_id="domain"
                    label="Domain"
                />
            </Grid>

            <FormCancelSubmitBtns
                handleClose={handleClose}
                submitLabel="Search"
            />
        </Grid>
    )
}

export default Fields