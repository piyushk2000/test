import { Grid } from '@mui/material'
import CustomBtnFilled from '../../../atoms/form-molecules/CustomBtnFilled'
import { inputRowCommonStyles, submitbtnRowCommonStyles } from "../../../common/formStyles"
import { HookAutoComplete } from '../../../atoms/form-fields/SLFieldAutoComplete'
import { useHookFormContext } from '../../../utils/hooks/useHookFormContext'
import { formOptions } from './types'
import { useEffect } from 'react'

type Props = {
    handleClose: () => void;
    handleFormChange: () => void;
    formOptions: formOptions
}

const Fields = ({ handleClose, handleFormChange, formOptions }: Props) => {
    const { registerState, watch } = useHookFormContext();
    const { linkProject } = formOptions;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === "change") {
                if (handleFormChange) {
                    handleFormChange();
                }
            }
        });

        return () => subscription.unsubscribe();
        //eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={2} mt={"5px"}>

            {/* Link Project */}
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookAutoComplete
                    {...registerState("linkProject")}
                    textFieldProps={{
                        label: "Choose Project to Link *",
                        size: "small",
                    }}
                    rules={{
                        required: { value: true, message: "This is Required" },
                    }}
                    autocompleteProps={{
                        isOptionEqualToValue: (option: any, value: any) =>
                            option?.value === value?.value,
                        size: "small",
                        options: linkProject || [],
                        noOptionsText: "No Options",
                        multiple: false,
                        sx: { backgroundColor: "white" },
                        renderOption: (props: any, option: any) => (
                            <li {...props} key={option.value}>
                                {option?.label}
                            </li>
                        ),
                    }}
                />
            </Grid>

            <Grid sx={{ ...inputRowCommonStyles, ...submitbtnRowCommonStyles }} item xs={12}>
                <CustomBtnFilled
                    label="cancel"
                    variant="outlined"
                    onClick={handleClose}
                />
                <CustomBtnFilled
                    label="submit"
                    variant="contained"
                    buttonType="submit"
                />
            </Grid>
        </Grid>
    )
}

export default Fields