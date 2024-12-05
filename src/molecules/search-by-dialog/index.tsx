import DialogModal from "../../atoms/dialog"
import { SetFilterPayload, filterPayload } from "../../pages/Experts/types";
import { removeWhiteSpacesFromForm } from "../../utils/utils";
import SearchByForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    setFilterPayload: SetFilterPayload;
    defaultValues: filterPayload["otherSearchFilter"];
}

const SearchByDialog = ({ isOpen, handleClose, setFilterPayload, defaultValues }: Props) => {

    const onSubmit = (formData: typeof defaultValues) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        setFilterPayload((prev) => ({
            ...prev,
            otherSearchFilter: newFormData,
            isFilterChange: true,
        }))
        handleClose();
    }

    return (
        <DialogModal
            title="Search By Filters"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <SearchByForm
                handleClose={handleClose}
                onSubmit={onSubmit}
                defaultValues={defaultValues}
            />
        </DialogModal>
    )
}

export default SearchByDialog