import moment, { type Moment, type unitOfTime } from "moment-timezone";
import { timeFormats, timeUnits } from "@/constants";

export const DEFAULT_TIMEZONE = "Asia/Kolkata";

export type DateType = Date | Moment | string;

/**
 * Get the current date and time.
 */
export const getCurrentDateAndTime = (
  format?: null | string
): Date | Moment | string => {
  const currentMoment = moment().tz(DEFAULT_TIMEZONE);
  return format ? currentMoment.format(format) : currentMoment;
};

/**
 * Get the current date.
 */
export const getCurrentDate = (
  format?: null | string
): Moment | string => {
  const currentMoment = moment()
    .tz(DEFAULT_TIMEZONE)
    .startOf(timeUnits.DAY as unitOfTime.StartOf);
  return format ? currentMoment.format(format) : currentMoment;
};

/**
 * Format a time to a moment object or formatted string.
 */
export const formatTimeToMoment = (
  date: DateType,
  format?: string,
  timezone: string = DEFAULT_TIMEZONE
): Date | Moment | null | string => {
  if (!date) return null;
  if (format) {
    return moment(date).tz(timezone).format(format);
  }
  return moment(date).tz(timezone);
};

/**
 * Get the start date (start of day).
 */
export const getStartDate = (
  date?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): Moment => {
  if (date) {
    return moment(date).tz(timezone).startOf(timeUnits.DAY as unitOfTime.StartOf);
  }
  return moment()
    .tz(timezone)
    .startOf(timeUnits.DAY as unitOfTime.StartOf);
};

/**
 * Get the end date (end of day).
 */
export const getEndDate = (
  date?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): Moment => {
  if (date) {
    return moment(date).tz(timezone).endOf(timeUnits.DAY as unitOfTime.StartOf);
  }
  return moment().tz(timezone).endOf(timeUnits.DAY as unitOfTime.StartOf);
};

/**
 * Get start of day as a native Date (for DB queries, comparisons).
 */
export const getStartOfDayAsDate = (
  date?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): Date => getStartDate(date, timezone).toDate();

/**
 * Get end of day as a native Date (for date-range queries).
 */
export const getEndOfDayAsDate = (
  date?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): Date => getEndDate(date, timezone).toDate();

/**
 * Get the yesterday date.
 */
export const getYesterday = (
  toDate: boolean,
  timezone: string = DEFAULT_TIMEZONE
): Moment => {
  const currentMoment = moment()
    .tz(timezone)
    .subtract(1, timeUnits.DAYS as unitOfTime.DurationConstructor);
  return toDate
    ? currentMoment.endOf(timeUnits.DAY as unitOfTime.StartOf)
    : currentMoment;
};

/**
 * Get the tomorrow date.
 */
export const getTomorrow = (
  toDate?: boolean,
  timezone: string = DEFAULT_TIMEZONE
): Moment => {
  const currentMoment = moment()
    .tz(timezone)
    .add(1, timeUnits.DAYS as unitOfTime.DurationConstructor);
  return toDate
    ? currentMoment.endOf(timeUnits.DAY as unitOfTime.StartOf)
    : currentMoment;
};

/**
 * Calculate the time difference between two dates.
 */
export const calculateTimeDifference = (
  date1: DateType,
  unit: unitOfTime.DurationAs = timeUnits.DAYS as unitOfTime.DurationAs,
  primary?: boolean,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): number => {
  if (date2) {
    return moment(date1).diff(date2, unit);
  }
  if (primary) {
    return moment.tz(date1 as string, timezone).diff(moment.tz(timezone), unit);
  }
  return moment.tz(timezone).diff(moment.tz(date1 as string, timezone), unit);
};

/**
 * Check if a date is before another date.
 */
export const checkIsBefore = (
  date1: DateType,
  unit: unitOfTime.DurationAs = timeUnits.MINUTES as unitOfTime.DurationAs,
  primary?: boolean,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): boolean => {
  if (date2) {
    return moment(date1).tz(timezone).isBefore(moment(date2).tz(timezone), unit);
  }
  if (primary) {
    return moment(date1)
      .tz(timezone)
      .isBefore(getCurrentDateAndTime() as Moment, unit);
  }
  return moment().tz(timezone).isBefore(date1, unit);
};

/**
 * Check if a date is the same or before another date.
 */
export const checkIsSameOrBefore = (
  date1: DateType,
  unit: unitOfTime.DurationAs = timeUnits.DAYS as unitOfTime.DurationAs,
  primary?: boolean,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): boolean => {
  if (date2) {
    return moment(date1)
      .tz(timezone)
      .isSameOrBefore(moment(date2).tz(timezone), unit);
  }
  if (primary) {
    return moment(date1)
      .tz(timezone)
      .isSameOrBefore(getCurrentDateAndTime() as Moment, unit);
  }
  return moment().tz(timezone).isSameOrBefore(date1, unit);
};

