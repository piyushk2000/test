import {
  Box,
  CircularProgress,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { CallStats, getCallsData } from "./helper";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constants";

type Props = {
  children: React.ReactElement<any, any>;
  expertId: number;
  expertName: string;
};

const CustomTypography = styled(Typography)({
  fontSize: "14px",
  "& .green": {
    color: "#19AD4B",
  },
  "& .red": {
    color: "#AD4719",
  },
});

export default function ExpertCallDetailTooltip({ children, expertId, expertName }: Props) {
  const [callsData, setCallsData] = useState<CallStats>(null);
  const { value: loading, setValue: setLoading } = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  async function getData() {
    try {
      setLoading(true);
      const data = await getCallsData(expertId);
      setCallsData(data);
      setLoading(false);
    } catch (e: any) {
      enqueueSnackbar(e.message);
      setLoading(false);
      setCallsData(null);
    }
  }

  return (
    <Tooltip
      arrow
      onOpen={getData}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#fff",
            color: "rgba(37, 43, 59, 1)",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            border: "1px solid rgba(97, 97, 97, 0.3)",
            "& .MuiTooltip-arrow": {
              color: "rgba(97, 97, 97, 0.4)",
            },
          },
        },
      }}
      title={
        <Box sx={{ px: 1, py: 0.5 }}>
          {loading ? (
            <CircularProgress size={16} sx={{ color: "#FBB017" }} />
          ) : (
            <Stack direction={"row"} spacing={2}>
              <NumericData
                label="Call"
                value={callsData?.callCount}
                valueClass="green"
                isLink
                expert_id={expertId}
                expert_name={expertName}
              />
              <NumericData
                label="Project"
                value={callsData?.projectCount}
                isLink={callsData?.projectCount && callsData?.projectCount > 0 ? true : false}
                link={AppRoutes.PROJECTS + "/all" + "?page=1" + "&projectIds=" + callsData?.projects}
                valueClass="green"
              />
              <NumericData
                label="Bad Call"
                value={callsData?.badCallCount}
                valueClass="red"
              />
            </Stack>
          )}
        </Box>
      }
    >
      {children}
    </Tooltip>
  );
}

export function NumericData({
  label,
  value = 0,
  valueClass,
  isLink,
  expert_id,
  expert_name,
  link,
  sx = {},
  valueStyle = {},
  textDecoration = 'underline',
}: {
  label?: string;
  value?: number;
  valueClass: string;
  isLink?: boolean;
  expert_id?: number;
  expert_name?: string;
  link?: string;
  sx?: SxProps<Theme>;
  valueStyle?: React.CSSProperties;
  textDecoration?: string;
}) {
  const linkUrl = link || AppRoutes.CALLS + "?expert_id=" + expert_id + "&expert_name=" + expert_name;


  return (
    <>
      {isLink ?
        <CustomTypography sx={sx}>
          <Link to={linkUrl} target="_blank" rel="noopener noreferrer">
            <span style={{ textDecoration: textDecoration, color: valueClass }}>
              {label && `${label}${value > 1 ? "s: " : ": "}`}
              <span style={{ ...valueStyle }}>{value}</span>
            </span>
          </Link>

        </CustomTypography> :
        <CustomTypography sx={sx}>
          {label && `${label}${value > 1 ? "s: " : ": "}`}
          <span style={{ ...valueStyle }} className={valueClass}>{value}</span>
        </CustomTypography>
      }
    </>

  );
}