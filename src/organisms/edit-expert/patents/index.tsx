import { useState } from "react";
import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { Button } from "@mui/material";
import { addBtnStyle } from "../styles";
import Form from "./form";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";

const PatentsForms = (props: any) => {
  const [warningOpen, setWarning] = useState<any>({
    warningState: false,
    patID: null,
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

  const patInfo =
    defaultValues?.length !== 0
      ? defaultValues?.map((pat: any, index: any) => ({
          ...pat,
          id: `pat-${index}`,
        }))
      : null;

  const addButtonClickHandler = () => {
    const addNewField = {
      title: "",
      number: "",
      date: null,
      description: "",
      patent_url: "",
      isNewlyAdded: true,
    };

    defaultValues.push(addNewField);
    setFormDefaultValues((prevDefaultValues: any) => ({
      ...prevDefaultValues,
      patents: defaultValues,
    }));

    // disable the add more button
    setAddMoreOpen(false);
  };

  const removeClickHandler = (patID: string, isNewlyAdded: boolean) => {
    console.log(patID);
    setWarning({
      warningState: true,
      patID,
      isNewlyAdded,
    });
  };

  const handleYesWarningClick = async () => {
    const deleted_patent_field = patInfo.find(
      (pat: any) => pat.id === warningOpen.patID
    );

    if (deleted_patent_field?.isNewlyAdded) {
      const newDefaultValues = defaultValues.filter((pat: any) => {
        if (pat?.isNewlyAdded === true) {
          return false;
        }
        return true;
      });

      setFormDefaultValues((prevDefaultValues: any) => ({
        ...prevDefaultValues,
        patents: newDefaultValues,
      }));
      setWarning({
        warningState: false,
        patID: null,
      });

      enqueueSnackbar(edit_expert_data.pat_form.delete, {
        variant: "success",
      });

      // Add more option enabled
      setAddMoreOpen(true);

      return;
    }

    const current_patents = patInfo.filter((pat: any) => {
      if (pat.id === warningOpen.patID) {
        return false;
      }

      if (pat?.isNewlyAdded) {
        return false;
      }

      return true;
    });

    const payload = {
      id: id,
      action: "PatentInfo",
      patents:
        current_patents.length !== 0
          ? current_patents.map((pat: any) => ({
              title: pat.title,
              number: pat.number,
              date: pat?.date || null,
              description: pat?.description || null,
              patent_url: pat?.patent_url || null,
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
      "patents",
      edit_expert_data.pat_form.delete,
      setAddMoreOpen
    );
  };

  return (
    <>
      <WarningDialog
        open={warningOpen.warningState}
        text={edit_expert_data.pat_form.delete_warning}
        handleClose={() => setWarning({ warningState: false, patID: null })}
        handleYesClick={handleYesWarningClick}
      />

      {patInfo?.map((pat: any, index: any) => (
        <Form
          key={"pat-" + index}
          patID={pat.id}
          id={id}
          defaultValues={pat}
          setFormChange={setFormChange}
          setBackdropOpen={setBackdropOpen}
          setFormDefaultValues={setFormDefaultValues}
          removeClickHandler={removeClickHandler}
          allPatInfo={patInfo}
          isNewlyAdded={pat?.isNewlyAdded || null}
          setAddMoreOpen={setAddMoreOpen}
        />
      ))}
      <Button
        variant="text"
        disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Patent
      </Button>
    </>
  );
};

export default PatentsForms;
