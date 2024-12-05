import { useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import TimelineFilters from "./form";
import { DefaultValuesState } from "./helper";

type Props = {
  isOpen: boolean;
  timelineState: boolean;
  handleClose: () => void;
  setElementsData: (action: any, actor: string | null, date: string | null, filterAdded: boolean) => void;
};

const TimelineFiltersDialog = ({
  isOpen,
  handleClose,
  setElementsData,
  timelineState
}: Props) => {
  const [defaultValues, setDefaultValues] = useState<DefaultValuesState>({
    actor: null,
    action: [],
    greaterthanequalto___timeStamp: null,
    lessthanequalto___timeStamp: null,
  });

  useEffect(() => {
    if (!timelineState) {
      setDefaultValues({
        actor: null,
        action: [],
        greaterthanequalto___timeStamp: null,
        lessthanequalto___timeStamp: null,
      })
    }
  }, [timelineState])

  return (
    <DialogModal
      isOpen={isOpen}
      title="Timeline Filters"
      handleClose={handleClose}
    >
      <TimelineFilters
        handleClose={handleClose}
        setElementsData={setElementsData}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
      />
    </DialogModal>
  );
};

export default TimelineFiltersDialog;
