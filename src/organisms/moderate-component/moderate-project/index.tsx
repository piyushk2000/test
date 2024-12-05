import { Box, Grid, Typography, IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import "./moderate-project.scss";
import ExpandLess from "../../../assets/images/client/down.png";
import ExpandMore from "../../../assets/images/client/uparrow.png";
import CheckIcon from "@mui/icons-material/Check";
import { projectData } from "./helper";
import IdImage from "../../../assets/images/id-badge-2.png";
import Image from "../../../assets/images/image-5.png";

const ModerateProject = () => {
  const [collapse, setCollapse] = useState(true);
  const [buttonStates1, setButtonStates1] = useState(
    new Array(projectData.length).fill(false)
  );

  const handleExpandButton = () => {
    setCollapse(!collapse);
  };

  const handleButtonClicked1 = (index: number) => {
    const newButtonStates = buttonStates1.map((state, i) =>
      i === index ? !state : false
    );
    setButtonStates1(newButtonStates);
  };

  return (
    <>
      <Box className="moderate-project">
        <Grid className="project-dropdown">
          <Typography className="project-text">Project</Typography>
          <Box style={{ cursor: "pointer" }} onClick={handleExpandButton}>
            {collapse ? (
              <img
                src={ExpandLess}
                width={"15px"}
                height={"14px"}
                alt="expand"
              />
            ) : (
              <img
                src={ExpandMore}
                width={"15px"}
                height={"14px"}
                alt="expand"
              />
            )}
          </Box>
        </Grid>
        {collapse && (
          <Grid container>
            {projectData.map((data, index) => {
              return (
                <>
                  <Grid item xs={5.9} className="project-detail">
                    <Grid container className="project-container">
                      <Grid item xs={1.2} className="project-image">
                        <Avatar src={Image} />
                      </Grid>
                      <Grid xs={10} className="project-detail-container">
                        <Typography className="project-name">
                          {data.project_name}
                        </Typography>
                        <Grid className="project-id">
                          <img
                            src={IdImage}
                            width="12px"
                            height="12px"
                            alt="id"
                          />
                          <Typography className="project-id-text">
                            {data.project_id}
                          </Typography>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              Client Name:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.client_name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              Acc Manager:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.acc_manager}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              Billing City:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.billing_city}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              RE:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.re}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              Created On:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.created_on}
                            </Typography>
                          </Grid>
                          <Grid item xs={2.8}>
                            <Typography className="project-text">
                              Target Date:
                            </Typography>
                          </Grid>
                          <Grid item xs={3.2}>
                            <Typography className="project-text-color">
                              {data.target_date}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={0.8}>
                        <IconButton
                          sx={{
                            color: buttonStates1[index] ? "#fff" : "#37B498",
                            backgroundColor: buttonStates1[index]
                              ? "#37B498"
                              : "rgba(55, 180, 152, 0.12)",
                            height: "30px",
                            width: "30px",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: buttonStates1[index]
                                ? "#37B498"
                                : "rgba(55, 180, 152, 0.12)",
                            },
                          }}
                          onClick={() => handleButtonClicked1(index)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index === 0 ? (
                    <hr style={{ border: "1px solid #b7b7b7" }} />
                  ) : null}
                </>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};
export default ModerateProject;
