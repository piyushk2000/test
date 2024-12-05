import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";
import EditIcon from '@mui/icons-material/Edit';
import { acceptedFileTypes, maxSizeBytes, resizeImage } from "./helper";

// Function to convert a File to a data URL
const fileToDataURL = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageDropzone = (props: any) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File | null, url: string | null }>({ file: null, url: null });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { setImage, borderColor = "black" } = props;

  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (
      acceptedFileTypes.find((accept: any) => accept === acceptedFiles[0].type)
    ) {
      if (acceptedFiles[0].size < maxSizeBytes) {
        setErrorMsg("");
        const resizedImage: any = await resizeImage(acceptedFiles[0]);
        const dataURL = await fileToDataURL(resizedImage);

        setSelectedImage({
          file: resizedImage,
          url: dataURL
        })
        setImage(resizedImage);
      } else {
        setErrorMsg("Max Image Size: 10MB");
      }
    } else {
      setSelectedImage({ file: null, url: null });
      setErrorMsg("Accepted Formats - .jpeg .png .jpg .webp");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Box className="imageBox-container">
      {!selectedImage.file ?
        <Box className="imageBox" style={{ borderColor }}>
          <div {...getRootProps()} className="dropzone-box" style={{ borderColor }}>
            <input {...getInputProps()} />
            <>
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : !selectedImage.file ? (
                <p>Drag 'n' drop image here, or click to select image</p>
              ) : (
                <></>
              )}
            </>
          </div>
        </Box> :
        <Box {...getRootProps()}
          sx={{
            width: "350px",
            position: "relative",
            height: "350px",
            cursor: "pointer",

            ".image": {
              borderRadius: "10px", objectFit: "cover",
            },
            "&:hover .image": {
              filter: "blur(5px)",
              transition: "filter 0.25s ease",
            },
            "&:hover .imageText": {
              opacity: "1"
            },
          }}
        >
          <input {...getInputProps()} />
          <img
            src={selectedImage.url!}
            alt="Selected"
            height={"100%"}
            width={"100%"}
            className="image"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              textAlign: "center",
              position: "absolute",
              inset: "0",
              color: "white",
              opacity: "0",
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: "10px"
            }}
            className="imageText"
          >
            <Typography>{selectedImage.file.name}</Typography>
            <EditIcon />
          </Box>
        </Box>
      }

      <Box className="error-msg">{errorMsg && <p>{errorMsg}</p>}</Box>
    </Box>
  );
};

export default ImageDropzone;
