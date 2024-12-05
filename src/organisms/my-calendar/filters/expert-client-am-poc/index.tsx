
import { useMyCalenderFilterContext } from '../filterContext';
import FormFilter from './form'

const ExpertClientAMPOC = () => {
    const { formOptions } = useMyCalenderFilterContext();
    return (
        <>
            {(formOptions.client_filter_am.length > 0) &&
                <FormFilter
                    formOptions={formOptions}
                />
            }
        </>
    )
}

export default ExpertClientAMPOC