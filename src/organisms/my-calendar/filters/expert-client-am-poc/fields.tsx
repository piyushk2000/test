import Grid from '@mui/material/Grid'

import BasicAutocomplete from '../../../../molecules/autocompletes/basic-autocomplete'
import AccordionActionsButtons from '../common/accordianAction'
import { ClientProps } from './form'
import { isClient } from '../../../../utils/role'

type Props = ClientProps & { handleReset: () => void }

const Fields = ({ formOptions, handleReset }: Props) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {isClient() ?
                        <BasicAutocomplete
                            label='Account Manager'
                            registerName='am'
                            options={formOptions.client_filter_am || []}
                            multiple
                        /> :
                        <BasicAutocomplete
                            label='POCs'
                            registerName='poc'
                            options={formOptions.expert_filter_poc || []}
                            multiple
                        />
                    }

                </Grid>
            </Grid>
            <AccordionActionsButtons
                clearAllAction={handleReset}
                selectAllAction={() => { }}
                checkedLength={1}
            />
        </>
    )
}

export default Fields