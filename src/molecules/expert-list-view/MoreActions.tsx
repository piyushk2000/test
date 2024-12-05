import { useState } from "react";
import { Box, Typography, Stack, Checkbox, Grid, Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import More from "../../assets/images/more.png";
import { checkBoxStyle } from "./moreActionStyle";
import { moreActionsData } from "./helper";
import {
  actionsAllBtnContainer,
  individualBtnContainer,
  resetBtnStyle,
} from "./selectExpertStyle";

export const MoreActions = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectAllClick = () => {
    if (selectedCheckbox.length === moreActionsData.length) {
      setSelectedCheckbox([]);
    } else {
      setSelectedCheckbox(moreActionsData.map((_, index) => index));
    }
  };

  const handleCheckboxClick = (index: number) => {
    if (selectedCheckbox.includes(index)) {
      setSelectedCheckbox(
        selectedCheckbox.filter((rowIndex) => rowIndex !== index)
      );
    } else {
      setSelectedCheckbox([...selectedCheckbox, index]);
    }
  };

  const handleClearClick = () => {
    setSelectedCheckbox([]);
  };

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        textAlign: "center",
      }}
    >
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "11px",
          color: "#252B3B",
          opacity: "0.72",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
        <img src={More} height={"15px"} alt="more" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ marginTop: "0px" }}
        PaperProps={{
          sx: {
            width: "310px",
          },
        }}
      >
        <Box
          sx={{
            padding: "20px 0 20px 15px",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          <Typography
            fontSize={"12px"}
            marginBottom={"8px"}
            color={"#252B3B"}
            fontWeight={"600"}
            style={{ opacity: "0.72" }}
          >
            Display Column
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"0.5rem"}
            marginBottom={"8px"}
          >
            <Checkbox
              color="default"
              size="small"
              sx={checkBoxStyle}
              checked={selectedCheckbox.length === moreActionsData.length}
              onChange={handleSelectAllClick}
            />
            <Typography fontSize={"12px"} color={"#482F2F"}>
              All
            </Typography>
          </Stack>
          <div style={actionsAllBtnContainer}>
            {moreActionsData.map((data, index) => {
              return (
                <Grid xs={5} spacing={2} sx={individualBtnContainer}>
                  <Checkbox
                    color="default"
                    size="small"
                    sx={checkBoxStyle}
                    checked={selectedCheckbox.includes(index)}
                    onChange={() => handleCheckboxClick(index)}
                  />
                  <Typography fontSize={"12px"} color={"#482F2F"}>
                    {data}
                  </Typography>
                </Grid>
              );
            })}
          </div>
          <Grid container xs={10} margin={"auto"}>
            <Button sx={resetBtnStyle} onClick={handleClearClick}>
              Reset
            </Button>
          </Grid>
        </Box>
      </Popover>
    </div>
  );
};
