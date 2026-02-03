import type { Goal } from "@/modules/goals/types";
import GoalProgressCard from "./GoalProgressCard";
import GoalProgressCardSkeleton from "./GoalProgressCardSkeleton";
import SetGoalCard from "./SetGoalCard";

export interface WaterGoalCardSectionProps {
  goal: Goal | null;
  todayWaterMl: number;
  goalCardLoading: boolean;
}

const WaterGoalCardSection = ({
  goal,
  todayWaterMl,
  goalCardLoading,
}: WaterGoalCardSectionProps) => {
  if (goalCardLoading) return <GoalProgressCardSkeleton />;
  if (goal == null) return <SetGoalCard />;
  return (
    <GoalProgressCard currentMl={todayWaterMl} goalMl={goal.targetWaterMl} />
  );
};

export default WaterGoalCardSection;
