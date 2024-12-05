import CircularProgress from "@mui/material/CircularProgress";
import EditProjectForm from ".";
import DialogModal from "../../atoms/dialog";
import { useEffect, useState } from "react";
import { projectApiDataItem } from "../../pages/Projects/types";
import { formDefaultValues, getEditProjectFormDefaultValues } from "./helper";

type props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmitClose: () => void;
  id: string | null;
  projectDetails: projectApiDataItem | null;
  handleFormChange?: () => void;
};

const EditProjectDialog = ({
  isOpen,
  handleClose,
  handleSubmitClose,
  id,
  projectDetails,
  handleFormChange,
}: props) => {
  const [formDefaultValues, setFormDefaultValues] =
    useState<formDefaultValues | null>(null);

  useEffect(() => {
    if (isOpen && projectDetails) {
      getEditProjectFormDefaultValues(setFormDefaultValues, projectDetails);
    } else {
      setFormDefaultValues(null);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <DialogModal isOpen={isOpen} handleClose={handleClose} title="Edit Project">
      {formDefaultValues ? (
        <EditProjectForm
          defaultValues={formDefaultValues}
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
          setFormDefaultValues={setFormDefaultValues}
          id={id}
          handleFormChange={handleFormChange}
        />
      ) : (
        <CircularProgress sx={{ color: "var(--primary-color)", mt: "1rem" }} />
      )}
    </DialogModal>
  );
};

export default EditProjectDialog;
