import React from 'react'
import DialogModal from "../../../../../../atoms/dialog";
import SnippetForm from "../../../../../edit-expert/snippets/form";
import { Snippet } from './snippets';
import { updateFields } from '../helper';
import { useSnackbar } from 'notistack';
import { formattedSnippets } from '../type';
import { useFullPageLoading } from '../../../../../../atoms/full-page-loading/loadingContext';

type props = {
    activeSnip: Snippet,
    setActiveSnip: React.Dispatch<React.SetStateAction<Snippet | null>>,
    realSnippets: formattedSnippets,
    setRealSnippets: React.Dispatch<React.SetStateAction<formattedSnippets>>,
    setSearchSnippets: React.Dispatch<React.SetStateAction<formattedSnippets>>,
    expert_id: number | null,
}

const SnippetFormDialog = ({ activeSnip, setActiveSnip, realSnippets, setRealSnippets, setSearchSnippets, expert_id }: props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const handleSubmit = async (payload: any) => {
        setLoading(true);
        try {
            let response = await updateFields(
                payload,
                enqueueSnackbar
            );
            if (response) {
                setActiveSnip(null);
                setRealSnippets([...(response || [])])
                setSearchSnippets([...(response || [])])
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    return (
        <DialogModal
            title={(activeSnip.heading || activeSnip.description) ? "Edit Expert" : "Relevancy"}
            isOpen={!!activeSnip}
            handleClose={() => {
                setActiveSnip(null);
            }}
        >
            <SnippetForm
                snipID={activeSnip.id}
                id={expert_id}
                handleClose={() => {
                    setActiveSnip(null);
                }}
                defaultValues={activeSnip}
                handleSubmit={(data: any) => handleSubmit(data)}
                setBackdropOpen={null}
                setFormDefaultValues={null}
                allSnipInfo={realSnippets}
            />
        </DialogModal>
    )
}

export default SnippetFormDialog