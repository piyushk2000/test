import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { RequestServer } from '../../utils/services';
import { APIRoutes } from '../../constants';
import { useMyCalenderContext } from '../../pages/my-calendar/context';
import { ZoomEmailMap } from '../../constants/zoom-emails';
import { useFullPageLoading } from '../../atoms/full-page-loading/loadingContext';
import { useSnackbar } from 'notistack';

const HOUR_HEIGHT = 60;
const HEADER_HEIGHT = 40;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface Meeting {
  id: string;
  accountManager: string | null;
  topic: string;
  startTime: string;
  endTime: string;
}

interface UserMeetings {
  email: string;
  meetings: Meeting[];
}

const ZoomSlots: React.FC = () => {
  const {setLoading} = useFullPageLoading()
  const [meetings, setMeetings] = useState<UserMeetings[]>([]);
  const { date } = useMyCalenderContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchZoomSlots = async () => {
      setLoading(true);
      try {
        if (dayjs(date).isBefore(dayjs(), 'day')) {
          enqueueSnackbar("Past date selected: Zoom slots is only available for today and future dates.", {
            variant: "error",
          });
          setMeetings([])
          return;
        } else {
          const response = await RequestServer(
            `${APIRoutes.ZOOM_SLOTS}?start_date=${date?.format('YYYY-MM-DD')}`,
            'GET'
          );
          setMeetings(response as UserMeetings[]);
        }
      } catch (err) {
        console.error('Failed to fetch zoom slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchZoomSlots();
  }, [date]);

  const getEventStyle = (startTime: string, endTime: string, left: string, width: string) => {
    const start = dayjs(startTime);
    const duration = dayjs(endTime).diff(start, 'minute');
    const top = start.hour() * 60 + start.minute() + HEADER_HEIGHT;
    const height = (duration / 60) * HOUR_HEIGHT;

    return {
      position: 'absolute',
      top: `${top}px`,
      height: `${height}px`,
      left,
      width,
      backgroundColor: '#f3a332',
      borderRadius: '4px',
      padding: '4px',
      fontSize: '0.7rem',
      overflow: 'hidden',
      color: 'white',
      zIndex: 2,
      border: '1px solid #d68f44',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  const renderTimeColumn = () => (
    <Box sx={{ width: '80px', flexShrink: 0, borderRight: '1px solid #ccc', position: 'sticky', left: 0, zIndex: 5, backgroundColor: 'white' }}>
      <Box sx={{ height: `${HEADER_HEIGHT}px`, borderBottom: '1px solid #ccc', fontSize: '0.5rem', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 4, backgroundColor: 'white' }}>
        Time/Accounts
      </Box>
      {HOURS.map((hour) => (
        <Box key={hour} sx={{ height: `${HOUR_HEIGHT}px`, borderBottom: '1px solid #eee', fontSize: '0.7rem', padding: '2px' }}>
          {`${hour.toString().padStart(2, '0')}:00`}
        </Box>
      ))}
    </Box>
  );

  const renderMeeting = (meeting: Meeting, left: string, width: string) => (
    <Tooltip title={meeting?.topic} leaveDelay={0} enterDelay={0} leaveTouchDelay={1000} >
      <Box key={meeting.id} sx={getEventStyle(meeting.startTime, meeting.endTime, left, width)}>
        <Typography variant="caption" sx={{ fontSize: 'inherit', fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
          {dayjs(meeting.startTime).format('HH:mm')} - {dayjs(meeting.endTime).format('HH:mm')}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
          {meeting.accountManager ? `AM - ${meeting.accountManager}` : meeting.topic}
        </Typography>
      </Box>
    </Tooltip>
  );

  const renderUserColumn = (user: UserMeetings) => {
    const sortedMeetings = user.meetings.sort((a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf());
    const overlappingGroups: Meeting[][] = [];

    sortedMeetings.forEach((meeting) => {
      const overlappingGroup = overlappingGroups.find((group) =>
        group.some((m) => dayjs(meeting.startTime).isBefore(dayjs(m.endTime)) && dayjs(m.startTime).isBefore(dayjs(meeting.endTime)))
      );

      if (overlappingGroup) {
        overlappingGroup.push(meeting);
      } else {
        overlappingGroups.push([meeting]);
      }
    });

    return (
      <Box key={user.email} sx={{ width: '150px', position: 'relative', borderRight: '1px solid #ccc', flexShrink: 0 }}>
        <Box sx={{ height: `${HEADER_HEIGHT}px`, borderBottom: '1px solid #ccc', fontSize: '0.7rem', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 3, backgroundColor: 'white' }}>
          {ZoomEmailMap?.[user.email]}
        </Box>
        {HOURS.map((hour) => (
          <Box key={hour} sx={{ position: 'absolute', top: `${hour * HOUR_HEIGHT + HEADER_HEIGHT}px`, left: 0, right: 0, height: '1px', backgroundColor: '#eee', zIndex: 1 }} />
        ))}
        {overlappingGroups.map((group, groupIndex) =>
          group.map((meeting, index) => {
            const width = `${100 / group.length}%`;
            const left = `${(index * 100) / group.length}%`;
            return renderMeeting(meeting, left, width);
          })
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', height: '76vh' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', minWidth: 'fit-content' }}>
          {renderTimeColumn()}
          {meetings.map(renderUserColumn)}
        </Box>
      </Box>
    </Box>
  );
};

export default ZoomSlots;