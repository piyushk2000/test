import { Box, Grid, Typography, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import "./moderate-project-call.scss";
import ExpandLess from "../../../assets/images/client/down.png";
import ExpandMore from "../../../assets/images/client/uparrow.png";
import CheckIcon from "@mui/icons-material/Check";
import { projectCallsData } from "./helper";
import IdImage from "../../../assets/images/id-badge-2.png";
import Image from "../../../assets/images/image-5.png";

const ModerateProjectCalls = () => {
  const [collapse, setCollapse] = useState(true);
  const [buttonStates1, setButtonStates1] = useState(
    new Array(projectCallsData.length).fill(false)
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
      <Box className="moderate-project-calls">
        <Grid className="project-calls-dropdown">
          <Typography className="project-calls-text">Calls</Typography>
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
            {projectCallsData.map((data, index) => {
              return (
                <>
                  <Grid item xs={5.9} className="project-calls-detail">
                    <Grid container className="project-calls-container">
                      <Grid xs={10} className="project-calls-detail-container">
                        <Grid xs={6} className="calls-detail-col-1">
                          <Stack className="row-1">
                            <Typography className="call-id">
                              Call ID:
                            </Typography>
                            <Typography className="call-id-data">
                              {data.call_id}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Expert Name:
                            </Typography>
                            <Typography className="header-data">
                              {data.expert_name}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Billing City:
                            </Typography>
                            <Typography className="header-data">
                              {data.billing_city}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">RE:</Typography>
                            <Typography className="header-data">
                              {data.re}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Cost Price:
                            </Typography>
                            <Typography className="header-data">
                              {data.cost_price}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid xs={6} className="calls-detail-col-2">
                          <Stack className="row-1">
                            <Typography className="project-id">
                              Project ID:
                            </Typography>
                            <Typography className="project-id-data">
                              {data.project_id}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Client Name:
                            </Typography>
                            <Typography className="header-data">
                              {data.client_name}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Acc Manager:
                            </Typography>
                            <Typography className="header-data">
                              {data.acc_manager}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Selling Price:
                            </Typography>
                            <Typography className="header-data">
                              {data.selling_price}
                            </Typography>
                          </Stack>
                          <Stack className="row-2">
                            <Typography className="header">
                              Call Start Time:
                            </Typography>
                            <Typography className="header-data">
                              {data.call_start_time}
                            </Typography>
                          </Stack>
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
export default ModerateProjectCalls;
