import { Grid, TextField } from '@mui/material'
import { useState } from 'react'
import DialogModal from '../../../atoms/dialog'
import CustomBtnFilled from '../../../atoms/form-molecules/CustomBtnFilled'
import { RequestServer } from '../../../utils/services'
import { useSnackbar } from 'notistack'
import { APIRoutes } from '../../../constants'


const BulkCaseCode = ({ isOpen, callIds, setDialog }: any) => {
    const [value, setValue] = useState('')
    const { enqueueSnackbar } = useSnackbar();
    const ids = typeof callIds === 'string' ? callIds.split(',') : []

    const handleSubmit = async () => {
        if (!callIds.length) {
            enqueueSnackbar("Please select atleast one call", {
                variant: 'error'
            })
            return
        }
        if (!value) {
            enqueueSnackbar("Please enter caseCode", {
                variant: 'error'
            })
            return
        }
        const body = {
            ids: ids,
            casecode: value
        }
        const response = await RequestServer(APIRoutes.CASECODEUPDATE, 'POST', body)
        enqueueSnackbar(response?.message, {
            variant: 'success'
        })
        setDialog({ state: false, callIds: [] })
    }



    console.log(callIds)

    return (
        <>
            <DialogModal title={'Case Code to replace'} isOpen={isOpen} handleClose={() => { setDialog({ state: false, callIds: [] }) }} >
                <Grid item container xs={11} m={"10px 16px"} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
                        <TextField
                            sx={{ width: '50%' }}
                            onChange={(e) => { setValue(e.target.value) }}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
                        <CustomBtnFilled label='submit' variant='filled' onClick={handleSubmit}>
                        </CustomBtnFilled>
                    </Grid>
                </Grid>
            </DialogModal>

        </>
    )
}

export default BulkCaseCode