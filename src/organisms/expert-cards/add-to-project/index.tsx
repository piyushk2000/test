import DialogModal from "../../../atoms/dialog"
import AddPE from "../../project/project-add-pe-form";


type Props = {
  isOpen: boolean;
  handleClose(): void;
  handleFormChange(): void;
  handleSubmitClose(): void;
  selectedExpert: { label: string, value: number };
}

export function AddToProject({ isOpen, handleClose, handleFormChange, handleSubmitClose, selectedExpert }: Props) {
  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={"Add to a Project"}
    >
      <AddPE
        handleClose={handleClose}
        handleSubmitClose={handleSubmitClose}
        selectedExpert={selectedExpert}
        isProjectField={true}
        handleChangeForm={handleFormChange}
      />
    </DialogModal>
  )
}