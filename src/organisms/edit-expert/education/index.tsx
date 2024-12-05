import { useState, Fragment } from "react";

import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import EducationForm from "./education-form";
import { Box, Button, Typography } from "@mui/material";
import { addBtnStyle, multipleFieldContainerStyle } from "../styles";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import EditRemoveButtons from "../common/EditRemoveButtons";
import DialogModal from "../../../atoms/dialog";
import { startAndEndYear } from "../../../molecules/expert-profile-sections/education-section/EducationSection";

const EducationForms = (props: any) => {
  const [eduWarningOpen, setEduWarning] = useState<any>({
    warningState: false,
    eduID: "",
    isNewlyAdded: false,
  });
  const [isAddMoreOpen, setAddMoreOpen] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const {
    id,
    defaultValues,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;
  const [selectedEducation, setSelectedEducation] = useState<any>(null);


  const educationInfo =
    defaultValues?.length !== 0
      ? defaultValues?.map((edu: any, index: any) => ({
        ...edu,
        id: `education-${index}`,
      }))
      : null;

  const addButtonClickHandler = () => {
    const addNewField = {
      course: "",
      end_year: null,
      start_year: null,
      institution: "",
      isNewlyAdded: true,
    };

    setSelectedEducation(addNewField)
    // disable the add more button
    setAddMoreOpen(false);
  };

  console.log("selected education", selectedEducation)
  const removeClickHandler = (eduID: string, isNewlyAdded: boolean) => {
    setEduWarning({
      warningState: true,
      eduID,
      isNewlyAdded,
    });
  };

  const handleYesWarningClick = async () => {
    const deleted_education_field = educationInfo.find(
      (edu: any) => edu.id === eduWarningOpen.eduID
    );

    // The Deleted Education Field is Newly Created
    if (!deleted_education_field) {
      // Add more option enabled
      setAddMoreOpen(true);
      // closing the add education dialog box
      setSelectedEducation(null);
      setEduWarning({
        warningState: false,
        eduID: null,
        isNewlyAdded: false,
      });
      return;
    }

    // Deleting the one that is stored in the database
    const current_education = educationInfo.filter((edu: any) => {
      if (edu.id === eduWarningOpen.eduID) {
        return false;
      }

      if (edu?.isNewlyAdded) {
        return false;
      }

      return true;
    });

    const payload = {
      action: "EducationInfo",
      id: id,
      education:
        current_education.length !== 0
          ? current_education.map((edu: any) => ({
            institution: edu?.institution || null,
            course: edu?.course || null,
            start_year: edu?.start_year
              ? LocalDayjs(edu.start_year).format("YYYY")
              : null,
            end_year: edu?.end_year
              ? LocalDayjs(edu.end_year).format("YYYY")
              : null,
          }))
          : [],
    };

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "education",
      edit_expert_data.edu_form.delete,
      setAddMoreOpen
    );
  };

  return (
    <>
      <WarningDialog
        open={eduWarningOpen.warningState}
        text={eduWarningOpen.isNewlyAdded ? undefined : edit_expert_data.edu_form.delete_warning}
        handleClose={() => setEduWarning({ warningState: false, eduID: "" })}
        handleYesClick={handleYesWarningClick}
      />

      {educationInfo?.map((education: any, index: any) => (
        <Fragment key={String(education.course) + String(index)}>
          <Box sx={{ ...multipleFieldContainerStyle, padding: "1rem" }}>
            <div className="experience-detail">
              <div id="experiance-1">
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {education?.institution}
                </Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                  {education?.course}
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {startAndEndYear(education.start_year, education.end_year)}
                </Typography>
              </div>
            </div>
            <EditRemoveButtons
              handleRemove={() => {
                removeClickHandler(education.id, false);
              }}
              handleEdit={() => {
                setSelectedEducation(education)
              }}
            />
          </Box>
        </Fragment>
      ))}
      {selectedEducation ? (
        <DialogModal
          title={"Add Education"}
          isOpen={!!selectedEducation}
          handleClose={() => {
            setSelectedEducation(null);
            // disable the add more button
            setAddMoreOpen(true);
          }}
        >
          <EducationForm
            eduID={selectedEducation.id}
            id={id}
            defaultValues={selectedEducation}
            setFormChange={setFormChange}
            setBackdropOpen={setBackdropOpen}
            setFormDefaultValues={setFormDefaultValues}
            removeClickHandler={removeClickHandler}
            allEducationInfo={educationInfo}
            isNewlyAdded={selectedEducation?.isNewlyAdded || null}
            setAddMoreOpen={setAddMoreOpen}
          />
        </DialogModal>
      ) : null}
      <Button
        variant="text"
        disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Education
      </Button>
    </>
  );
};

export default EducationForms;
