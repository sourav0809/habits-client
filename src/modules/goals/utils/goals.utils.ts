/** Format ml for display (e.g. 1500 → "1.5L", 250 → "250ml") */
export function formatMl(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`;
  }
  return `${ml}ml`;
}
