import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import DialogModal from "../../../../../../atoms/dialog";
import CustomBtnFilled from "../../../../../../atoms/form-molecules/CustomBtnFilled";
import { ElementRef, useRef } from "react";
import { copyHtml } from "../../../../../../utils/copyHtml";
import { SharedProfiles } from "../../../type";
import EmailFormatDialog from ".";
import { BoxFlex } from "../../../../../../atoms/boxSpaceBtw";



type Props = {
    isOpen: boolean;
    handleClose: () => void;
    experts: SharedProfiles[];
    handleReArrangeExpert: (experts: SharedProfiles[]) => void;
}

const EmailFormatDialogBulk = ({ isOpen, handleClose, experts , handleReArrangeExpert}: Props) => {

    const componentRef = useRef<ElementRef<"div">>(null);

    const { enqueueSnackbar } = useSnackbar();

    const handleCopyToClipboard = async () => {
        await copyHtml(componentRef, enqueueSnackbar);
    };


    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Expert Details"}
            titleSx={{ paddingTop: "0" }}
            TitleEl={
                <BoxFlex sx={{gap: "1rem"}}>
                    <CustomBtnFilled
                        label="ReArrange Experts"
                        variant="contained"
                        onClick={() => {
                            handleClose();
                            handleReArrangeExpert(experts);
                        }}
                    />
                    <CustomBtnFilled
                        label="Copy to clipboard"
                        variant="outlined"
                        onClick={handleCopyToClipboard}
                    />
                </BoxFlex>
            }
        >
            <Stack mt={"10px"} sx={{
                fontFamily: `"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif`,
                "& p": {
                    fontSize: "14px"
                }
            }}
                flexDirection={"column"}
                ref={componentRef}
            >
                {experts.map((val,index) =>
                    <div>
                        <EmailFormatDialog
                            isOpen={isOpen}
                            handleClose={handleClose}
                            expert_id={val.expert_id}
                            relevant_company={val.company}
                            relevant_designation={val.designation}
                            snippet={val.snippet}
                            charges={val.charges}
                            meta={val.meta}
                            forBulk={true}
                            isBulkFirst={index === 0}
                        />
                        <br />
                        <hr />
                    </div>
                )}
            </Stack>

        </DialogModal>
    )
}

export default EmailFormatDialogBulk