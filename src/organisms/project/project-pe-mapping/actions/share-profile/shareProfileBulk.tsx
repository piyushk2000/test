import { useState } from 'react'
import DialogModal from '../../../../../atoms/dialog'
import { SharedProfiles, SelectedCards, setDialogState } from '../../type';

import NoResultFoundFilters from '../../../../../atoms/noResultsFilters';
import { Grid } from '@mui/material';
import { Data } from '../../list-view/types';
import ShareProfileFormBulk from './dialogBulk';
import { usePeMappingContext } from '../../helper';

type Props = {
    handleClose: () => void;
    isOpen: boolean;
    handleSubmitClose: () => void;
    pe_id: number | null;
    handleChange: () => void;
    setPeDialog: setDialogState;
    selectedCards: SelectedCards[];
    rows: Data[] | null
}

const ShareProfileDialogBulk = ({ setPeDialog, handleClose, handleSubmitClose, isOpen, pe_id, handleChange, selectedCards, rows }: Props) => {
    const [currentCardNumber, setCurrentCardNumber] = useState(0);
    const [currentCard, setCurrentCard] = useState<Data | null | undefined>(selectedCards.length && rows && rows.length ? rows.find((val => val.pe_id == selectedCards[0].value)) : null);
    const [cardsProcessed, setCardsProcessed] = useState<SharedProfiles[]>([]);
    const { refetch } = usePeMappingContext();

    const handleRealClose = () => {
        let cards = [...cardsProcessed];
        if (cards.length > 0) {
            handleSubmitClose();
            refetch();

            // opening Expert details to page - copy to clipboard
            setPeDialog((prev) => ({
                ...prev,
                actions: {
                    ...prev.actions,
                    shareProfileExperts: {
                        ...prev.actions.shareProfileExperts,
                        reaarange_expert: true,
                        experts: cards,
                        isChange: false
                    }
                }
            }))
        } else {
            handleClose()
        }
    }

    const handleSkipClose = () => {
        let cardNumber = currentCardNumber;
        cardNumber++;
        setCurrentCardNumber(cardNumber);
        let cards = [...cardsProcessed];
        if (cardNumber == selectedCards.length) {
            if (cards.length > 0) {
                handleSubmitClose();
                refetch();

                // opening Expert details to page - copy to clipboard
                setPeDialog((prev) => ({
                    ...prev,
                    actions: {
                        ...prev.actions,
                        shareProfileExperts: {
                            ...prev.actions.shareProfileExperts,
                            reaarange_expert: true,
                            experts: cards,
                            isChange: false,
                        }
                    }
                }))
            } else {
                handleClose()
            }
        } else {
            setCurrentCard(selectedCards.length && rows && rows.length ? rows.find((val => val.pe_id == selectedCards[cardNumber].value)) : null)
        }
    }

    const handleRealSubmitClose = (data: SharedProfiles) => {
        let cardNumber = currentCardNumber;
        cardNumber++;
        setCurrentCardNumber(cardNumber);
        let cards = [...cardsProcessed];
        cards.push(data);
        if (cardNumber == selectedCards.length) {
            handleSubmitClose();
            refetch();

            // opening Expert details to page - copy to clipboard
            // opening Expert details to page - copy to clipboard
            setPeDialog((prev) => ({
                ...prev,
                actions: {
                    ...prev.actions,
                    shareProfileExperts: {
                        ...prev.actions.shareProfileExperts,
                        reaarange_expert: true,
                        experts: cards,
                        isChange: false
                    }
                }
            }))
        } else {
            setCurrentCard(selectedCards.length && rows && rows.length ? rows.find((val => val.pe_id == selectedCards[cardNumber].value)) : null)
            setCardsProcessed([...cards]);
        }
    }

    const getOrdinalSuffix = (n:number) => {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }


    return (
        <DialogModal
            title={"Share Profile with client " + (selectedCards.length > 1 ? ` (${getOrdinalSuffix(currentCardNumber + 1)} of ${selectedCards.length} profiles selected)` : '')}
            isOpen={isOpen}
            handleClose={handleRealClose}
            contentSx={{
                height: "100vh"
            }}
        > {selectedCards.length && rows && rows.length ?
            <>
                <ShareProfileFormBulk
                    isOpen={isOpen}
                    handleClose={handleSkipClose}
                    handleSubmitClose={() => { }}
                    pe_id={currentCard?.pe_id || null}
                    expert_id={currentCard?.expert_id || null}
                    company={currentCard?.curr_company || null}
                    designation={currentCard?.curr_designation || null}
                    handleChange={handleChange}
                    is_agenda_respond={currentCard?.is_agenda_respond || false}
                    location={currentCard?.curr_company_location || null}
                    setPeDialog={setPeDialog}
                    meta={currentCard?.meta || {}}
                    setCurrentExpert={(data) => handleRealSubmitClose(data)}
                    isBulkLast={(selectedCards.length - 1) === currentCardNumber}
                    rows={rows}
                />
            </>
            :
            <Grid container mt={"10px"}><Grid item xs={12} mb="42px">
                <NoResultFoundFilters text="Please Select an Expert" />
            </Grid></Grid>
            }</DialogModal>
    )
}

export default ShareProfileDialogBulk