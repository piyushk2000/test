import { Box, Divider, Grid, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DefinitionChip from "../project-details/definationChip";

type Props = {
  isOpen: boolean;
  handleClose(): void;
};

const IconDefinitionDialog = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" component="h2">
            Definitions
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={handleClose}
          />
        </Stack>
        

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Icon Definition
        </Typography>
        <Divider sx={{mb:2}} />
        <Grid container spacing={2} mb={3}>
          {[
            { text: "A", label: "Agenda" },
            { text: "IN", label: "Invitation" },
            { text: "CE", label: "Client Compliance - Expert" },
            { text: "CC", label: "Client Compliance - Compliance Team" },
          ].map((item, index) => (
            <Grid item xs={12} key={index}>
              <Stack direction="row" spacing={2} alignItems="center">
                <DefinitionChip
                  toolTipTitle={item.label}
                  text={item.text}
                  color="#ffffff"
                />
                <Typography>{item.label}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" fontWeight="bold">
          Color Definition
        </Typography>

        <Divider sx={{mb:2}}/>

        <Grid container spacing={2}>
          {[
            { color: "red", label: "Rejected / Declined" },
            { color: "#16A848", label: "Accepted / Approved" },
            { color: "grey", label: "Shared" },
          ].map((item, index) => (
            <Grid item xs={12} key={index}>
              <Stack direction="row" spacing={2} alignItems="center">
                <DefinitionChip
                  toolTipTitle={item.label}
                  text=""
                  color={item.color}
                />
                <Typography>{item.label}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default IconDefinitionDialog;