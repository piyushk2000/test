import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

import DialogModal from "../../../../../../atoms/dialog"
import { APIRoutes } from "../../../../../../constants";
import { useFetch } from "../../../../../../utils/hooks/useFetch";
import { ExpertDetails } from "./types";
import { getExpertData } from "./helper";
import { useGetParams } from "../../../../../../utils/hooks/useGetParams";
import CustomBtnFilled from "../../../../../../atoms/form-molecules/CustomBtnFilled";
import { ElementRef, useEffect, useRef } from "react";
import RichTextDisplayer from "../../../../../../atoms/rich-text-editor/RichTextDisplayer";
import { copyHtml } from "../../../../../../utils/copyHtml";
import { getPeMappingSharedUrlWithoutToken } from "../../../../../project-detail/mapping/helper";
import { useProjectDetailsContext } from "../../../../../../atoms/project-details/projectContext";
import { MetaType } from "../../../type";



type Props = {
    isOpen: boolean;
    handleClose: () => void;
    expert_id: number | null;
    relevant_company: string | null;
    relevant_designation: string | null;
    snippet: string | null;
    charges: string | null;
    meta: MetaType;
    forBulk?: Boolean;
    isBulkFirst?: boolean;
    componentHtml?: (html: any) => void;
}

const EmailFormatDialog = ({ isOpen, handleClose, expert_id, relevant_company, relevant_designation, snippet, charges, meta, forBulk, isBulkFirst, componentHtml }: Props) => {
    const { data } = useFetch<ExpertDetails[]>(`${APIRoutes.getExpert}?id=${expert_id}&embed=YES`, {
        variables: [expert_id]
    })

    const project_id = useGetParams("project_id");
    const project_status = useGetParams("project_status");

    const { defaultValues } = useProjectDetailsContext();
    const client_id = defaultValues?.projectDetails?.client_id || "";

    const expertData = data ? getExpertData(data[0], relevant_company, relevant_designation, charges) : null;

    const componentRef = useRef<ElementRef<"div">>(null);

    const { enqueueSnackbar } = useSnackbar();

    const handleCopyToClipboard = async () => {
        await copyHtml(componentRef, enqueueSnackbar);
    };

    useEffect(() => {
        (async () => {
            if (expertData && componentRef.current && componentHtml) {
                const html = await copyHtml(componentRef, enqueueSnackbar, true);
                componentHtml(html);
            }
        })()
    }, [expertData, componentRef.current]);



    return (
        <>
            {forBulk ?
                <div>
                    {!expertData ? <CircularProgress sx={{ color: "#EC9324", mt: "10px" }} /> :
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
                            {isBulkFirst &&
                                <p style={{ color: "#EC9324", marginBottom: "10px" }}>
                                    <strong>
                                        <u>
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id))}
                                            >
                                                Presentation Link
                                            </a>
                                        </u>
                                    </strong>
                                </p>
                            }
                            <p style={{ color: "#EC9324", fontWeight: "600", marginBottom: "10px" }}>
                                <u>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id))}
                                    >{expertData.name}
                                    </a>
                                </u>
                            </p>
                            <Box sx={{ marginBottom: "10px" }}>
                                {relevant_designation && relevant_company && expertData.rel_company_date &&
                                    <p>
                                        <span style={{ fontWeight: "600" }}>Relevant Designation & Company: </span>{relevant_designation} at {relevant_company} {expertData.rel_company_date}
                                    </p>
                                }

                                {
                                    expertData.curr_company_full &&
                                    <p>
                                        <span style={{ fontWeight: "600" }}>Current Designation & Company: </span>{expertData.curr_company_full}
                                    </p>
                                }

                                <p><span style={{ fontWeight: "600" }}>Geography: </span>{expertData.geography}</p>
                            </Box>

                            <Box style={{ marginBottom: "10px" }}>
                                {snippet && <RichTextDisplayer text={snippet} />}
                            </Box>
                            <Box style={{ marginBottom: "10px" }}>
                                {expertData.work_history.length ?
                                    <>
                                        <p style={{ fontWeight: "600" }}>Work History:</p>
                                        <ul style={{ listStyleType: 'disc', marginLeft: "24px" }}>
                                            {expertData.work_history.map(wx => <li key={wx}><p>{wx}</p></li>)}
                                        </ul>
                                    </> : ""
                                }
                            </Box>
                            {expertData.charges && <p><span style={{ fontWeight: "600" }}>Charges: </span>{expertData.charges} <span style={{ fontWeight: "500" }}>{expertData.premium_expert}</span></p>}
                            {!!meta.time_multiplier &&
                                <p>
                                    <span style={{ fontWeight: "600" }}>Multiplier: </span> {meta.time_multiplier}
                                </p>
                            }
                        </Stack>
                    }
                </div> :
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
                    {!expertData ? <CircularProgress sx={{ color: "#EC9324", mt: "10px" }} /> :
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
                                            href={getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id))}
                                        >
                                            Presentation Link
                                        </a>
                                    </u>
                                </strong>
                            </p>
                            <p style={{ color: "#EC9324", fontWeight: "600", marginBottom: "10px" }}>
                                <u>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={getPeMappingSharedUrlWithoutToken(project_id, client_id, String(expert_id))}
                                    >{expertData.name}
                                    </a>
                                </u>
                            </p>
                            <Box sx={{ marginBottom: "10px" }}>
                                <p>
                                    <span style={{ fontWeight: "600" }}>Relevant Designation & Company: </span>{relevant_designation} at {relevant_company} {(expertData.rel_company_date)}
                                </p>
                                {
                                    expertData.curr_company_full &&
                                    <p>
                                        <span style={{ fontWeight: "600" }}>Current Designation & Company: </span>{(expertData.curr_company_full)}
                                    </p>
                                }

                                <p><span style={{ fontWeight: "600" }}>Geography: </span>{expertData.geography}</p>
                            </Box>

                            <Box style={{ marginBottom: "10px" }}>
                                {snippet && <RichTextDisplayer text={snippet} />}
                            </Box>
                            <Box style={{ marginBottom: "10px" }}>
                                {expertData.work_history.length ?
                                    <>
                                        <p style={{ fontWeight: "600" }}>Work History:</p>
                                        <ul style={{ listStyleType: 'disc', marginLeft: "24px" }}>
                                            {expertData.work_history.map(wx => <li key={wx}><p>{(wx)}</p></li>)}
                                        </ul>
                                    </> : ""
                                }
                            </Box>
                            {expertData.charges && <p><span style={{ fontWeight: "600" }}>Charges: </span>{expertData.charges} <span style={{ fontWeight: "500" }}>{expertData.premium_expert}</span></p>}
                            {!!meta.time_multiplier &&
                                <p>
                                    <span style={{ fontWeight: "600" }}>Multiplier: </span> {meta.time_multiplier}
                                </p>
                            }
                        </Stack>
                    }

                </DialogModal>}
        </>
    )
}

export default EmailFormatDialog