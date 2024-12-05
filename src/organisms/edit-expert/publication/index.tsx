import { useState } from "react";
import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { Button } from "@mui/material";
import { addBtnStyle } from "../styles";
import Form from "./form";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";

const PublicationForms = (props: any) => {
  const [warningOpen, setWarning] = useState<any>({
    warningState: false,
    pubID: null,
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

  const pubInfo =
    defaultValues?.length !== 0
      ? defaultValues?.map((pat: any, index: any) => ({
          ...pat,
          id: `pub-${index}`,
        }))
      : null;

  const addButtonClickHandler = () => {
    const addNewField = {
      title: "",
      publication: "",
      date: null,
      description: "",
      description_url: "",
      isNewlyAdded: true,
    };

    defaultValues.push(addNewField);
    setFormDefaultValues((prevDefaultValues: any) => ({
      ...prevDefaultValues,
      publication: defaultValues,
    }));

    // disable the add more button
    setAddMoreOpen(false);
  };

  const removeClickHandler = (pubID: string, isNewlyAdded: boolean) => {
    console.log(pubID);
    setWarning({
      warningState: true,
      pubID,
      isNewlyAdded,
    });
  };

  const handleYesWarningClick = async () => {
    const deleted_pub_field = pubInfo.find(
      (pub: any) => pub.id === warningOpen.pubID
    );

    if (deleted_pub_field?.isNewlyAdded) {
      const newDefaultValues = defaultValues.filter((pub: any) => {
        if (pub?.isNewlyAdded === true) {
          return false;
        }
        return true;
      });

      setFormDefaultValues((prevDefaultValues: any) => ({
        ...prevDefaultValues,
        publication: newDefaultValues,
      }));
      setWarning({
        warningState: false,
        pubID: null,
      });

      enqueueSnackbar(edit_expert_data.pub_form.delete, {
        variant: "success",
      });

      // Add more option enabled
      setAddMoreOpen(true);

      return;
    }

    const current_pubs = pubInfo.filter((pub: any) => {
      if (pub.id === warningOpen.pubID) {
        return false;
      }

      if (pub?.isNewlyAdded) {
        return false;
      }

      return true;
    });

    const payload = {
      id: id,
      action: "PublicationInfo",
      publications:
        current_pubs.length !== 0
          ? current_pubs.map((pub: any) => ({
              title: pub?.title,
              publication: pub?.publication || null,
              date: pub?.date || null,
              description: pub?.description || null,
              description_url: pub?.description_url || null,
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
      "publication",
      edit_expert_data.pub_form.delete,
      setAddMoreOpen
    );
  };

  return (
    <>
      <WarningDialog
        open={warningOpen.warningState}
        text={edit_expert_data.pub_form.delete_warning}
        handleClose={() => setWarning({ warningState: false, pubID: null })}
        handleYesClick={handleYesWarningClick}
      />

      {pubInfo?.map((pub: any, index: any) => (
        <Form
          key={"pub-" + index}
          pubID={pub.id}
          id={id}
          defaultValues={pub}
          setFormChange={setFormChange}
          setBackdropOpen={setBackdropOpen}
          setFormDefaultValues={setFormDefaultValues}
          removeClickHandler={removeClickHandler}
          allPubInfo={pubInfo}
          isNewlyAdded={pub?.isNewlyAdded || null}
          setAddMoreOpen={setAddMoreOpen}
        />
      ))}
      <Button
        variant="text"
        disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Publication
      </Button>
    </>
  );
};

export default PublicationForms;
