import Grid from '@mui/material/Grid'

import AccordionActionsButtons from '../common/accordianAction'
import { ClientProps } from './form'
import { useEffect, useState } from 'react'
import { useHookFormContext } from '../../../../utils/hooks/useHookFormContext'
import { getClientContacts } from '../../helper'
import TextfieldAsyncSearchHook from '../../../../molecules/textfield-async-search/textfieldAsyncSearchHook'


type Props = { handleReset: () => void }

const Fields = ({ handleReset }: Props) => {
    const [filterOptions, setFilterOptions] = useState<any[]>([]);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextfieldAsyncSearchHook
                        registerStatename="client"
                        options={filterOptions}
                        searchFunction={(inputValue: string) => getClientContacts(inputValue)}
                        setOptions={(state: any) =>
                            setFilterOptions([...state])
                        }
                        label="Client"
                        multi={true}
                        isRequired={false}
                        disableCloseOnSelect={true}
                    />
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