import DialogModal from "../../../../atoms/dialog";
import PEMappingFilterForm from ".";
import { useEffect, useState } from "react";
import { DefaultValuesPeFilters } from "./types";
import { usePeMappingContext } from "../helper";

type Props = {
  handleClose(): void;
  isOpen: boolean;
  handleSubmitClose(): void;
  filterTextChange: (s: string) => void;
  handleFormChange(): void;
};

const PeFilterDialog = ({
  handleClose,
  isOpen,
  handleSubmitClose,
  filterTextChange,
  handleFormChange,
}: Props) => {
  const [defaultValues, setDefaultValues] = useState<DefaultValuesPeFilters>({
    expert_status: null,
  });

  const { isDialog } = usePeMappingContext();

  return (
    <>
      <DialogModal
        isOpen={isOpen}
        title="Advance Filters"
        handleClose={handleClose}
      >
        <PEMappingFilterForm
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
          filterTextChange={filterTextChange}
          handleFormChange={handleFormChange}
          defaultValues={isOpen && !isDialog.filter.filterText
            ? { expert_status: null } : defaultValues}
          setDefaultValues={setDefaultValues}
        />
      </DialogModal>
    </>
  );
};

export default PeFilterDialog;
