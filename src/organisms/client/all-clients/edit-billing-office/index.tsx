import { useSnackbar } from 'notistack';
import DialogModal from '../../../../atoms/dialog'
import BillingOfficeForm from '../add-billing-office/form';
import { addOfficedefaultValues } from '../add-billing-office/helper';
import { RequestServer } from '../../../../utils/services';
import { APIRoutes } from '../../../../constants';
import { removeWhiteSpacesFromForm } from '../../../../utils/utils';

type Props = {
    isOpen: boolean;
    clientName: string;
    client_id: string | null;
    handleClose(): void;
    setFormChange(): void;
    handleSubmitClose: () => void;
    setBackdrop: (b: boolean) => void;
    defaultValues: addOfficedefaultValues | null;
    refetch: (() => Promise<void>) | null;
    office_id: string | null;
}

const EditBillingOffice = ({ isOpen, clientName, handleClose, setFormChange, defaultValues, client_id, office_id, setBackdrop, refetch, handleSubmitClose }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (formData: addOfficedefaultValues) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        console.log(newFormData);

        if (!client_id || !office_id) {
            const msg = !client_id ? "client ID not found" : "Office ID not found"
            enqueueSnackbar(msg, {
                variant: "warning"
            })
            return;
        }

        const { name, entityName, address, city, country, GSTIN } = newFormData;

        const payload = {
            id: office_id,
            action: 'UpdateClientOffice',
            name: name || null,
            entityName: entityName || null,
            address: address || null,
            city: city || null,
            country: country ? country.label : null,
            GSTIN: GSTIN || null,
            client_id
        }

        try {
            setBackdrop(true);

            const response = await RequestServer(
                APIRoutes.addClientOffice,
                "PATCH",
                payload
            );

            if (response.success) {
                enqueueSnackbar("Office address updated", {
                    variant: "success",
                });
                refetch && (await refetch());
                handleSubmitClose();
            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString(), { variant: "warning" });
            }
        } catch (err) {
            console.error({ err });
            enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
            setBackdrop(false);
        }
    };

    return (
        <DialogModal
            title={`${clientName}: Edit Billing Office`}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            {defaultValues &&
                <BillingOfficeForm
                    handleClose={handleClose}
                    setFormChange={setFormChange}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            }
        </DialogModal>
    )
}

export default EditBillingOffice