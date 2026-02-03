import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WaterLogsPagination as WaterLogsPaginationType } from "../types";

export interface WaterLogsPaginationProps {
  pagination: WaterLogsPaginationType | null;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

/**
 * Returns an ordered array of page numbers and "ellipsis" to show.
 * e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) pages.push("ellipsis");
  for (let p = windowStart; p <= windowEnd; p++) {
    if (p !== 1 && p !== totalPages) pages.push(p);
  }
  if (windowEnd < totalPages - 1) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

const WaterLogsPagination = ({
  pagination,
  onPageChange,
  disabled = false,
}: WaterLogsPaginationProps) => {
  if (!pagination || pagination.totalPages <= 0) return null;

  const { page, totalPages, totalEntries, limit } = pagination;
  const pageNumbers = getPageNumbers(page, totalPages);
  const startEntry = totalEntries === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, totalEntries);

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-border dark:bg-card sm:px-5 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Showing{" "}
          <span className="font-medium text-foreground">{startEntry}</span> to{" "}
          <span className="font-medium text-foreground">{endEntry}</span> of{" "}
          <span className="font-medium text-foreground">{totalEntries}</span>{" "}
          logs
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <p className="order-1 w-full text-center text-sm text-muted-foreground sm:order-0 sm:w-auto sm:mr-2">
            Page <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </p>
          <div className="order-2 flex items-center gap-1">
            <button
              type="button"
              aria-label="Go to previous page"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={disabled || page <= 1}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors",
                "hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <ChevronLeftIcon className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-0.5">
              {pageNumbers.map((p, i) =>
                p === "ellipsis" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex size-8 items-center justify-center text-muted-foreground"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    aria-current={p === page ? "page" : undefined}
                    onClick={() => onPageChange(p)}
                    disabled={disabled}
                    className={cn(
                      "flex size-8 min-w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      "disabled:pointer-events-none disabled:opacity-50",
                      p === page
                        ? "border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              aria-label="Go to next page"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={disabled || page >= totalPages}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors",
                "hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterLogsPagination;
