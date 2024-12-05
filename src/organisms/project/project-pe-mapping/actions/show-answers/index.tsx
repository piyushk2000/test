import Button from "@mui/material/Button"
import DialogModal from "../../../../../atoms/dialog"
import ShowReviewedBy from "../../../../compliances/autoAprovalDialog/showReviewedBy"
import ShowAnswersForm from "../../../../compliances/autoAprovalDialog/showAnswersForm"
import { Link } from "react-router-dom"
import AttachmentIcon from '@mui/icons-material/Attachment';
import { NumberQuestion } from "../../../../compliances/autoAprovalDialog/types"
import CustomBtnFilled from "../../../../../atoms/form-molecules/CustomBtnFilled"
import { APIRoutes, AppRoutes } from "../../../../../constants"

type Props = {
    isOpen: boolean,
    show_reviewed_by: { status: string, name: string, date: string } | null,
    handleClose: () => void,
    proof_url?: string,
    answers: NumberQuestion[] | null,
    isInfo?: boolean,
    showReAnswerBtn?: { unique_code: string } | null;
}


export const ShowAnswersDialog = ({ isOpen, handleClose, show_reviewed_by, proof_url, answers, isInfo, showReAnswerBtn }: Props) => {

    return (
        <DialogModal
            title={"Answers Provided By Expert"}
            isOpen={isOpen}
            handleClose={handleClose}
            titleSx={{ mb: "10px" }}
            TitleEl={
                <>
                    {showReAnswerBtn &&
                        <Link to={window.location.origin + AppRoutes.EXPERTCOMPLIANCE + "?unique_code=" + showReAnswerBtn.unique_code + "&is_edit=1"} target={'_blank'} rel={'noopener,noreferrer'}>
                            <CustomBtnFilled
                                label="ReSubmit Answers"
                                variant="contained"
                            />
                        </Link>
                    }
                </>
            }
        >
            {show_reviewed_by &&
                <ShowReviewedBy
                    status={show_reviewed_by.status}
                    name={show_reviewed_by.name}
                    date={show_reviewed_by.date}
                />
            }
            {proof_url &&
                <Button
                    startIcon={<AttachmentIcon />}
                    sx={{ marginTop: show_reviewed_by ? "10px" : "0" }}
                >
                    <Link target="_blank" rel="noopener,noreferrer" to={proof_url}>
                        Attachment
                    </Link>
                </Button>
            }
            <ShowAnswersForm questions={answers} isInfo={isInfo} />
        </DialogModal>
    )
}