import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import EditExpertForm from ".";
import CloseIcon from "@mui/icons-material/Close";
import DialogModal from "../../../atoms/dialog";

const EditExpertDialog = (props: any) => {
  const {
    isOpen,
    handleClose,
    handleSubmitClose,
    id,
    setLoading,
    getUpdatedExpertValues,
    handleFormChange
  } = props;
  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Edit Expert"
    >
      <EditExpertForm
        handleClose={handleClose}
        handleSubmitClose={handleSubmitClose}
        id={id}
        setLoading={setLoading}
        getUpdatedExpertValues={getUpdatedExpertValues}
        handleFormChange={handleFormChange}
      />
    </DialogModal>
  );
};

export default EditExpertDialog;
