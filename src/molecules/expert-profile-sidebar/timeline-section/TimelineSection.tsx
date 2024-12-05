import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";

import "./timeline-section.scss";
import { AttachmentIcons } from "../../../atoms/attachment-icons/attachment-icon";
import CloseIcon from "../../../assets/images/expert/close.png";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import timelineTypes from "./helper";
import FilterListIcon from "@mui/icons-material/FilterList";
import { LocalDayjs } from "../../../utils/timezoneService";
import { timelineAction } from "../../../utils/data/dataTimelineExpert";

type Props = {
  timelineData: any;
  closeTimeline: () => void;
  openTimelineFilters: () => void;
  isFilterAdded: boolean;
};

const TimelineSection = ({
  timelineData,
  closeTimeline,
  openTimelineFilters,
  isFilterAdded,
}: Props) => {
  const loggedInName = localStorage.getItem("name");

  return (
    <Box className="timeline-section">
      <div className="timeline-header">
        <div className="timeline-heading">
          <h2>Timeline</h2>
          <Tooltip title="Filters" arrow>
            <IconButton
              onClick={openTimelineFilters}
              sx={{
                backgroundColor: isFilterAdded ? "#18a848" : "white",
                padding: "2px",
                "&:hover, &:focus": {
                  backgroundColor: isFilterAdded ? "#18a848" : "white",
                },
              }}
            >
              <FilterListIcon
                sx={{ color: isFilterAdded ? "white" : "initial" }}
              />
            </IconButton>
          </Tooltip>
        </div>

        <AttachmentIcons
          isIcon={true}
          title="Close"
          icon={CloseIcon}
          handleClick={closeTimeline}
        />
      </div>
      {timelineData?.data ? (
        <div className="timeline">
          {timelineData?.data?.length !== 0 ? (
            timelineData?.data?.map((data: timelineTypes, index: any) => {
              return (
                <div key={data?.action + index} className="timeline-item">
                  <TimelineSeparator className="timeline-seperator">
                    <TimelineDot className="timeline-dot" />
                    {index !== timelineData?.data?.length - 1 && (
                      <TimelineConnector className="timeline-connector" />
                    )}
                  </TimelineSeparator>
                  <TimelineContent className="timeline-content">
                    <p>
                      {data?.timeStamp &&
                        LocalDayjs(data.timeStamp).format("H:mmA MMM D, YYYY")}
                    </p>
                    <p>
                      <span>
                        {data?.actor_detail?.name === loggedInName
                          ? "You"
                          : data?.actor_detail?.name}
                      </span>{" "}
                      {timelineAction[`${data?.action}`] ||
                        data?.action}
                    </p>
                  </TimelineContent>
                </div>
              );
            })
          ) : (
            <p className="no-timeline-para">There is no timeline to show</p>
          )}
        </div>
      ) : (
        <Grid container spacing={"0"}>
          {[1, 2, 3, 4, 5].map(() => (
            <Grid item xs={12}>
              <Skeleton height={100} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TimelineSection;
