import { useState, Fragment } from "react";
import ExperienceForm from "./experienceForm";
import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { Box, Button, Typography } from "@mui/material";
import { addBtnStyle, multipleFieldContainerStyle } from "../styles";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import EditRemoveButtons from "../common/EditRemoveButtons";
import DialogModal from "../../../atoms/dialog";
import { isExpert } from "../../../utils/role";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";

const ExperienceForms = (props: any) => {
  const [expWarningOpen, setExpWarning] = useState<any>({
    warningState: false,
    expID: "",
    isNewlyAdded: false,
  });
  const [isAddMoreOpen, setAddMoreOpen] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    relevant_company,
  } = props;

  const work_experiences = defaultValues.sort((a: any, b: any) => new Date(a.start_date as string).getTime() - new Date(b.start_date as string).getTime());
  const [selectedExperiance, setSelectedExperiance] = useState<any>(null);

  const addButtonClickHandler = () => {
    const addNewField = {
      company: "",
      location: "",
      end_date: null,
      start_date: null,
      job_description: "",
      designation: "",
      currently_works_here: false,
      divison: "",
      isNewlyAdded: true,
      id: `experience - ${defaultValues.length}`,
    };

    setSelectedExperiance(addNewField);
    // disable the add more button
    setAddMoreOpen(false);
  };

  const removeClickHandler = (expID: string, isNewlyAdded: boolean) => {
    setExpWarning({
      warningState: true,
      expID,
      isNewlyAdded,
    });
  };

  const handleYesWarningClick = async () => {
    const current_work_experience = work_experiences.find(
      (exp: any) => exp.id === expWarningOpen.expID
    );

    // remove newly added
    if (!current_work_experience) {
      // Add more option enabled
      setAddMoreOpen(true);
      // closing the add experience dialog box
      setSelectedExperiance(null);

      setExpWarning({
        warningState: false,
        eduID: null,
        isNewlyAdded: false,
      });
      return;
    }

    // remove the experience that is store in the Database
    const payload: any = {
      action: "CompanyInfo",
      id: id,
      companies: [
        {
          id: current_work_experience.id,
          action: "Delete",
          start_date: current_work_experience.start_date,
          end_date: current_work_experience?.end_date || null,
          job_description: current_work_experience?.job_description || null,
          designation: current_work_experience.designation,
          company: current_work_experience.company,
          fk_company: current_work_experience.fk_company,
          currently_works_here: current_work_experience.currently_works_here,
        },
      ],
    };

    if(current_work_experience.division) {
      payload.companies[0].division = current_work_experience.division;
    }

    if (current_work_experience.location) {
      payload.companies[0].location = current_work_experience.location
    }

    // If Expert is logged in, we are sending current_snapshot
    // in which the latest state of work experience is shown
    if (isExpert()) {
      const latest_work_experience = work_experiences.filter(
        (exp: any) => exp.id !== expWarningOpen.expID
      ).map((exp: any) => {
        delete exp.is_exp_allowed;
        return exp
      })

      payload.current_snapshot = latest_work_experience;
    }

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "experience",
      edit_expert_data.exp_form.delete
    );
  };

  return (
    <>
      <WarningDialog
        open={expWarningOpen.warningState}
        text={expWarningOpen.isNewlyAdded ? undefined : edit_expert_data.exp_form.delete_warning}
        handleClose={() => setExpWarning({ warningState: false, expID: "" })}
        handleYesClick={handleYesWarningClick}
      />

      {work_experiences?.map((experience: any, index: number) => (
        <Fragment key={String(experience.id) + String(index)}>
          <Box sx={{ ...multipleFieldContainerStyle, padding: "1rem" }}>
            <div className="experience-detail">
              <div id="experiance-1">
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {experience?.company || ""}{experience?.location ? `, ${experience?.location}` : ""}
                </Typography>
                {(experience?.designation || experience?.division) &&
                  < Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                    {[experience?.designation,experience?.division].filter(f => !!f).join(" - ")}
                  </Typography>
                }
                {experience.start_date && (
                  <Typography sx={{ fontSize: "13px" }}>
                    {LocalDayjs(experience.start_date).format("MMM YYYY")}
                    {" - "}
                    {experience.currently_works_here
                      ? "Present"
                      : LocalDayjs(experience.end_date).format("MMM YYYY")}
                  </Typography>
                )}
                <RichTextDisplayer text={experience?.job_description} />
              </div>
            </div>
            {(isExpert() && !experience?.is_exp_allowed) ? null :
              <EditRemoveButtons
                handleRemove={() => {
                  removeClickHandler(experience.id, false);
                }}
                handleEdit={() => {
                  setSelectedExperiance(experience);
                }}
              />
            }
          </Box>
        </Fragment>
      )) || <p>Please Add Your Work Experience Details</p>}

      {selectedExperiance ? (
        <DialogModal
          title={"Experience Form"}
          isOpen={!!selectedExperiance}
          handleClose={() => {
            setSelectedExperiance(null);
            // disable the add more button
            setAddMoreOpen(true);
          }}
        >
          <ExperienceForm
            key={selectedExperiance.id}
            defaultValues={selectedExperiance}
            id={id}
            setFormChange={setFormChange}
            setFormDefaultValues={setFormDefaultValues}
            setBackdropOpen={setBackdropOpen}
            removeClickHandler={removeClickHandler}
            isNewlyAdded={selectedExperiance?.isNewlyAdded || false}
            relevant_company={relevant_company}
            all_work_experiences={work_experiences}
          />
        </DialogModal>
      ) : null}

      <Button
        variant="text"
        disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Experience
      </Button>
    </>
  );
};

export default ExperienceForms;
