import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs_plugin_duration from "dayjs/plugin/duration";
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore)
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayjs_plugin_duration)

export default dayjs;

export function getTimeAgo(dateString: string): string {
  const date = dayjs(dateString);
  const now = dayjs();

  const diffSeconds = now.diff(date, 'second');
  const diffMinutes = now.diff(date, 'minute');
  const diffHours = now.diff(date, 'hour');
  const diffDays = now.diff(date, 'day');
  const diffWeeks = now.diff(date, 'week');
  const diffMonths = now.diff(date, 'month');
  const diffYears = now.diff(date, 'year');

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

export const LocalDayjs = (utcDateTime?: string | Date) => {
  const timezone = getUserTimezone();
  let time = utcDateTime;
  if (!utcDateTime) {
    time = new Date();
  }
  return dayjs.tz(time || null, timezone);
};

const getUserTimezone = () => {
  const guessedTimeZone = dayjs.tz.guess();
  if (typeof window === "undefined") {
    return guessedTimeZone;
  }

  try {
    const item = window.localStorage.getItem("timezone");
    return item ? (JSON.parse(item) as string) : guessedTimeZone;
  } catch (error) {
    console.warn(`Error reading timezone:`, error);
    return guessedTimeZone;
  }
};

export const getISTDateTime = (date?: dayjs.ConfigType): string => {
  return dayjs.tz(date, "Asia/Kolkata").format();
};

export const LocalDayjsFromIST = (utcDateTime?: string | Date) => {
  const timezone = getUserTimezone();
  return dayjs(utcDateTime).tz(timezone, false);
};
