
import { useEffect, useRef, useState } from 'react';
import { useMyCalenderContext } from '../../../../pages/my-calendar/context';
import ClientFormFilter from './form'
import { labelValueType } from '../../../client/all-clients/types';
import { getClientValues } from '../helper';

const ClientFilter = () => {
    const [clientValues, setClientValues] = useState<labelValueType[] | null>(null);
    const { filters } = useMyCalenderContext();

    useEffect(() => {
        getClientValues(filters.sidebarFilters.client, setClientValues);
    }, []);

    return (
        <>
            {
                clientValues &&
                <ClientFormFilter clientValues={clientValues} />
            }
        </>
    )
}

export default ClientFilter