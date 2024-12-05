import DialogModal from '../../../../../atoms/dialog'
import { SelectedCards } from '../../type';
import MultipleExperts from '../multipleExperts';
import InviteExpertForm from './form';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    pe_id: string | null;
    project_id: string | null;
    isReInvite: boolean;
    selectedCards: SelectedCards[];
    isMultiple: boolean;
    setLoading(b: boolean): void;
}

const InviteExpertPE = ({ isOpen, handleClose, isReInvite, pe_id, project_id, selectedCards, isMultiple, setLoading }: Props) => {
    return (
        <DialogModal
            title={isReInvite ? "ReInvite Expert" : "Invite Expert"}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            {isMultiple &&
                <MultipleExperts
                    selectedCards={selectedCards}
                />
            }
            {(isMultiple && selectedCards.length === 0) ? <></> :
                <InviteExpertForm
                    handleClose={handleClose}
                    pe_id={pe_id}
                    project_id={project_id}
                    isMultiple={isMultiple}
                    selectedCards={selectedCards}
                    setLoading={setLoading}
                />
            }

        </DialogModal>
    )
}

export default InviteExpertPE