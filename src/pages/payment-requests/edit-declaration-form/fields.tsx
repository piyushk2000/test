import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton } from "@mui/material";
import styles from "../../../organisms/project-form/add-project.module.scss";
import CloseIcon from "@mui/icons-material/Close";


type Props = {
    handleClose(): void;
}

const EditDeclarationFields = ({ handleClose }: Props) => {
    const { registerState, watch, setValue } = useHookFormContext();

    const target_date_value = watch("target_date");
    const fk_group = watch("fk_group");

    const handleCloseBtnClick = () => {
        setValue("target_date", null);
    };


    return (
        <Grid container spacing={3} mt={"5px"}>
            <Grid
                className={`${styles.inputRow} ${styles.targetDate}`}
                item
                xs={12}
                sm={6}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <HookDatePicker
                        {...registerState("date")}
                        datePickerProps={{
                            className: "date-picker",
                            label: "Declaration Date",
                            format: "DD/MM/YYYY",
                            slotProps: { textField: { size: "small", fullWidth: true } },
                        }}
                    />
                    {target_date_value && (
                        <IconButton
                            className={styles.closeBtn}
                            onClick={handleCloseBtnClick}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </LocalizationProvider>
            </Grid>


            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />

        </Grid>
    );
};

export default EditDeclarationFields;
