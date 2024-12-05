import { SxProps, Theme } from "@mui/material";
import CustomBtnFilled from "./form-molecules/CustomBtnFilled";
import Grid from "@mui/material/Grid";

type Props = {
  handleClose: () => void;
  submitLabel?: string;
  sx?: SxProps<Theme>;
  handleSubmitBtnClick?: (() => Promise<void>) | (() => void);
  cancelLabel?: string;
  isSubmitDisabled?: boolean;
};

const FormCancelSubmitBtns = ({
  handleClose,
  submitLabel = "submit",
  sx,
  handleSubmitBtnClick,
  cancelLabel,
  isSubmitDisabled = false
}: Props) => {
  return (
    <Grid
      sx={{
        padding: "5px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "1rem",
        ...sx
      }}
      item
      xs={12}
    >
      <CustomBtnFilled
        label= {cancelLabel || "cancel"}
        variant="outlined"
        onClick={handleClose}
      />
      {handleSubmitBtnClick ?
        <CustomBtnFilled
          label={submitLabel}
          variant="contained"
          onClick={handleSubmitBtnClick}
        />
        : <CustomBtnFilled
          label={submitLabel}
          variant="contained"
          buttonType="submit"
          disabled={isSubmitDisabled}
        />
      }
    </Grid>
  );
};

export default FormCancelSubmitBtns;
