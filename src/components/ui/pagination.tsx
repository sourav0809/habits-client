"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1 sm:gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = React.ComponentProps<"button"> & {
  isActive?: boolean;
};

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Button
    variant={isActive ? "default" : "outline"}
    size="icon-sm"
    aria-current={isActive ? "page" : undefined}
    className={cn("min-w-8", isActive && "pointer-events-none", className)}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof Button> & { text?: string }) => (
  <Button
    variant="outline"
    size="default"
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5 pr-3 sm:pr-4", className)}
    {...props}
  >
    <ChevronLeftIcon className="size-4" />
    <span className="hidden sm:inline">{text}</span>
  </Button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof Button> & { text?: string }) => (
  <Button
    variant="outline"
    size="default"
    aria-label="Go to next page"
    className={cn("gap-1 pl-3 pr-2.5 sm:pl-4", className)}
    {...props}
  >
    <span className="hidden sm:inline">{text}</span>
    <ChevronRightIcon className="size-4" />
  </Button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center", className)}
    {...props}
  >
    <span className="text-muted-foreground">…</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
