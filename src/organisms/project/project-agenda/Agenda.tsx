import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";

import { getAgendaData, setApplicableAgendaId } from "./helper";
import { style1, style2 } from "./style";
import ViewAgendaSkeleton from "../../../atoms/skeletons/project-details/viewAgenda";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { AgendaDataState, AgendaResponse } from "../../../pages/Projects/types";
import { isSuperAdmin } from "../../../utils/role";

interface ViewAgendaProps {
  open: boolean;
  onClose: () => void;
  openAddAgenda: () => void;
  projectId: string | null;
  openAgendaDescription: (
    fk_agenda: number | null,
    agenda_responses: AgendaResponse[] | null,
    pe_id: number,
    isAdminAllowed: boolean,
    isProjectOpen: boolean
  ) => void;
  isAgendaIdChanged: boolean;
  isAdminAllowed: boolean;
  isProjectOpen: boolean;
}

const Agenda: React.FC<ViewAgendaProps> = ({
  open,
  onClose,
  openAddAgenda,
  projectId,
  openAgendaDescription,
  isAgendaIdChanged,
  isAdminAllowed,
  isProjectOpen
}) => {
  const [data, setData] = useState<AgendaDataState>({
    agenda: null,
    applicable_agenda_id: null
  });

  useEffect(() => {
    open && projectId && getAgendaData(setData, projectId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (isAgendaIdChanged && projectId) {
      setApplicableAgendaId(projectId, setData);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAgendaIdChanged]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Box
        style={{
          width: 500,
          maxHeight: 500,
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
            fontSize={"16px"}
            fontWeight={"600"}
            sx={{ opacity: "0.80" }}
          >
            Agenda
          </Typography>
          <CloseIcon
            sx={{
              fontSize: "18px",
              color: "#434343",
              opacity: "0.75",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </Stack>
        <hr style={{ opacity: "0.75" }} />
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"20px 0"}
          container
        >
          <CustomBtnFilled
            variant="Contained"
            label={(data?.applicable_agenda_id || !isProjectOpen) ? "View Agenda" : "Add Agenda"}
            onClick={openAddAgenda}
            styles={{
              width: "70%",
              height: "2.5rem",
              borderRadius: "30px",
            }}
          />
        </Grid>
        {data?.agenda?.length === 0 ?
          <Typography
            fontSize={"14px"}
            fontWeight={"600"}
            sx={{ opacity: "0.80", textAlign: "center" }}
            width={"100%"}
            pb={"10px"}
          >
            No Agenda Shared
          </Typography> :
          <>
            <Box sx={{ padding: "0 1rem 1rem" }}>
              <Typography
                fontSize={"14px"}
                fontWeight={"600"}
                style={{ opacity: "0.80" }}
              >
                Agenda Shared with
              </Typography>
            </Box>
            <Grid container
              mb={"1rem"}
              sx={{ overflowY: "scroll", maxHeight: "200px", borderTop: "1px solid rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(0,0,0,0.3)" }}
              paddingTop={"0.25rem"}
            >
              {data?.agenda ? (
                data?.agenda?.map((data) => (
                  <Grid
                    key={data.id}
                    container
                    item
                    padding={"0 20px 5px"}
                    alignItems={"center"}
                  >
                    <Grid item xs={5.5}>
                      <Typography
                        fontSize={"13px"}
                        fontWeight={"600"}
                        style={{ opacity: "0.75" }}
                      >
                        {data.expert_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Chip
                        sx={data.agenda_responses ? style1 : style2}
                        label={data.agenda_responses ? "Completed" : "Pending"}
                      />
                    </Grid>
                    <Grid item xs={2} alignItems={"center"}>
                      {(isSuperAdmin() || (data.agenda_responses ? true : isAdminAllowed))
                        &&
                        <CustomBtnFilled
                          label={data.agenda_responses ? "View" : "Add"}
                          variant="contained"
                          onClick={() => {
                            openAgendaDescription(
                              data.fk_agenda,
                              data.agenda_responses,
                              data.id,
                              isAdminAllowed,
                              isProjectOpen
                            );
                          }}
                        />
                      }
                    </Grid>
                  </Grid>
                ))
              ) : (
                <ViewAgendaSkeleton />
              )}
            </Grid>
          </>}
      </Box>
    </Modal>
  );
};

export default Agenda;
