import { useSnackbar } from "notistack";
import DialogModal from "../../../../../../atoms/dialog"
import CustomBtnFilled from "../../../../../../atoms/form-molecules/CustomBtnFilled";
import { copyHtml } from "../../../../../../utils/copyHtml";
import { ElementRef, useRef } from "react";
import { Box, Stack } from "@mui/material";
import RichTextDisplayer from "../../../../../../atoms/rich-text-editor/RichTextDisplayer";
import { getPeMappingSharedUrlWithoutToken } from "../../../../../project-detail/mapping/helper";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    project_id: string | null;
    client_id: string | null;
    expert_id: string | null;
    snippet: string | null;
}

export default function ComplianceEmailFormatDialog({ isOpen, handleClose, project_id, client_id, expert_id , snippet}: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const componentRef = useRef<ElementRef<"div">>(null);

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
                <CustomBtnFilled
                    label="Copy to clipboard"
                    variant="outlined"
                    onClick={handleCopyToClipboard}
                />
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
                <p style={{ color: "#EC9324", marginBottom: "10px" }}>
                    <strong>
                        <u>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={client_id ? getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id)) : "#"}
                            >
                                Presentation Link
                            </a>
                        </u>
                    </strong>
                </p>
                <Box style={{ marginBottom: "10px" }}>
                    {snippet && <RichTextDisplayer text={snippet} />}
                </Box>
            </Stack>
        </DialogModal>
    )
}