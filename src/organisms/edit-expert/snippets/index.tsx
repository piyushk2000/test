import { useState } from "react";
import WarningDialog from "../../../molecules/form-close-warning";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { Button } from "@mui/material";
import { addBtnStyle } from "../styles";
import Form from "./form";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import DialogModal from "../../../atoms/dialog";
import DisplaySnippet from "./displaySnippet";

type Snippet = {
  heading: string;
  description: string;
  id: string;
}

const SnippetsForms = ({
  id,
  defaultValues,
  setFormChange,
  setFormDefaultValues,
  setBackdropOpen,
}: any) => {
  const snipInfo: Snippet[] =
    defaultValues?.length !== 0
      ? defaultValues?.map((snip: any, index: any) => ({
        ...snip,
        id: `snip-${index}`,
      }))
      : [];
  const [warningOpen, setWarning] = useState({
    warningState: false,
    snipID: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  console.log("snipInfo", snipInfo)
  const [activeSnip, setActiveSnip] = useState<Snippet | null>(null);
  console.log("activeSnip", activeSnip)

  const addButtonClickHandler = () => {
    const addNewField = {
      heading: "",
      description: "",
      id: `snip-${snipInfo?.length}`,
    };

    setActiveSnip(addNewField)
  };

  const removeClickHandler = (snipID: string, isNewlyAdded: boolean) => {
    setWarning({
      warningState: true,
      snipID,
    });
  };

  const handleYesWarningClick = async (snipId: string) => {
    const current_snippets = snipInfo.filter((snip: any) => {
      if (snip.id === snipId) {
        return false;
      }
      return true;
    });

    const payload = {
      id: id,
      action: "SnippetInfo",
      snippets:
        current_snippets.length !== 0
          ? current_snippets.map((snippet: any) => ({
            heading: snippet.heading,
            description: snippet?.description || null,
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
      "snippets",
      edit_expert_data.snip_form.delete
    );
  };

  return (
    <>
      <WarningDialog
        open={warningOpen.warningState}
        text={edit_expert_data.snip_form.delete_warning}
        handleClose={() => setWarning({ warningState: false, snipID: "" })}
        handleYesClick={() => handleYesWarningClick(warningOpen.snipID)}
      />

      {snipInfo?.map((Snip, index: any) => (
        <DisplaySnippet
          key={Snip.id}
          removeSnippet={() => removeClickHandler(Snip.id, false)}
          editSnippet={() => setActiveSnip(Snip)}
          snippetDetail={Snip}
        />
      ))}

      {activeSnip ? (
        <DialogModal
          title={"Add Relevancy"}
          isOpen={!!activeSnip}
          handleClose={() => {
            setActiveSnip(null);
          }}
        >
          <Form
            snipID={activeSnip.id}
            id={id}
            handleClose={() => {
              setActiveSnip(null);
            }}
            defaultValues={activeSnip}
            setFormChange={setFormChange}
            setBackdropOpen={setBackdropOpen}
            setFormDefaultValues={setFormDefaultValues}
            allSnipInfo={snipInfo}
          />
        </DialogModal>
      ) : null}
      <Button
        variant="text"
        // disabled={!isAddMoreOpen}
        sx={addBtnStyle}
        onClick={addButtonClickHandler}
      >
        + Add Relevancy
      </Button>
    </>
  );
};

export default SnippetsForms;
