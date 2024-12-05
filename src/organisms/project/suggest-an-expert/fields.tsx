import Grid from '@mui/material/Grid'

import FormCancelSubmitBtns from '../../../atoms/formCancelSubmitBtns'
import { RequiredTextField } from '../../../molecules/input-components/RequiredTextField'
import IsdAutoCompleteField from '../../../atoms/isd-field'
import urlRegex from 'url-regex'
import { validRegex } from '../../../utils/isValidType'
import { useHookFormContext } from '../../../utils/hooks/useHookFormContext'
import { useEffect } from 'react'

type Props = {
    handleClose(): void;
    handleChange(): void;
}

const Fields = ({ handleClose, handleChange }: Props) => {
    const { watch } = useHookFormContext();


    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === "change") {
                handleChange();
            }
        });

        return () => subscription.unsubscribe();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <RequiredTextField
                    label='Name *'
                    id="name"
                    required
                    max={100}
                />
            </Grid>
            <Grid item xs={6}>
                <RequiredTextField
                    label="Current Company"
                    id="curr_company"
                    required={false}
                    max={100}
                />
            </Grid>
            <Grid item xs={6}>
                <RequiredTextField
                    label="Current Designation"
                    required={false}
                    id="curr_designation"
                    max={100}
                />
            </Grid>
            <Grid item xs={12}>
                <RequiredTextField
                    label="Source Link (Linkedin / Web handle / Any other link)"
                    id="source_link"
                    required={false}
                    max={200}
                    pattern={
                        {
                            value: urlRegex(),
                            message: "Source Link is not a valid url"
                        }
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <RequiredTextField
                    label="Email"
                    id="email"
                    required={false}
                    pattern={{
                        value: validRegex("email"),
                        message: "Email is not valid"
                    }}
                    max={100}
                />
            </Grid>
            <Grid item container xs={12} columnSpacing={2}>
                <Grid item xs={4}>
                    <IsdAutoCompleteField
                        registerStateName='isd_code'
                        isRequired={false}
                    />
                </Grid>
                <Grid item xs={8}>
                    <RequiredTextField
                        label="Mobile"
                        required={false}
                        id="mobile"
                        max={20}
                        type="number"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <RequiredTextField
                    label="Notes"
                    id="notes"
                    required={false}
                    max={500}
                />
            </Grid>
            <FormCancelSubmitBtns handleClose={handleClose} />
        </Grid>
    )
}

export default Fields