/**
 * Check if a date is after another date.
 */
export const checkIsAfter = (
  unit: unitOfTime.DurationAs = timeUnits.MINUTES as unitOfTime.DurationAs,
  primary?: boolean,
  date1?: DateType,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): boolean => {
  date1 ??= getCurrentDateAndTime() as DateType;
  if (date2) {
    return moment(date1).tz(timezone).isAfter(moment(date2).tz(timezone), unit);
  }
  if (primary) {
    return moment(date1).tz(timezone).isAfter(moment(), unit);
  }
  return moment().tz(timezone).isAfter(date1, unit);
};

/**
 * Check if a date is the same or after another date.
 */
export const checkIsSameOrAfter = (
  date1: DateType,
  unit: unitOfTime.DurationAs = timeUnits.DAYS as unitOfTime.DurationAs,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): boolean => {
  if (date2) {
    return moment(date1)
      .tz(timezone)
      .isSameOrAfter(moment(date2).tz(timezone), unit);
  }
  return moment().tz(timezone).isSameOrAfter(date1, unit);
};

/**
 * Get the time difference between two dates.
 */
export const getTimeDifference = (
  date1: DateType,
  unit: unitOfTime.DurationAs = timeUnits.DAYS as unitOfTime.DurationAs,
  date2?: DateType,
  timezone: string = DEFAULT_TIMEZONE
): number => {
  if (date2) {
    return moment(date1).tz(timezone).diff(date2, unit);
  }
  return moment().tz(timezone).diff(date1, unit);
};

/**
 * Convert a time to a string.
 */
export const convertTimeToString = (
  date?: DateType,
  format: string = timeFormats.DATETIME_24_WITH_SECONDS,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  return moment
    .tz((date ?? getCurrentDateAndTime()) as string, timezone)
    .format(format)
    .toString();
};

/**
 * Add time to a date.
 */
export const addTimeToDate = (
  amount: number | string,
  unit: unitOfTime.DurationAs,
  date?: DateType,
  startDate?: boolean,
  endDate?: boolean,
  format?: null | string,
  timezone: string = DEFAULT_TIMEZONE
): Moment | string => {
  const currentMoment = moment
    .tz((date ?? getCurrentDateAndTime()) as string, timezone)
    .add(amount, unit);
  if (startDate) {
    return currentMoment.startOf(timeUnits.DAY as unitOfTime.StartOf);
  }
  if (endDate) {
    return currentMoment.endOf(timeUnits.DAY as unitOfTime.StartOf);
  }
  return format ? currentMoment.format(format) : currentMoment;
};

/**
 * Get the past time (subtract amount of unit from date or now).
 */
export const getPastTime = (
  amount: number,
  unit: unitOfTime.DurationAs,
  date?: DateType,
  format?: string,
  timezone: string = DEFAULT_TIMEZONE
): Moment | string => {
  let currentMoment: Moment;
  if (date) {
    currentMoment = moment(date).tz(timezone).subtract(amount, unit);
  } else {
    currentMoment = moment().tz(timezone).subtract(amount, unit);
  }
  return format ? currentMoment.format(format) : currentMoment;
};

/**
 * Get the current year.
 */
export const getCurrentYear = (
  timezone: string = DEFAULT_TIMEZONE
): number => moment().tz(timezone).year();

/**
 * Check if a date is valid (moment considers it valid).
 */
export const isMomentObject = (date: DateType): boolean =>
  moment(date).isValid();

/**
 * Check if two dates are the same.
 */
export const isSameTime = (date1: DateType, date2: DateType): boolean =>
  moment(date1).isSame(moment(date2));

/**
 * Check if two dates are the same for the given comparison unit.
 */
export const checkIfSameOrNot = (
  date1: DateType,
  date2: DateType,
  comparisonUnit: unitOfTime.DurationAs | unitOfTime.StartOf
): boolean => {
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);
  return momentDate1.isSame(momentDate2, comparisonUnit);
};

/**
 * Convert milliseconds (unix) to moment/string in timezone.
 */
export const convertMillisecondsToTime = (
  milliseconds: number | string,
  timeZone: string = DEFAULT_TIMEZONE,
  format?: null | string
): Moment | string => {
  const currentMoment = moment.unix(Number(milliseconds)).tz(timeZone);
  if (format) {
    return currentMoment.format(format);
  }
  return currentMoment;
};

/**
 * Create academic year dates (for reference; can extend).
 */
