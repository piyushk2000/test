import { Box, Grid, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import "./moderate-award.scss";
import ExpandLess from "../../../assets/images/client/down.png";
import ExpandMore from "../../../assets/images/client/uparrow.png";
import CheckIcon from "@mui/icons-material/Check";
import { awardAndRecognitionData } from "./helper";

const ModerateAward = () => {
  const [collapse, setCollapse] = useState(true);
  const [buttonStates1, setButtonStates1] = useState(
    new Array(awardAndRecognitionData.length).fill(false)
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
      <Box className="moderate-award">
        <Grid className="award-dropdown">
          <Typography className="award-text">Award & Recognition</Typography>
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
            {awardAndRecognitionData.map((data, index) => {
              return (
                <>
                  <Grid item xs={5.9} className="award-detail">
                    <Grid container className="award-container">
                      <Grid item xs={3}>
                        <Typography className="award-text">Bio:</Typography>
                      </Grid>
                      <Grid item xs={8.2}>
                        <Typography className="award-text">
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
export default ModerateAward;
