/** Today as ISO date string (YYYY-MM-DD) */
export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Format ISO date for display (e.g. "Mon, Jan 1") */
export function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Format ISO date for table (e.g. "Jan 1, 2025") */
export function formatTableDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** ISO date string to Date (noon UTC to avoid timezone shift) */
export function toDate(iso: string): Date {
  return new Date(iso + "T12:00:00");
}

/** Date to ISO date string (YYYY-MM-DD) */
export function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Format ISO date-time for display (e.g. "Jan 1, 2025, 2:30 PM") */
export function formatDateTime(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Extract date part YYYY-MM-DD from ISO date-time string */
export function getDatePartFromDateTime(isoDateTime: string): string {
  return isoDateTime.slice(0, 10);
}

/** Build full ISO 8601 string from date (date-only) and time string "HH:mm" (local time) */
export function buildDateAndTimeISO(date: Date, time: string): string {
  const [hour = 0, minute = 0] = time.split(":").map(Number);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);
  return d.toISOString();
}

/** Get current time as "HH:mm" in local time */
export function getCurrentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}
