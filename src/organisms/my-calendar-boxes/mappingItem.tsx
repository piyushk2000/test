import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MyCall } from "../my-calendar/types";
import dayjs, { Dayjs } from "dayjs";
import { statusDotStyle } from "../my-calendar/style";
import { getCallColor, getTime } from "./helper";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  textColor: string;
  noBorder?: boolean;
  callData: MyCall;
  onClick: () => void;
};

const MappingItems = (props: Props) => {
  const { callData, textColor: COLOR, onClick } = props;
  const { start_time, end_time } = getTime(callData);
  const { status: callStatus, color: callColor } = getCallColor(callData);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        width: "100%",
        borderBottom: !props.noBorder ? "1px dashed " + COLOR : undefined,
        padding: "10px 0",
        cursor: "pointer",
        flexWrap: "wrap",
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: COLOR,
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        {callData.fk_expert_value?.name}
      </Typography>
      <Typography
        sx={{
          color: COLOR,
          fontWeight: "600",
          fontSize: "10px",
        }}
      >
        {/* {`${start_time.format("hh:mma")} - ${end_time.format("hh:mma")} ${callData.fk_expert_value.name} `} */}
        {start_time.format("h:mma")} - {end_time.format("h:mma")} (IST)
      </Typography>
      <BoxFlex sx={{ gap: "0.5rem" }}>
        <Typography
          sx={{
            color: COLOR,
            fontWeight: "600",
            fontSize: "10px",
          }}
        >
          {callData.fk_project_value?.account_manager_value.name}
        </Typography>
        <Tooltip title={callStatus} arrow>
          <Box component={"span"} sx={statusDotStyle(callColor || "")}></Box>
        </Tooltip>
      </BoxFlex>

    </Box>
  );
};

export default MappingItems;
