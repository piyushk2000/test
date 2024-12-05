import React, { useState } from "react";
import DialogModal from "../../../atoms/dialog";
import ProjectFieldForm from "./forms/projectFieldForm";
import { ProjectOptions, ProjectSelected } from "./types";
import {
  MapMultipleProjectContext,
  cancelBtnStyles,
  hrStyles,
  noExpertsSelectedStyle,
  projectSelectText,
} from "./helper";
import { selectedCardsTypes } from "../../../pages/Experts/types";
import ExpertsForm from "./forms/expertsForm";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { isClient } from "../../../utils/role";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  selectedCards: selectedCardsTypes;
  setBackdrop: (bool: boolean) => void;
};

const AddToProjectExperts = ({
  isOpen,
  handleClose,
  selectedCards,
  setBackdrop,
}: Props) => {
  const [projectOptions, setProjectOptions] = useState<ProjectOptions>([]);
  const [projectSelected, setProjectSelected] =
    useState<ProjectSelected | null>(null);

  return (
    <DialogModal
      title={isClient() ? "Request Call" : "Map Multiple Experts with a Project"}
      handleClose={handleClose}
      isOpen={isOpen}
    >
      {selectedCards.length === 0 ? (
        <Box sx={noExpertsSelectedStyle}>
          <p>Please select experts before adding them to a project.</p>
        </Box>
      ) : (
        <MapMultipleProjectContext.Provider
          value={{
            projectOptions,
            setProjectOptions,
            selectedCards,
            projectSelected,
            setProjectSelected,
            setBackdrop,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <ProjectFieldForm />
            </Grid>
            <Grid item xs={12} sx={projectSelectText}>
              <p>
                You have to click on Submit button for each expert individually
              </p>
            </Grid>
            <Grid item xs={12}>
              {selectedCards.map((card, index) => (
                <React.Fragment key={card.value}>
                  <ExpertsForm name={card.label} id={card.value} />
                  {index === selectedCards.length - 1 ? (
                    <></>
                  ) : (
                    <hr style={hrStyles} />
                  )}
                </React.Fragment>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Box sx={cancelBtnStyles}>
                <CustomBtnFilled
                  label="Close"
                  variant="outlined"
                  onClick={handleClose}
                />
              </Box>
            </Grid>
          </Grid>
        </MapMultipleProjectContext.Provider>
      )}
    </DialogModal>
  );
};

export default AddToProjectExperts;
