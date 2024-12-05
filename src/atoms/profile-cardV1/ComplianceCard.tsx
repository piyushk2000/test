import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import ViewCompliance from "./ViewCompliance";

export const ComplianceCard = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        textAlign: "center",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: "0",
          margin: "0",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00BC48",
          color: "white",
          fontWeight: "bold",
        }}
      >
        C
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ marginTop: "2px" }}
      >
        <Box
          sx={{
            margin: "12px 20px 12px 10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography fontSize={"12px"} onClick={handleOpenModal} >View Compliance</Typography>
          <Typography fontSize={"12px"}>Generate Compliance</Typography>
        </Box>
      </Popover>
      <ViewCompliance open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
