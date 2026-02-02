import type { Moment } from "moment-timezone";
import { getPastTime, toISO } from "@/utils/time.utils";
import { timeUnits } from "@/constants";
import {
  DEFAULT_CALORIE_GOAL,
  DEFAULT_WATER_GOAL_ML,
  DAYS_1_MONTH,
  DAYS_1_WEEK,
  DAYS_3_MONTHS,
} from "../constants";
import type { GoalSettings } from "../types";

/** Format ml for display (e.g. 1500 → "1.5L", 250 → "250ml") */
export function formatMl(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`;
  }
  return `${ml}ml`;
}

/** One day of dummy data for charts/overview (will be replaced by API later) */
export interface DailyGoalDummy {
  id: string;
  date: string;
  dateObj: Date;
  kcalGoal: number;
  kcalActual: number;
  waterGoal: number;
  waterActual: number;
  kcalPercentage: number;
  waterPercentage: number;
  kcalMet: boolean;
  waterMet: boolean;
}

/** Generate dummy daily goal data for a date and settings (for charts without API) */
function generateOneDay(
  dateM: Moment,
  goals: GoalSettings
): DailyGoalDummy {
  const kcalActual = Math.floor(Math.random() * 1000) + 1500;
  const waterActual = Math.floor(Math.random() * 1500) + 1500;
  const kcalPercentage = Math.round((kcalActual / goals.dailyKcal) * 100);
  const waterPercentage = Math.round((waterActual / goals.dailyWater) * 100);
  return {
    id: `goal-${dateM.toISOString()}`,
    date: toISO(dateM),
    dateObj: dateM.toDate(),
    kcalGoal: goals.dailyKcal,
    kcalActual,
    waterGoal: goals.dailyWater,
    waterActual,
    kcalPercentage,
    waterPercentage,
    kcalMet:
      kcalActual >= goals.dailyKcal * 0.9 &&
      kcalActual <= goals.dailyKcal * 1.1,
    waterMet: waterActual >= goals.dailyWater,
  };
}

const defaultGoals: GoalSettings = {
  dailyKcal: DEFAULT_CALORIE_GOAL,
  dailyWater: DEFAULT_WATER_GOAL_ML,
};

/**
 * Generate dummy data for last N days (for charts/overview; will be replaced by API later).
 */
export function generateDummyGoalDays(
  days: number,
  goals: GoalSettings = defaultGoals
): DailyGoalDummy[] {
  const data: DailyGoalDummy[] = [];
  const unit = timeUnits.DAYS as import("moment").unitOfTime.DurationAs;
  for (let i = 0; i < days; i++) {
    const dateM = getPastTime(i, unit) as Moment;
    data.push(generateOneDay(dateM, goals));
  }
  return data.reverse();
}

/** Last 1 week dummy data for progress charts */
export function getDummyWeekData(
  goals: GoalSettings = defaultGoals
): DailyGoalDummy[] {
  return generateDummyGoalDays(DAYS_1_WEEK, goals);
}

/** Last 1 month dummy data for trend and overview */
export function getDummyMonthData(
  goals: GoalSettings = defaultGoals
): DailyGoalDummy[] {
  return generateDummyGoalDays(DAYS_1_MONTH, goals);
}

/** Last 3 months dummy data for Achievements & Streaks */
export function getDummyThreeMonthsData(
  goals: GoalSettings = defaultGoals
): DailyGoalDummy[] {
  return generateDummyGoalDays(DAYS_3_MONTHS, goals);
}