export const createAcademicYearDates = (
  data: {
    year?: number;
    startDate?: string;
    endDate?: string;
    name?: string;
  },
  timezone: string = DEFAULT_TIMEZONE
): { startDate: Date; endDate: Date; name: string } => {
  let startDate: Moment;
  let endDate: Moment;
  let name: string;

  if (data.year !== undefined) {
    const year = data.year;
    startDate = moment.tz([year, 5, 1], timezone);
    endDate = moment.tz([year + 1, 4, 31], timezone);
    name = `Jun${year}-May${year + 1}`;
  } else if (data.startDate && data.endDate) {
    startDate = moment.tz(data.startDate, timezone);
    endDate = moment.tz(data.endDate, timezone);
    name = data.name ?? `${startDate.year()}-${endDate.year()}`;
  } else {
    throw new Error(
      "Either year or both startDate and endDate must be provided"
    );
  }

  if (startDate.isSameOrAfter(endDate)) {
    throw new Error("Start date must be before end date");
  }

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
    name,
  };
};

// ---------------------------------------------------------------------------
// App helpers: single source for date/time (timezone-safe, backend-aligned)
// ---------------------------------------------------------------------------

/** Today as ISO date string (YYYY-MM-DD) in project timezone. */
export const getTodayISO = (
  timezone: string = DEFAULT_TIMEZONE
): string =>
  moment().tz(timezone).startOf(timeUnits.DAY as unitOfTime.StartOf).format(timeFormats.DATE_ONLY);

/** Date to ISO date string (YYYY-MM-DD). */
export const toISO = (
  date: DateType,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  (formatTimeToMoment(date, timeFormats.DATE_ONLY, timezone) as string) ?? "";

/** Format ISO date for display (e.g. "Mon, Jan 1"). */
export const formatDateLabel = (
  iso: string,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(iso, timeFormats.DISPLAY_LABEL, timezone);

/** Format ISO date for table (e.g. "Jan 1, 2025"). */
export const formatTableDate = (
  iso: string,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(iso, timeFormats.DISPLAY_TABLE, timezone);

/** Format ISO date-time for display (e.g. "Jan 1, 2025, 2:30 PM"). */
export const formatDateTime = (
  isoDateTime: string,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(isoDateTime, timeFormats.DISPLAY_DATETIME, timezone);

/** Extract date part YYYY-MM-DD from ISO date-time string. */
export const getDatePartFromDateTime = (isoDateTime: string): string =>
  isoDateTime.slice(0, 10);

/** ISO date string to Date (start of day in project timezone). */
export const toDate = (
  iso: string,
  timezone: string = DEFAULT_TIMEZONE
): Date => getStartDate(iso, timezone).toDate();

/**
 * List of ISO date strings (YYYY-MM-DD) from dateFrom through dateTo inclusive.
 */
export const getDaysInRange = (
  dateFrom: string,
  dateTo: string,
  timezone: string = DEFAULT_TIMEZONE
): string[] => {
  const start = getStartDate(dateFrom, timezone);
  const end = getStartDate(dateTo, timezone);
  if (start.isAfter(end)) return [];
  const days: string[] = [];
  let cur = start.clone();
  while (cur.isSameOrBefore(end, "day")) {
    days.push(cur.format(timeFormats.DATE_ONLY));
    cur = cur.add(1, timeUnits.DAYS as unitOfTime.DurationConstructor);
  }
  return days;
};

/** Current time as "HH:mm" in project timezone. */
export const getCurrentTimeString = (
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(
    getCurrentDateAndTime() as string,
    timeFormats.TIME_24,
    timezone
  );

/** Build timezone-aware UTC ISO string from date (date-only) and time "HH:mm" in project timezone. */
export const buildDateAndTimeISO = (
  date: DateType,
  time: string,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const [hour = 0, minute = 0] = time.split(":").map(Number);
  const m = moment(date).tz(timezone).hour(hour).minute(minute).second(0).millisecond(0);
  return m.toISOString();
};

/** Get time string "HH:mm" from ISO date-time in project timezone. */
export const getTimeStringFromISO = (
  isoDateTime: string,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(isoDateTime, timeFormats.TIME_24, timezone);

/** Parse ISO date-time to Date (date-only for picker, start of day in timezone). */
export const parseDateTimeToDate = (
  isoDateTime: string,
  timezone: string = DEFAULT_TIMEZONE
): Date => getStartDate(isoDateTime, timezone).toDate();

/** Current date as native Date (start of today in project timezone). */
export const getCurrentDateAsDate = (
  timezone: string = DEFAULT_TIMEZONE
): Date => getStartDate(undefined, timezone).toDate();

/** Subtract days from today; returns Moment (for compatibility with date-fns subDays). */
export const subDaysFromToday = (
  days: number,
  timezone: string = DEFAULT_TIMEZONE
): Moment =>
  getPastTime(
    days,
    timeUnits.DAYS as unitOfTime.DurationAs,
    undefined,
    undefined,
    timezone
  ) as Moment;

/** Format for chart axis (short weekday e.g. Mon). */
export const formatChartDay = (
  date: DateType,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(date, timeFormats.CHART_DAY, timezone);

/** Format for chart label (e.g. Jan 1). */
export const formatChartLabel = (
  date: DateType,
  timezone: string = DEFAULT_TIMEZONE
): string =>
  convertTimeToString(date, timeFormats.CHART_LABEL, timezone);
