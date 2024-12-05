import { useState } from "react";
import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { Button } from "@mui/material";
import { addBtnStyle } from "../styles";
import Form from "./form";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";

const AwardsForms = (props: any) => {
  const [awardsWarningOpen, setAwardsWarning] = useState<any>({
    warningState: false,
    awardID: null,
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

  const awardsInfo =
    defaultValues?.length !== 0
      ? defaultValues?.map((award: any, index: any) => ({
          ...award,
          id: `awards-${index}`,
        }))
      : null;

  const addButtonClickHandler = () => {
    const addNewField = {
      title: "",
      date: null,
      description: "",
      isNewlyAdded: true,
    };

    defaultValues.push(addNewField);
    setFormDefaultValues((prevDefaultValues: any) => ({
      ...prevDefaultValues,
      awards: defaultValues,
    }));

    // disable the add more button
    setAddMoreOpen(false);
  };

  const removeClickHandler = (awardID: string, isNewlyAdded: boolean) => {
    setAwardsWarning({
      warningState: true,
      awardID,
      isNewlyAdded,
    });
  };

  const handleYesWarningClick = async () => {
    const deleted_award_field = awardsInfo.find(
      (award: any) => award.id === awardsWarningOpen.awardID
    );

    // Deleting Newly Added Field
    if (deleted_award_field?.isNewlyAdded) {
      const newDefaultValues = defaultValues.filter((award: any) => {
        if (award?.isNewlyAdded === true) {
          return false;
        }
        return true;
      });

      setFormDefaultValues((prevDefaultValues: any) => ({
        ...prevDefaultValues,
        awards: newDefaultValues,
      }));
      setAwardsWarning({
        warningState: false,
        awardID: null,
      });

      // Add more option enabled
      setAddMoreOpen(true);

      enqueueSnackbar(edit_expert_data.award_form.delete, {
        variant: "success",
      });

      return;
    }

    // Deleting the one that is stored in the Database
    const current_award = awardsInfo.filter((award: any) => {
      if (award.id === awardsWarningOpen.awardID) {
        return false;
      }

      if (award?.isNewlyAdded) {
        return false;
      }

      return true;
    });

    const payload = {
      id: id,
      action: "AwardsInfo",
      awards:
        current_award.length !== 0
          ? current_award.map((award: any) => ({
              title: award?.title,
              date: award?.date ? LocalDayjs(award.date).format("YYYY-MM") : null,
              description: award?.description || null,
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
      "awards",
      edit_expert_data.award_form.delete,
      setAddMoreOpen
    );
  };

  return (
    <>
      <WarningDialog
        open={awardsWarningOpen.warningState}
        text={edit_expert_data.award_form.delete_warning}
        handleClose={() =>
          setAwardsWarning({ warningState: false, awardID: null })
        }
        handleYesClick={handleYesWarningClick}
      />

      {awardsInfo?.map((awards: any, index: any) => (
        <Form
          key={"awards-" + index}
          awardID={awards.id}
          id={id}
          defaultValues={awards}
          setFormChange={setFormChange}
          setBackdropOpen={setBackdropOpen}
          setFormDefaultValues={setFormDefaultValues}
          removeClickHandler={removeClickHandler}
          allAwardsInfo={awardsInfo}
          isNewlyAdded={awards?.isNewlyAdded || null}
          setAddMoreOpen={setAddMoreOpen}
        />
      ))}
      <Button
        variant="text"
        disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Award / Recognition
      </Button>
    </>
  );
};

export default AwardsForms;
