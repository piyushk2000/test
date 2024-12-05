import { Grid } from '@mui/material';
import DialogModal from '../../../atoms/dialog'
import FormCancelSubmitBtns from '../../../atoms/formCancelSubmitBtns';
import { FileUpload } from '../../../molecules/input-components/FileUpload';
import { useBankContext } from '../context';

type Props = {
    handleClose(): void;
    isOpen: boolean;
    handleSubmitClose(): void;
}

const AddMSMECerticate = ({ handleClose, isOpen, handleSubmitClose }: Props) => {
    const { setController, setLoading, setMsmeUrl: setUrl } = useBankContext();
    return (
        <DialogModal
            isOpen={isOpen}
            title={"Upload MSME Certificate"}
            handleClose={handleClose}
        >
            <Grid container mt={"20px"}>
                <FileUpload
                    setController={setController}
                    setLoading={setLoading}
                    setUrl={setUrl}
                />
                <FormCancelSubmitBtns
                    handleClose={handleClose}
                    handleSubmitBtnClick={handleSubmitClose}
                />

            </Grid>

        </DialogModal>
    )
}

export default AddMSMECerticate