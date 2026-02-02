export { getCurrentDateAsDate } from "@/utils/time.utils";
export {
  getTodayISO,
  formatDateLabel,
  formatTableDate,
  formatDateTime,
  getDatePartFromDateTime,
  buildDateAndTimeISO,
  getCurrentTimeString,
  getTimeStringFromISO,
  parseDateTimeToDate,
  toDate,
  toISO,
} from "./date.utils";
export {
  getConsumptionStats,
  getConsumptionFoodName,
  getConsumptionChartData,
} from "./consumption.utils";
export type {
  ConsumptionStats,
  ChartDataPoint,
} from "./consumption.utils";
