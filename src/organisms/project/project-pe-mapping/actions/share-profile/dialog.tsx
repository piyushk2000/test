import React from 'react'
import DialogModal from '../../../../../atoms/dialog'
import ShareProfileForm from '.';
import { formatExpertsData } from './helper';
import { useFetch } from '../../../../../utils/hooks/useFetch';
import { formattedExpertsData } from './type';
import { APIRoutes } from '../../../../../constants';
import { MetaType, setDialogState } from '../../type';
import { getCurrencyValue } from '../../../../../utils/currencies';

type Props = {
    handleClose: () => void;
    isOpen: boolean;
    handleSubmitClose: () => void;
    pe_id: number | null;
    expert_id: number | null;
    company: string | null;
    location: string | null;
    designation: string | null;
    is_agenda_respond: boolean;
    handleChange: () => void;
    setPeDialog: setDialogState;
    meta: MetaType;
    group: number | string
}

const ShareProfileDialog = ({ setPeDialog, handleClose, handleSubmitClose, isOpen, pe_id, expert_id, company, designation, is_agenda_respond, handleChange, location, meta,group }: Props) => {
    const { formattedData: expertsData } = useFetch<any, formattedExpertsData>(APIRoutes.getExpert + "?id=" + expert_id + "&show_columns=meta,name,picture,price_per_hour,price_per_hour_currency", {
        formatter: formatExpertsData,
        variables: [expert_id]
    });

    const defaultValues = {
        snippets: meta?.snippet ? JSON.stringify({
            heading: meta.snippet_title,
            description: meta.snippet,
        }) : "",
        ...(meta?.cost_price && { cost_price: meta.cost_price }),
        selling_price: meta?.selling_price || expertsData?.price_per_hour || "",
        currency: meta?.selling_price_currency ? getCurrencyValue(meta.selling_price_currency)
            : expertsData?.price_per_hour_currency ? getCurrencyValue(expertsData.price_per_hour_currency)
                : null,
        multiplier: meta?.time_multiplier ? { label: meta?.time_multiplier.toString(), value: meta?.time_multiplier } : { label: "1.0", value: 1.0 },
        share_agenda: "",
    };

    return (
        <DialogModal
            title="Share Profile with client"
            isOpen={isOpen}
            handleClose={handleClose}
            contentSx={{
                height: "100vh"
            }}
        >
            {expertsData &&
                <ShareProfileForm
                    handleClose={handleClose}
                    handleSubmitClose={handleSubmitClose}
                    pe_id={pe_id}
                    expert_id={expert_id}
                    company={company}
                    designation={designation}
                    handleChange={handleChange}
                    is_agenda_respond={is_agenda_respond}
                    expertsData={expertsData}
                    defaultValues={defaultValues}
                    location={location}
                    setPeDialog={setPeDialog}
                    group={group}
                />
            }

        </DialogModal>
    )
}

export default ShareProfileDialog