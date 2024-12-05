import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import DialogModal from "../../atoms/dialog";
import ProjectFilterForm from "./form";
import {
  projectAdvanceFilterDefault,
  projectAdvanceFilterTypes,
} from "./helper";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { ProjectContext } from "../../pages/Projects/helper";

type props = {
  isOpen: boolean;
  handleClose: any;
  handleSubmitClose: any;
  handleFormChange: () => void;
};

const ProjectFilterDialog = ({
  isOpen,
  handleClose,
  handleSubmitClose,
  handleFormChange
}: props) => {
  const client_id = useGetParams("client_id");
  const client_name = useGetParams("client_name")
  const [defaultValues, setDefaultValues] = useState<projectAdvanceFilterTypes | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDefaultValues((prev) => projectAdvanceFilterDefault(client_id, client_name, prev));
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const { filterFormRef } = useContext(ProjectContext);
  
  useImperativeHandle(filterFormRef, () => {
    return {
      resetForm: () =>setDefaultValues(projectAdvanceFilterDefault(client_id, client_name, null))
    };
  }, []);

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={"Advance Filters"}
    >
      {defaultValues &&
        <ProjectFilterForm
          handleClose={handleClose}
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          handleSubmitClose={handleSubmitClose}
          handleFormChange={handleFormChange}
        />
      }

    </DialogModal>
  );
};

export default ProjectFilterDialog;
