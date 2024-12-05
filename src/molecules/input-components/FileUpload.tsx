import React, { useState } from "react";
import "./styles.scss";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import EditIcon from "../../assets/images/expert/edit.png";
import generateSignedUrl, { acceptedFileTypes, maxSizeBytes } from "./helper";

type UploadTypes = {
  setUrl?: (url: string) => void;
  setLoading?: (loading: boolean) => void;
  setController?: any;
}

type GetFile = {
  getFile?: (file: File | null) => void;
}

type Props = {
  dropzoneConfig?: {
    maxSize?: number;
    text?: React.ReactNode;
  };
  fileAcceptedTypes?: string[];
  errorFileAcceptedMsg?: string;
} & UploadTypes & GetFile;

export function FileUpload({ setLoading, setUrl, setController, dropzoneConfig, getFile, fileAcceptedTypes, errorFileAcceptedMsg}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = (acceptedFiles: any) => {
    const acceptedFormats = fileAcceptedTypes || acceptedFileTypes;

    if (
      acceptedFormats.find((accept) => accept === acceptedFiles[0].type)
    ) {
      if (acceptedFiles[0].size < maxSizeBytes(dropzoneConfig?.maxSize || 10)) {
        setErrorMsg("");
        setSelectedFile(acceptedFiles[0]);
        if (getFile) {
          getFile(acceptedFiles[0]);
        } else {
          handleUpload(acceptedFiles[0], setSelectedFile);
        }
      } else {
        setErrorMsg("Max File Size: " + (dropzoneConfig?.maxSize || 10) + " MB");
      }
    } else {
      setSelectedFile(null);
      setErrorMsg(errorFileAcceptedMsg || "Accepted Formats - .pdf .jpeg .png .jpg .webp");
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const handleUpload = async (file: File, setSelectedFile: any) => {
    if (setUrl && setLoading && setController) {
      try {
        if (!file) return;

        setLoading(true);
        const newController = new AbortController();
        setController(() => ({
          control: newController,
          for: "file-upload",
          setSelectedFile,
        }));

        const id = 20;
        const time = new Date().getTime();
        const filename = `${id}-${time}-${file.name}`;
        const signedUrl = await generateSignedUrl(filename);

        console.log("Signed url is", signedUrl);

      const response = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        signal: newController.signal,
        headers: {
          "Content-Type": file.type,
          'x-amz-acl': 'public-read',
        },
      });

        if (response.ok) {
          console.log("File uploaded successfully");
          setUrl(signedUrl.split("?")[0]);
        } else {
          console.error("Error uploading file");
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Upload canceled: ", err.message);
          enqueueSnackbar("Upload canceled", { variant: "error" });
        } else {
          console.error({ err });
          enqueueSnackbar("Request failed", { variant: "error" });
        }
      } finally {
        setLoading(false);
        setController(() => ({ control: null, for: "" }));
      }
    }
  };

  return (
    <Box className="file-upload-container">
      <Box className="fileBox">
        <div {...getRootProps()} className="dropzone-box">
          <input {...getInputProps()} />
          <>
            {isDragActive ? (
              <p>Drop the File here ...</p>
            ) : !selectedFile ? (
              <>{dropzoneConfig?.text || <p>Drag 'n' drop file here, or click to select file</p>}</>
            ) : (
              <Box className="dropbox-name">
                <Typography>{selectedFile.name}</Typography>
                <img alt="Edit icon" src={EditIcon} />
              </Box>
            )}
          </>
        </div>
      </Box>
      <Box className="error-msg">{errorMsg && <p>{errorMsg}</p>}</Box>
    </Box>
  );
}
