import React, { useMemo } from 'react'
import DialogModal from '../../../atoms/dialog'
import SelectAnActionForm from './form';
import { SubmitHandler } from 'react-hook-form';
import { removeWhiteSpacesFromForm } from '../../../utils/utils';

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleSubmitClose(): void;
    Actions: Array<{ title: string, label: React.ReactNode, onClick(): void }>;
    onActionSelect: (action: { title: string, label: React.ReactNode, onClick(): void } | null) => void;
    selectActionSubmitBtnName: string;
}

const SelectAnActionDialog = ({ isOpen, handleClose, handleSubmitClose, Actions, onActionSelect, selectActionSubmitBtnName }: Props) => {

    const onSubmit: SubmitHandler<{ action: string | null }> = (formData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        if (!newFormData.action) {
            return;
        }

        const actionTitle = newFormData.action;

        const selectedAction = Actions.find((action) => action.title === actionTitle) || null;
        onActionSelect(selectedAction);
        handleSubmitClose();
    }

    const actionOptions = useMemo(() => {
        if (isOpen) {
            return Actions.map((action) => ({ label: action.title, value: action.title }))
        } else {
            return [];
        }
    }, [isOpen, Actions])

    return (
        <DialogModal
            isOpen={isOpen}
            title={"Select a Bulk Action"}
            handleClose={handleClose}
        >
            <SelectAnActionForm
                handleClose={handleClose}
                onSubmit={onSubmit}
                actionOptions={actionOptions}
                selectActionSubmitBtnName={selectActionSubmitBtnName}
            />
        </DialogModal>
    )
}

export default SelectAnActionDialog