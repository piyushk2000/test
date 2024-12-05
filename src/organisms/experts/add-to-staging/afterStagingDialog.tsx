import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import { selectedCardsTypes } from "../../../pages/Experts/types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectedExperts from "./selected-experts";
import { noExpertsSelectedStyle } from "../map-multiple-experts-to-project/helper";
import { useEffect, useState } from "react";


type Props = {
    isOpen: boolean;
    handleClose: () => void;
    stageResponse: any;
    selectedCards: selectedCardsTypes;
}

export default function AfterStagingDialog({ isOpen, handleClose, stageResponse, selectedCards }: Props) {
    const [stagingResponseChanged, setStagingResponseChanged] = useState({
        addedExperts: [],
        already_added_to_pe_table: [],
        already_staged_expert_ids: [],
        not_confirmed_expert_ids: []
    });

    const returnReport:any = (id: any) => {
        let card: any = {}
        selectedCards.forEach(val => {
            if (val.value == id) {
                card = val
            }
        });
        return {
            label: card?.label,
            value: card?.value
        }
    }

    useEffect(() => {
        let obj: any = {
            addedExperts: [],
            already_added_to_pe_table: [],
            already_staged_expert_ids: [],
            not_confirmed_expert_ids: []
        }

        stageResponse.addedExperts.forEach((element: any) => {
            obj.addedExperts.push(returnReport(element.fk_expert))
        });
        stageResponse.already_added_to_pe_table.forEach((element: any) => {
            obj.already_added_to_pe_table.push(returnReport(element))
        });
        stageResponse.already_staged_expert_ids.forEach((element: any) => {
            obj.already_staged_expert_ids.push(returnReport(element))
        });
        stageResponse.not_confirmed_expert_ids.forEach((element: any) => {
            obj.not_confirmed_expert_ids.push(returnReport(element))
        });

        setStagingResponseChanged({ ...obj });

    }, [stageResponse])



    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Experts Added To Staging Area"}
        >
            {selectedCards.length > 0 ?
                <>
                    <div style={{height:'20px'}}></div>
                    <Accordion>
                        <AccordionSummary
                            sx={{ width: '100%' }}
                            expandIcon={<ExpandMoreIcon />}>
                            Added Experts ({stagingResponseChanged.addedExperts.length})
                        </AccordionSummary>
                        <AccordionDetails>
                            {stagingResponseChanged.addedExperts.length ? <SelectedExperts allowMtTop={true} selectedCards={stagingResponseChanged.addedExperts} /> : <p style={{fontSize:'14px'}}>No Records Found</p>}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            sx={{ width: '100%' }}
                            expandIcon={<ExpandMoreIcon />}>
                            Already Added To PE Table ({stagingResponseChanged.already_added_to_pe_table.length})
                        </AccordionSummary>
                        <AccordionDetails>
                            {stagingResponseChanged.already_added_to_pe_table.length ? <SelectedExperts allowMtTop={true} selectedCards={stagingResponseChanged.already_added_to_pe_table} /> : <p style={{fontSize:'14px'}}>No Records Found</p>}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            sx={{ width: '100%' }}
                            expandIcon={<ExpandMoreIcon />}>
                            Already Staged Experts ({stagingResponseChanged.already_staged_expert_ids.length})
                        </AccordionSummary>
                        <AccordionDetails>
                            {stagingResponseChanged.already_staged_expert_ids.length ? <SelectedExperts allowMtTop={true} selectedCards={stagingResponseChanged.already_staged_expert_ids} /> : <p style={{fontSize:'14px'}}>No Records Found</p>}
                        </AccordionDetails>
                    </Accordion>

                    {/* <Accordion>
                        <AccordionSummary
                            sx={{ width: '100%' }}
                            expandIcon={<ExpandMoreIcon />}>
                            Not Confirmed Expert Ids ({stagingResponseChanged.not_confirmed_expert_ids.length})
                        </AccordionSummary>
                        <AccordionDetails>
                            {stagingResponseChanged.not_confirmed_expert_ids.length ? <SelectedExperts allowMtTop={true} selectedCards={stagingResponseChanged.not_confirmed_expert_ids} /> : <p style={{fontSize:'14px'}}>No Records Found</p>}
                        </AccordionDetails>
                    </Accordion> */}
                </> :
                <Box sx={noExpertsSelectedStyle}>
                    <p>Please select experts before adding them to Staging Area.</p>
                </Box>
            }

        </DialogModal>
    )
}