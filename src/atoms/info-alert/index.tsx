import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  text: string;
  open: boolean;
  handleClose: () => void
}

export default function InfoAlert({text, open, handleClose}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="info"
          variant="filled"
          sx={{ background: "rgb(184, 155, 113)", mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
}


// #2F498E
// #3186C1