import type { Food } from "../types";

/**
 * Default serving calories (defaultQuantity * caloriesPerGram)
 */
export function getDefaultKcal(food: Food): number {
  return Math.round(food.defaultQuantity * food.caloriesPerGram);
}

/**
 * Calories per 100g for display (caloriesPerGram * 100)
 */
export function getKcalPer100g(food: Food): number {
  return Math.round(food.caloriesPerGram * 100);
}

/**
 * Truncate name for charts/tables with ellipsis
 */
export function truncateName(name: string, maxLength: number): string {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength - 1) + "…";
}

export interface FoodsStats {
  total: number;
  avgKcalPer100g: number;
  highest: number;
  totalDefaultKcal: number;
}

/**
 * Compute stats from a list of foods (total, avg kcal/100g, highest density, total default kcal)
 */
export function getFoodsStats(foods: Food[]): FoodsStats {
  const total = foods.length;
  const avgKcalPer100g =
    total > 0
      ? Math.round(
          foods.reduce((s, f) => s + getKcalPer100g(f), 0) / total
        )
      : 0;
  const highest =
    total > 0 ? Math.max(...foods.map((f) => getKcalPer100g(f))) : 0;
  const totalDefaultKcal = foods.reduce((s, f) => s + getDefaultKcal(f), 0);
  return { total, avgKcalPer100g, highest, totalDefaultKcal };
}
