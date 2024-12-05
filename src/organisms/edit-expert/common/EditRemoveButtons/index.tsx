import { Box } from "@mui/material";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import DeleteIcon from "../../../../assets/images/client/delete_client.png";
import EditIcon from "../../../../assets/images/expert/edit_icon_white.png";
type Props = {
  handleRemove: () => void;
  handleEdit: () => void;
};

const EditRemoveButtons = ({
  handleRemove,
  handleEdit,
}: Props) => {
  return (
    <Box
      sx={{
        mt: "12px",
        display: "flex",
        justifyContent: "flex-start",
        gap: "1rem",
      }}
    >
      <CustomBtnFilled
        label="Remove"
        variant="outlined"
        startIcon={
          <img src={DeleteIcon} alt="Delete Icon" style={{ width: "16px", height: "auto" }} />
        }
        onClick={handleRemove}
      />
      <CustomBtnFilled
        label="Edit"
        variant="contained"
        startIcon={
          <img src={EditIcon} alt="Edit Icon" style={{ width: "16px", height: "auto" }} />
        }
        onClick={handleEdit}
      />
    </Box>
  );
};

export default EditRemoveButtons;
