import { Box } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import { selectedCardsTypes } from "../../../pages/Experts/types";
import ProjectFieldForm from "./projectFieldForm";
import SelectedExperts from "./selected-experts";
import { noExpertsSelectedStyle } from "../map-multiple-experts-to-project/helper";


type Props = {
    isOpen: boolean;
    handleClose: () => void;
    handleStageSubmit: (res: any) => void;
    selectedCards: selectedCardsTypes;
}

export default function AddToStaging({ isOpen, handleClose, handleStageSubmit, selectedCards }: Props) {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Add Experts To Staging Area"}
        >
            {selectedCards.length > 0 ?
                <>
                    <SelectedExperts selectedCards={selectedCards} />
                    <ProjectFieldForm handleClose={handleClose} selectedCards={selectedCards} handleStageSubmit={handleStageSubmit} />
                </> :
                <Box sx={noExpertsSelectedStyle}>
                    <p>Please select experts before adding them to Staging Area.</p>
                </Box>
            }

        </DialogModal>
    )
}