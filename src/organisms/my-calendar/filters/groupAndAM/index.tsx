import { useMyCalenderFilterContext } from '../filterContext';
import GroupAndAMFormFilter from './form'

const GroupAndAMFilter = () => {
    const { formOptions } = useMyCalenderFilterContext();

    return (
        <>
            {(formOptions.group.length > 0 && formOptions.am.length > 0) &&
                <GroupAndAMFormFilter
                    formOptions={formOptions}
                />}
        </>
    )
}

export default GroupAndAMFilter