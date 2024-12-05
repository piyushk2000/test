import Grid from "@mui/material/Grid";
import { headingTable, tableContent, projectContent, inputRow } from "./style";
import { Tooltip, Typography } from "@mui/material";
import React from "react";

type Props = {
  selectedProject: {
    label: string;
    value: number;
    client_name: string;
    acc_manager: string;
  }[];
};

const SelectedProjects = ({ selectedProject }: Props) => {
  return (
    <Grid container mt={"1rem"} sx={inputRow}>
      <Grid item xs={2.5} sx={headingTable}>
        <p>Current AM</p>
      </Grid>
      <Grid item xs={2.5} sx={headingTable}>
        <p>Client</p>
      </Grid>
      <Grid item xs={7} sx={headingTable}>
        <p>Project Title</p>
      </Grid>
      <Grid item xs={12} m={"0.5rem 0"}>
        <hr />
      </Grid>
      {selectedProject.map((p) => (
        <React.Fragment key={p.value}>
          <Grid item xs={2.5} sx={tableContent}>
            <p>{p.acc_manager}</p>
          </Grid>
          <Grid item xs={2.5} sx={tableContent}>
            <p>{p.client_name}</p>
          </Grid>
          <Grid item xs={7}>
            <Tooltip title={p.label} arrow>
              <Typography sx={projectContent}>{p.label}</Typography>
            </Tooltip>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default SelectedProjects;
