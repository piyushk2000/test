import React from 'react'
import ViewInvoicePage from './view-invoice-page'
import { useGetParams } from '../../utils/hooks/useGetParams'
import NoResultFoundFilters from '../../atoms/noResultsFilters';

const DocumentViewPage = () => {

    const type = useGetParams("type");

    return (
        <>
            {type === "Invoice"
                ?
                <ViewInvoicePage />
                : <NoResultFoundFilters
                    text='No Document Found'
                />
            }
        </>

    )
}

export default DocumentViewPage