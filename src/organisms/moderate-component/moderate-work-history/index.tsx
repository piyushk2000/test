import { Box, Grid, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import "./moderate-work-history.scss";
import ExpandLess from "../../../assets/images/client/down.png";
import ExpandMore from "../../../assets/images/client/uparrow.png";
import { moderateWorkHistoryData } from "./helper";
import CheckIcon from "@mui/icons-material/Check";

const ModerateWorkHistory = () => {
  const [collapse, setCollapse] = useState(true);
  const [buttonStates1, setButtonStates1] = useState(
    new Array(moderateWorkHistoryData.length).fill(false)
  );
  const [buttonStates2, setButtonStates2] = useState(
    new Array(moderateWorkHistoryData.length).fill(false)
  );
  const [buttonStates3, setButtonStates3] = useState(
    new Array(moderateWorkHistoryData.length).fill(false)
  );
  const [buttonStates4, setButtonStates4] = useState(
    new Array(moderateWorkHistoryData.length).fill(false)
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

  const handleButtonClicked2 = (index: number) => {
    const newButtonStates = buttonStates2.map((state, i) =>
      i === index ? !state : false
    );
    setButtonStates2(newButtonStates);
  };
  const handleButtonClicked3 = (index: number) => {
    const newButtonStates = buttonStates3.map((state, i) =>
      i === index ? !state : false
    );
    setButtonStates3(newButtonStates);
  };
  const handleButtonClicked4 = (index: number) => {
    const newButtonStates = buttonStates4.map((state, i) =>
      i === index ? !state : false
    );
    setButtonStates4(newButtonStates);
  };
  return (
    <>
      <Box className="moderate-work-history">
        <Grid className="work-history-dropdown">
          <Typography className="work-history-text">Work History</Typography>
          <Box style={{cursor:"pointer"}} onClick={handleExpandButton}>
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
            {moderateWorkHistoryData.map((data, index) => {
              return (
                <>
                  <Grid item xs={5.9} className="work-history-detail">
                    <Grid container className="work-history-container">
                      <Grid item xs={3}>
                        <Typography className="work-history-text">
                          Bio:
                        </Typography>
                      </Grid>
                      <Grid item xs={8.2}>
                        <Typography className="work-history-text">
                          {data.bio}
                        </Typography>
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
                    <Grid container className="work-history-container">
                      <Grid item xs={3}>
                        <Typography className="work-history-text">
                          Date of Birth:
                        </Typography>
                      </Grid>
                      <Grid item xs={8.2}>
                        <Typography className="work-history-text">
                          {data.date_of_birth}
                        </Typography>
                      </Grid>
                      <Grid item xs={0.8}>
                        <IconButton
                          sx={{
                            color: buttonStates2[index] ? "#fff" : "#37B498",
                            backgroundColor: buttonStates2[index]
                              ? "#37B498"
                              : "rgba(55, 180, 152, 0.12)",
                            height: "30px",
                            width: "30px",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: buttonStates2[index]
                                ? "#37B498"
                                : "rgba(55, 180, 152, 0.12)",
                            },
                          }}
                          onClick={() => handleButtonClicked2(index)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid container className="work-history-container work-history-padding">
                      <Grid item xs={3}>
                        <Typography className="work-history-text">
                          Domains:
                        </Typography>
                      </Grid>
                      <Grid item xs={8.2}>
                        <Grid className="work-history-domain">
                          {data.domains.map((domainData) => {
                            return (
                              <Typography className="work-history-domain-text">
                                {domainData}
                              </Typography>
                            );
                          })}
                        </Grid>
                      </Grid>
                      <Grid item xs={0.8}>
                        <IconButton
                          sx={{
                            color: buttonStates3[index] ? "#fff" : "#37B498",
                            backgroundColor: buttonStates3[index]
                              ? "#37B498"
                              : "rgba(55, 180, 152, 0.12)",
                            height: "30px",
                            width: "30px",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: buttonStates3[index]
                                ? "#37B498"
                                : "rgba(55, 180, 152, 0.12)",
                            },
                          }}
                          onClick={() => handleButtonClicked3(index)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid container className="work-history-container work-history-padding">
                      <Grid item xs={3}>
                        <Typography className="work-history-text">
                          Functions:
                        </Typography>
                      </Grid>
                      <Grid item xs={8.2}>
                        <Grid className="work-history-domain">
                          {data.functions.map((functionData) => {
                            return (
                              <Typography className="work-history-domain-text">
                                {functionData}
                              </Typography>
                            );
                          })}
                        </Grid>
                      </Grid>
                      <Grid item xs={0.8}>
                        <IconButton
                          sx={{
                            color: buttonStates4[index] ? "#fff" : "#37B498",
                            backgroundColor: buttonStates4[index]
                              ? "#37B498"
                              : "rgba(55, 180, 152, 0.12)",
                            height: "30px",
                            width: "30px",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: buttonStates4[index]
                                ? "#37B498"
                                : "rgba(55, 180, 152, 0.12)",
                            },
                          }}
                          onClick={() => handleButtonClicked4(index)}
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
export default ModerateWorkHistory;
