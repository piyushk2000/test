import DialogModal from "../../../../../atoms/dialog"
import { SelectedCards } from "../../type";
import MultipleExperts from "../multipleExperts";
import PendingComplianceForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    pe_id: number | null;
    selectedCards: SelectedCards[];
    isMultiple: boolean;
    setLoading: (b: boolean) => void;
}

const PendingComplianceDialog = ({ isOpen, handleClose, pe_id, isMultiple, selectedCards, setLoading }: Props) => {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title="Mark client specific compliance as completed"
        >
            {isMultiple && <MultipleExperts selectedCards={selectedCards} />}
            {(isMultiple && selectedCards.length === 0) ? <></>
                : <PendingComplianceForm
                    handleClose={handleClose}
                    pe_id={pe_id}
                    selectedCards={selectedCards}
                    isMultiple={isMultiple}
                    setLoading={setLoading}
                />
            }
        </DialogModal>
    )
}

export default PendingComplianceDialog