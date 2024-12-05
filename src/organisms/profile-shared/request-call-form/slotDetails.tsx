import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes, AppRoutes } from "../../../constants";
import { RawEvent } from "../../project-calendar/types";
import dayjs from "dayjs";
import CustomLoadingButton from "../../../atoms/form-molecules/CustomLoadingButton";

type Props = {
  projectId: number;
  expertId: number;
  clientId?: number;
};

export default function SlotDetails({ projectId, expertId }: Props) {
  function handleClick() {
    const url =
      AppRoutes.CALENDER +
      "?id=" +
      projectId +
      "&expertId=" +
      expertId +
      "&not_show_calls=1";
    window.open(url, "_blank");
  }

  const { data: ExpertPlanData, loading } = useFetch<RawEvent[]>(
    APIRoutes.plan +
      "?fk_project=" +
      projectId +
      "&type=Expert" +
      "&participant_id=" +
      expertId
  );

  const countOfSlots = useMemo(() => {
    if (!ExpertPlanData) return 0;
    return ExpertPlanData.filter((item) => dayjs().isBefore(item.start_time))
      .length;
  }, [JSON.stringify(ExpertPlanData)]);

  return (
    <Stack direction={"row"} justifyContent={"center"} gap={5}>
      <CustomLoadingButton
        disabled={countOfSlots === 0}
        loading={loading}
        onClick={handleClick}
        label={`Expert's available slots: ${countOfSlots}`}
      />
      <CustomLoadingButton
        loading={false}
        onClick={() =>
          window.open(AppRoutes.CALENDER + "?id=" + projectId, "_blank")
        }
        label={`Share Preferred Time Slots`}
      />
    </Stack>
  );
}
