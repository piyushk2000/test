import React from "react";
import { Modal, Box, Typography, Stack, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ComplianceData } from "./helper";

interface ViewComplianceProps {
  open: boolean;
  onClose: () => void;
}

const ViewCompliance: React.FC<ViewComplianceProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Box
        style={{
          width: 600,
          height: 400,
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={"12px 20px"}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={"600"}
            sx={{ opacity: "0.85" }}
          >
            Compliance
          </Typography>
          <CloseIcon
            sx={{ fontSize: "18px", color: "#434343", opacity: "0.75", cursor:"pointer" }}
            onClick={onClose}
          />
        </Stack>
        <hr style={{ opacity: "0.75" }} />
        <Grid container spacing={3} padding={"12px 30px 8px 20px"}>
          <Grid item xs={3.5}>
            <Typography
              fontSize={"12px"}
              fontWeight={"500"}
              sx={{ opacity: "0.75" }}
            >
              Name
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography
              fontSize={"12px"}
              fontWeight={"500"}
              sx={{ opacity: "0.75" }}
            >
              Date
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography
              fontSize={"12px"}
              fontWeight={"500"}
              sx={{ opacity: "0.75" }}
            >
              Generated By
            </Typography>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
        {ComplianceData.map((data) => {
          return (
            <>
              <hr style={{ opacity: "0.75" }} />
              <Grid
                container
                spacing={2.5}
                alignItems={"center"}
                padding={"6px 30px 6px 20px"}
              >
                <Grid item xs={3.5}>
                  <Typography
                    fontSize="12px"
                    fontWeight={"600"}
                    sx={{ opacity: "0.80" }}
                  >
                    {data.Name}
                  </Typography>
                </Grid>
                <Grid item xs={3.5}>
                  <Typography
                    fontSize="12px"
                    fontWeight={"600"}
                    sx={{ opacity: "0.80" }}
                  >
                    {data.Date}
                  </Typography>
                </Grid>
                <Grid item xs={3.5}>
                  <Typography
                    fontSize="12px"
                    fontWeight={"600"}
                    sx={{ opacity: "0.80" }}
                  >
                    {data.Generated_By}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#FDF1E2",
                      color: "#CE790F",
                      borderRadius: "10px",
                      padding: "2px 8px 2px 0",
                      "&:hover" :{
                        backgroundColor:"#FDF1E2",
                      },
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </>
          );
        })}
      </Box>
    </Modal>
  );
};

export default ViewCompliance;