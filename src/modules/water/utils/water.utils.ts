import moment from "moment-timezone";
import {
  DEFAULT_TIMEZONE,
  formatDateLabel as formatDateLabelTz,
  formatDateTime as formatDateTimeTz,
  getDatePartFromDateTime as getDatePartFromDateTimeTz,
  getDaysInRange,
  getTodayISO as getTodayISOTz,
  toDate as toDateTz,
  toISO as toISOTz,
} from "@/utils/time.utils";
import type { WaterLog } from "../types";

/** Format for HTML datetime-local input (YYYY-MM-DDTHH:mm). */
const DATETIME_LOCAL_FORMAT = "YYYY-MM-DDTHH:mm";

/** Current date and time as datetime-local value in project timezone. */
export function getNowDateTimeLocal(): string {
  return moment().tz(DEFAULT_TIMEZONE).format(DATETIME_LOCAL_FORMAT);
}

/** Convert API ISO date-time to datetime-local input value. */
export function isoToDateTimeLocal(isoDateTime: string): string {
  return moment(isoDateTime).tz(DEFAULT_TIMEZONE).format(DATETIME_LOCAL_FORMAT);
}

/** Convert datetime-local value to ISO string for API. */
export function dateTimeLocalToISO(local: string): string {
  return new Date(local).toISOString();
}

/** Format ml for display (e.g. 1500 → "1.5L", 250 → "250ml") */
export function formatMl(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`;
  }
  return `${ml}ml`;
}

/** Today as ISO date string (YYYY-MM-DD) in project timezone. */
export function getTodayISO(): string {
  return getTodayISOTz();
}

/** Date to ISO date string (YYYY-MM-DD). */
export function toISO(date: Date): string {
  return toISOTz(date);
}

/** Format ISO date for display (e.g. "Mon, Jan 1"). */
export function formatDateLabel(iso: string): string {
  return formatDateLabelTz(iso);
}

/** Format ISO date-time for display (e.g. "Jan 1, 2025, 2:30 PM"). */
export function formatDateTime(isoDateTime: string): string {
  return formatDateTimeTz(isoDateTime);
}

/** Extract date part YYYY-MM-DD from ISO date-time string. */
export function getDatePartFromDateTime(isoDateTime: string): string {
  return getDatePartFromDateTimeTz(isoDateTime);
}

/** ISO date string to Date (start of day in project timezone). */
export function toDate(iso: string): Date {
  return toDateTz(iso);
}

export interface WaterStats {
  totalMl: number;
  logCount: number;
  avgPerLog: number;
}

/** Compute stats from water logs */
export function getWaterStats(logs: WaterLog[]): WaterStats {
  const totalMl = logs.reduce((s, l) => s + l.amountMl, 0);
  const logCount = logs.length;
  const avgPerLog = logCount > 0 ? Math.round(totalMl / logCount) : 0;
  return { totalMl, logCount, avgPerLog };
}

export interface WaterChartDataPoint {
  date: string;
  label: string;
  amount: number;
  goal: number;
}

/** Build chart data from logs and date range (daily totals + goal) */
export function getWaterChartData(
  logs: WaterLog[],
  dateFrom: string,
  dateTo: string,
  goalMl: number,
  formatLabel: (iso: string) => string
): WaterChartDataPoint[] {
  const days = getDaysInRange(dateFrom, dateTo);
  const byDay: Record<string, number> = {};
  days.forEach((d) => {
    byDay[d] = 0;
  });
  logs.forEach((l) => {
    const day = getDatePartFromDateTime(l.dateAndTime);
    if (day in byDay) {
      byDay[day] += l.amountMl;
    }
  });
  return Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, amount]) => ({
      date,
      label: formatLabel(date),
      amount,
      goal: goalMl,
    }));
}
