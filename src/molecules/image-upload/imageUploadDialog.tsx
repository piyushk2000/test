import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import ImageDropzone from "./imageDropzone";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import DialogModal from "../../atoms/dialog";

type imageDialogProps = {
  isOpen: boolean;
  handleClose: any;
  handleImageUpload: any;
  setBackdrop: (bool: boolean) => void;
};

const ImageUploadDialog = ({
  isOpen,
  handleClose,
  handleImageUpload,
  setBackdrop,
}: imageDialogProps) => {
  const [image, setImage] = useState<any>(null);

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      titleSx={{
        backgroundColor: "#1B1F23",
        color: "#ffffff"
      }}
      contentSx={{
        backgroundColor: "#1B1F23",
        color: "#ffffff"
      }}
      title={"Change Profile Picture"}
    >

      <Grid container justifyContent={"flex-end"} columnSpacing={2}>
        {/* DropZone */}
        <Grid item xs={12}>
          <ImageDropzone setImage={setImage} borderColor="white" />
        </Grid>

        {/* Action Buttons */}
        <Grid item>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={handleClose}
            styles={{ color: "white", borderColor: "white" }}
          />
        </Grid>
        <Grid item>
          <CustomBtnFilled
            label="ok"
            variant="contained"
            buttonType="button"
            onClick={() =>
              image && handleImageUpload(image, setBackdrop, handleClose)
            }
          />
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default ImageUploadDialog;
