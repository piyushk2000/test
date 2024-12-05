import { Box } from "@mui/material";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import React, { Dispatch, SetStateAction } from "react";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";

type Props = {
    setUrl: Dispatch<SetStateAction<string | null>>,
}

export default function DocumentForProof({setUrl}: Props) {
    const { setLoading } = useFullPageLoading();
    const [controller, setController] = React.useState({
        control: null,
        for: "",
        setSelectedFile: null,
      });

    return (
        <Box sx={{ padding: "10px", "& p": { fontWeight: "600" } }}>
            <p>Upload proof document</p>
            <Box sx={{ padding: "10px 0 0" }}>
                <FileUpload
                    setUrl={(url) => setUrl(url)}
                    setLoading={setLoading}
                    setController={setController}
                />
            </Box>
        </Box>
    )
}