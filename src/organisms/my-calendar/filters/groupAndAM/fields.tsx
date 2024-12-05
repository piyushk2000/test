import Grid from '@mui/material/Grid'
import BasicAutocomplete from '../../../../molecules/autocompletes/basic-autocomplete'
import AccordionActionsButtons from '../common/accordianAction'
import { Props } from './form'
import { useMyCalenderFilterContext } from '../filterContext'
import { useEffect } from 'react'
import { useHookFormContext } from '../../../../utils/hooks/useHookFormContext'
import { getAMs } from '../helper'
import { isAdmin } from '../../../../utils/role'

type fieldProps = Props & { handleReset(): void };

const Fields = ({ formOptions, handleReset }: fieldProps) => {
    const { watch, setValue } = useHookFormContext();

    const { setFormOptions } = useMyCalenderFilterContext();

    const group = watch("group");

    const setAMs = async (fk_groups: string) => {
        console.log("logged");
        const ams = await getAMs(fk_groups);
        setFormOptions((prev) => ({ ...prev, filtered_am: ams }));
    }

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === "change" && name === "group") {
                setValue("am", []);
                if (value.group.length) {
                    const fk_groups = value.group.map((g: any) => g.value).join(",");
                    setAMs(fk_groups);
                } else {
                    setFormOptions((prev) => ({ ...prev, filtered_am: prev.am }));
                }
            }
        });

        return () => subscription.unsubscribe();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);



    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BasicAutocomplete
                        label='Team'
                        registerName='group'
                        options={formOptions?.group || []}
                        multiple
                    />
                </Grid>

                {(isAdmin() ? group.length > 0 ? true : false : true) &&
                    <Grid item xs={12}>
                        <BasicAutocomplete
                            label='Account Manager'
                            registerName='am'
                            options={formOptions?.filtered_am || []}
                            multiple
                        />
                    </Grid>
                }
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