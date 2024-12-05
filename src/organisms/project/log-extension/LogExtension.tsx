import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { projectApiDataItem } from "../../../pages/Projects/types";
import {
  getEditProjectFormDefaultValues,
  formDefaultValues,
} from "../../../organisms/edit-project/helper";
import LogExtensionHeading from "./heading";
import ProjectForm from "../../../organisms/project-form";
import PEMapped from "./PEMapped";
import DialogModal from "../../../atoms/dialog";
import { PEExperts, getPayload } from "./helper";
import { RequestServer } from "../../../utils/services";
import { APIRoutes, AppRoutes } from "../../../constants";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type LogExtensionProps = {
  isOpen: boolean;
  isWorkStream: boolean;
  handleClose: () => void;
  handleSubmitClose: () => void;
  id: number | null;
  projectDetails: projectApiDataItem | null;
  refetch: () => void;
  handleFormChange?: () => void;
};

export type FormLevelTypes = "project_details" | "PE_Mapped"

const LogExtension: React.FC<LogExtensionProps> = ({
  isOpen,
  handleClose,
  handleSubmitClose,
  id,
  projectDetails,
  refetch,
  handleFormChange,
  isWorkStream,
}) => {
  const [formDefaultValues, setFormDefaultValues] =
    useState<formDefaultValues | null>(null);
  const [formLevel, setFormLevel] = useState<FormLevelTypes>("project_details");
  const [experts, setExperts] = useState<PEExperts[] | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");

  const projectOnSubmit = (formData: formDefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    setFormDefaultValues(newFormData);
    setFormLevel("PE_Mapped")
  }

  const handleBackBtn = () => {
    setFormLevel("project_details")
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pe_expert_ids = experts?.filter((expert) => expert.checked).map((expert) => (expert.fk_expert)).join(",") || null;
    let formData = formDefaultValues;

    if (!formData) {
      return;
    }

    if (!id) {
      return;
    }

    // CREATE PROJECT
    console.log('isWorkStream',isWorkStream )
    const payload = getPayload(formData, pe_expert_ids, id,isWorkStream);


    setLoading(true);

    RequestServer(APIRoutes.projects, "POST", payload)
      .then((data) => {
        if (data.success) {
          enqueueSnackbar("Project created.", {
            variant: "success",
          });

          handleSubmitClose();
          setFormDefaultValues(null);
          if (page === "1") {
            refetch()
          } else {
            navigate(AppRoutes.PROJECTS + "/all?page=1")
          }

        } else {
          console.log({ data });
          enqueueSnackbar(data.message, { variant: "warning" });
        }
      })
      .catch((err) => {
        console.error({ err });
        enqueueSnackbar("Request failed.", { variant: "error" });
      }).finally(() => {
        setLoading(false);
      })
  }

  const newHandleClose = () => {
    handleClose();
    setFormDefaultValues(null);
  }


  useEffect(() => {
    if (isOpen) {
      setFormLevel("project_details")
      setExperts(null);
      projectDetails &&
        getEditProjectFormDefaultValues(setFormDefaultValues, projectDetails, id, 'resetDate',isWorkStream);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={newHandleClose}
      title = {isWorkStream ? " New Workstream": " Log extension of Project" }
    >
      <LogExtensionHeading formLevel={formLevel} />

      {/* Project Details Form */}
      {formLevel === "project_details" &&
        <>
          {formDefaultValues ? (
            <ProjectForm
              onSubmit={projectOnSubmit}
              defaultValues={formDefaultValues}
              handleClose={newHandleClose}
              handleFormChange={handleFormChange}
              isLogExtension
            />
          ) : (
            <CircularProgress sx={{ color: "var(--primary-color)", mt: "1rem" }} />
          )}
        </>
      }


      {/* PE_Mapped Form */}
      {formLevel === "PE_Mapped" &&
        <>{id &&
          <PEMapped
            handleClose={newHandleClose}
            handleSubmit={onFormSubmit}
            id={id}
            experts={experts}
            setExperts={setExperts}
            handleBackBtn={handleBackBtn}
          />}

        </>
      }
    </DialogModal>
  );
};

export default LogExtension;
