import React, { Dispatch, SetStateAction } from 'react'
import DialogModal from '../../../atoms/dialog';
import CustomBtnFilled from '../../../atoms/form-molecules/CustomBtnFilled';
import { Box } from '@mui/material';
import { inputRowCommonStyles, submitbtnRowCommonStyles } from "../../../common/formStyles"
import { RequestServer } from '../../../utils/services';
import { APIRoutes } from '../../../constants';
import { useSnackbar } from 'notistack';

type Props = {
    handleClose: () => void;
    siblingProjects: string[] | null | undefined;
    project_id: number | null;
    isOpen: boolean;
    refetch: () => void;
    setBackdrop: Dispatch<SetStateAction<boolean>>;
}

const DeLinkProject = ({ handleClose, siblingProjects, project_id, isOpen, refetch, setBackdrop }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async () => {
        const payload = {
            id: project_id,
            action: "Delink"
        }


        try {
            setBackdrop(true);
            const response = await RequestServer(
                APIRoutes.projectDeLink,
                "PATCH",
                payload
            );
            if (response.success) {
                enqueueSnackbar("Project delinked", {
                    variant: "success",
                });
                handleClose();

                /* fetching the Data of Projects */
                refetch();
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
    }

    return (
        <DialogModal
            isOpen={isOpen}
            title="Delink Project"
            handleClose={handleClose}
        >
            <Box sx={{
                ...inputRowCommonStyles, "& p": {
                    fontSize: "14px",
                    mt: "10px"
                },
                "& .bold": {
                    fontWeight: "600"
                }
            }}>
                <p>This project is linked with {siblingProjects?.length} other projects. This action will not affect interlinking of those {siblingProjects?.length} projects amongst them.</p>
                <p className='bold'>Are you sure you want to delink?</p>
            </Box>

            <Box sx={{ ...inputRowCommonStyles, ...submitbtnRowCommonStyles }}>
                <CustomBtnFilled
                    label="No"
                    variant="outlined"
                    onClick={handleClose}
                />
                <CustomBtnFilled
                    label="yes"
                    variant="contained"
                    onClick={onSubmit}
                />
            </Box>
        </DialogModal>
    )
}

export default DeLinkProject