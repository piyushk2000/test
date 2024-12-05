import Grid from '@mui/material/Grid'
import FormCancelSubmitBtns from '../../../atoms/formCancelSubmitBtns'
import { HookRadioButton } from '../../../atoms/form-fields/SLFieldRadioButton';
import { useHookFormContext } from '../../../utils/hooks/useHookFormContext';
import { inputRowCommonStyles } from '../../../common/formStyles';

type Props = {
    handleClose(): void;
    actionOptions: Array<{ label: string, value: string }>;
    selectActionSubmitBtnName: string;
}

const Fields = ({ handleClose, actionOptions, selectActionSubmitBtnName }: Props) => {
    const { registerState } = useHookFormContext();

    return (
        <Grid container>

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
                    fields={actionOptions}
                />
            </Grid>

            <FormCancelSubmitBtns
                handleClose={handleClose}
                submitLabel={selectActionSubmitBtnName}
            />
        </Grid>
    )
}

export default Fields