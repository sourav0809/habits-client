import { Button } from "@/components/ui/button";
import { GoalsHeader } from "./GoalsHeader";
import GoalNotSetCard from "./GoalNotSetCard";
import EditGoalsDialog from "./EditGoalsDialog";

export interface GoalsNotSetViewProps {
  onEditGoals: () => void;
  editDialogOpen: boolean;
  onEditDialogChange: (open: boolean) => void;
}

export default function GoalsNotSetView({
  onEditGoals,
  editDialogOpen,
  onEditDialogChange,
}: GoalsNotSetViewProps) {
  return (
    <div className="space-y-6">
      <GoalsHeader onEditGoals={onEditGoals} />
      <GoalNotSetCard
        onSetGoal={onEditGoals}
        setGoalButton={
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Set goal
          </Button>
        }
      />
      <EditGoalsDialog
        open={editDialogOpen}
        onOpenChange={onEditDialogChange}
        goal={null}
      />
    </div>
  );
}
