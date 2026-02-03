import { useState } from "react";
import { Droplets, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WaterLog } from "../types";
import { formatMl, formatDateTime } from "../utils";
import { useDeleteWater } from "../hooks";
import EditWaterDialog from "./EditWaterDialog";
import DeleteWaterConfirmDialog from "./DeleteWaterConfirmDialog";

export interface WaterLogTableProps {
  logs: WaterLog[];
}

const WaterLogTable = ({ logs }: WaterLogTableProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<WaterLog | null>(null);
  const [actionsOpen, setActionsOpen] = useState<string | null>(null);

  const deleteWater = useDeleteWater({
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setSelectedLog(null);
      setActionsOpen(null);
    },
  });

  const handleEdit = (log: WaterLog) => {
    setSelectedLog(log);
    setActionsOpen(null);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (log: WaterLog) => {
    setSelectedLog(log);
    setActionsOpen(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    if (id) deleteWater.mutate(id);
  };

  if (logs.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Droplets className="mb-2 size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No water logs in this date range. Add water above to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-0 shadow-sm dark:border-border dark:bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-border">
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Water
                </TableHead>
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Date & time
                </TableHead>
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="h-12 w-12 px-5 py-0 text-center align-middle">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-b border-gray-200 bg-white last:border-0 hover:bg-transparent dark:border-border dark:bg-card dark:hover:bg-transparent"
                >
                  <TableCell className="px-5 py-4 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-[#DBEAFE] text-[#60A5FA] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                        <Droplets className="size-4" />
                      </div>
                      <span className="truncate font-semibold text-gray-900 dark:text-foreground">
                        Water
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle text-sm font-normal text-gray-700 dark:text-muted-foreground">
                    {formatDateTime(log.dateAndTime)}
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle text-sm font-normal tabular-nums text-gray-700 dark:text-muted-foreground">
                    {formatMl(log.amountMl)}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center align-middle">
                    <Popover
                      open={actionsOpen === log.id}
                      onOpenChange={(open) =>
                        setActionsOpen(open ? log.id : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-gray-700 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-foreground"
                          aria-label="Row actions"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        side="left"
                        className="z-100 w-40 p-1"
                      >
                        <div className="flex flex-col gap-0.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="justify-start gap-2 font-normal"
                            onClick={() => handleEdit(log)}
                          >
                            <Pencil className="size-4" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="justify-start gap-2 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteClick(log)}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditWaterDialog
        log={selectedLog}
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setSelectedLog(null);
        }}
      />
      <DeleteWaterConfirmDialog
        log={selectedLog}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteWater.isPending}
      />
    </>
  );
};

export default WaterLogTable;
