import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { agendaContainer } from "./styles";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import { ModalStates } from "../../../project-detail/project-detail-card/helper";
import { isAdmin, isClient, isExpert } from "../../../../utils/role";

interface AgendaPrevDescriptionProps {
  fk_agenda: ModalStates["isAgendaDescription"]["fk_agenda"];
  agenda_responses: ModalStates["isAgendaDescription"]["agenda_responses"];
  handleClose: () => void;
  editBtnClickHandler: () => void;
  isAdminAllowed: boolean;
  isProjectOpen: boolean;
}

const AgendaPrevDescription: React.FC<AgendaPrevDescriptionProps> = ({
  fk_agenda,
  agenda_responses,
  handleClose,
  editBtnClickHandler,
  isAdminAllowed,
  isProjectOpen
}) => {
  return (
    <>
      <Grid container sx={agendaContainer}>
        {agenda_responses?.map((response, index: number) => (
          <Grid xs={12} item key={index + response.question}>
            <Stack direction={"row"} spacing={1} mr={4} mt={2}>
              <Typography
                fontSize={"12px"}
                fontWeight={600}
                sx={{ color: "#252B3B", opacity: "0.85" }}
              >
                Q{index + 1}.
              </Typography>
              <Stack flex={1} rowGap={1}>
                <Typography
                  fontSize={"12px"}
                  fontWeight={600}
                  sx={{ color: "#484C57", opacity: "0.75" }}
                >
                  {response.question}
                </Typography>
                <Grid container direction={"row"}>
                  <Grid item xs={12} sm={4} md={2}>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={600}
                      sx={{
                        color: "#484C57",
                        opacity: "0.75",
                      }}
                    >
                      Expert Response -
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8} md={10}>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={600}
                      sx={{
                        color: "#099A51",
                        opacity: "0.75",
                      }}
                    >
                      {response.answer}
                    </Typography>
                  </Grid>
                </Grid>
                {response.expert_note && (
                  <Grid container direction={"row"}>
                    <Grid item xs={12} sm={4} md={2}>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={600}
                        sx={{
                          color: "#484C57",
                          opacity: "0.75",
                        }}
                      >
                        Expert Note -
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={10}>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={500}
                        sx={{
                          color: "#484C57",
                          opacity: "0.75",
                        }}
                      >
                        {response.expert_note}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            </Stack>
            <hr style={{ opacity: "0.75", margin: "0.75rem 0" }} />
          </Grid>
        ))}
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2rem",
          marginTop: "50px",
          marginRight: "30px",
        }}
      >
        {!isExpert() && !isClient() && (isAdmin() ? isAdminAllowed : true) && isProjectOpen ?
          <CustomBtnFilled
            label="Edit"
            variant="contained"
            onClick={editBtnClickHandler}
          /> : null
        }

        <CustomBtnFilled
          label="Cancel"
          variant="outlined"
          onClick={handleClose}
        />
      </Grid>
    </>
  );
};

export default AgendaPrevDescription;
