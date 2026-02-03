import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GOAL_NOT_SET_MESSAGE } from "../constants";

export interface GoalNotSetCardProps {
  onSetGoal: () => void;
  setGoalButton: React.ReactNode;
}

const GoalNotSetCard = ({ onSetGoal, setGoalButton }: GoalNotSetCardProps) => {
  return (
    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800 dark:text-amber-200">
          <Target className="size-5 text-amber-600" />
          Set your daily goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-amber-900/90 dark:text-amber-100/90">
          {GOAL_NOT_SET_MESSAGE}
        </p>
        <div
          onClick={onSetGoal}
          onKeyDown={(e) => e.key === "Enter" && onSetGoal()}
        >
          {setGoalButton}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalNotSetCard;
