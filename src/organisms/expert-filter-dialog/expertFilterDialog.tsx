import ExpertFilterForm from "./form";
import { formDefaultValues } from "./helper";
import { useEffect, useRef, useState } from "react";
import DialogModal from "../../atoms/dialog";
import { useGetParams } from "../../utils/hooks/useGetParams";

type expertFilterProps = {
  openDialog: boolean;
  handleClose: any;
  setExpertApiData: any;
  setExpertLoading: any;
  handleSubmitClose: any;
  setFilterPayload: any;
  handleFormChange: () => void;
  setFormResetFunction: any
};

const ExpertFilterDialog = ({
  openDialog,
  handleClose,
  setExpertApiData,
  setExpertLoading,
  handleSubmitClose,
  setFilterPayload,
  handleFormChange,
  setFormResetFunction
}: expertFilterProps) => {
  const added_by_me = useGetParams("added");
  const [defaultValues, setDefaultValues] = useState<any>(formDefaultValues(added_by_me));

  return (
    <>
      {openDialog &&
        <DialogModal
          isOpen={openDialog}
          handleClose={handleClose}
          title="Advance Search"
        >
          <ExpertFilterForm
            setExpertApiData={setExpertApiData}
            setExpertLoading={setExpertLoading}
            handleClose={handleClose}
            setDefaultValues={setDefaultValues}
            defaultValues={defaultValues}
            handleSubmitClose={handleSubmitClose}
            setFilterPayload={setFilterPayload}
            handleFormChange={handleFormChange}
            setFormResetFunction={setFormResetFunction}
          />
        </DialogModal>
      }
    </>
  );
};

export default ExpertFilterDialog;
