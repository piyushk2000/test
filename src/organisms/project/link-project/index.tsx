import React from 'react'
import DialogModal from '../../../atoms/dialog'
import { projectApiDataItem } from '../../../pages/Projects/types';
import LinkProjectForm from './form';
import { defaultValues, formOptions } from './types';
import { CircularProgress } from '@mui/material';
import { getFormOptions } from './helper';
import { useSnackbar } from 'notistack';
import { RequestServer } from '../../../utils/services';
import { APIRoutes } from '../../../constants';
import { useFullPageLoading } from '../../../atoms/full-page-loading/loadingContext';
import { removeWhiteSpacesFromForm } from '../../../utils/utils';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    handleSubmitClose: () => void;
    project_id: number | null;
    projectDetails: projectApiDataItem | null;
    handleFormChange: () => void;
    refetch: (id: string) => void;
}

const LinkProject = ({ isOpen, handleClose, handleSubmitClose, project_id, projectDetails, handleFormChange, refetch }: Props) => {
    const [formOptions, setFormOptions] = React.useState<formOptions>({
        linkProject: [],
        loading: false,
    });
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const onSubmit = async (formData: defaultValues) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        console.log(newFormData);

        if (!project_id) return;

        if (!newFormData.linkProject?.value) return;

        const payload = {
            id: project_id,
            siblingProject: newFormData.linkProject.value,
            action: "LinkProject"
        }

        setLoading(true);
        try {
            const response = await RequestServer(
                APIRoutes.projectLink,
                "PATCH",
                payload
            );
            if (response.success) {
                enqueueSnackbar("Project linked", {
                    variant: "success",
                });
                handleSubmitClose();

                /* fetching the Data of Projects */
                refetch(newFormData.linkProject.value);
            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString(), { variant: "warning" });
            }
        } catch (err) {
            console.error({ err });
            enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    const defaultValues: defaultValues = {
        linkProject: null
    }

    React.useEffect(() => {
        if (isOpen) {
            getFormOptions(setFormOptions, projectDetails);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Link Project"}
        >
            {formOptions.loading ? <CircularProgress sx={{ color: "var(--primary-color)", mt: "10px" }} /> :
                <>
                    {
                        formOptions.linkProject.length > 0 ?
                            <LinkProjectForm
                                onSubmit={onSubmit}
                                defaultValues={defaultValues}
                                handleClose={handleClose}
                                handleFormChange={handleFormChange}
                                formOptions={formOptions}
                            /> :
                            <h3 style={{ margin: "10px" }}>No Projects to Link</h3>
                    }
                </>}

        </DialogModal>
    )
}

export default LinkProject