/**
 * Moment format strings used across the app (aligns with backend moment usage).
 */
export const timeFormats = {
  /** YYYY-MM-DD */
  DATE_ONLY: "YYYY-MM-DD",
  /** 24h with seconds */
  DATETIME_24_WITH_SECONDS: "YYYY-MM-DD HH:mm:ss",
  /** Short label: Mon, Jan 1 */
  DISPLAY_LABEL: "ddd, MMM D",
  /** Table: Jan 1, 2025 */
  DISPLAY_TABLE: "MMM D, YYYY",
  /** Date-time: Jan 1, 2025, 2:30 PM */
  DISPLAY_DATETIME: "MMM D, YYYY, h:mm A",
  /** Time only HH:mm */
  TIME_24: "HH:mm",
  /** Chart axis: short weekday (Mon) */
  CHART_DAY: "ddd",
  /** Chart label: MMM d */
  CHART_LABEL: "MMM D",
} as const;

/**
 * Moment unitOfTime values for startOf/endOf/diff (aligns with backend).
 */
export const timeUnits = {
  DAY: "day" as const,
  DAYS: "days" as const,
  MINUTES: "minutes" as const,
  HOUR: "hour" as const,
  HOURS: "hours" as const,
  WEEK: "week" as const,
  WEEKS: "weeks" as const,
  MONTH: "month" as const,
  MONTHS: "months" as const,
  YEAR: "year" as const,
  YEARS: "years" as const,
} as const;
