import { UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ConsumptionEmptyState = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <UtensilsCrossed className="mb-2 size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No meals in this date range. Add food above to get started.
        </p>
      </CardContent>
    </Card>
  );
};
