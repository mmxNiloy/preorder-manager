"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";

type PreorderListingPaginationProps = {
  total: number;
  page: number;
  pageCount: number;
  pageSize?: number;
};

export default function PreorderListingPagination({
  total,
  page,
  pageCount,
  pageSize = 10,
}: PreorderListingPaginationProps) {
  const [, setPage] = useQueryState("page", searchParams.page);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = total === 0 ? 0 : Math.min(page * pageSize, total);

  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={!canGoPrevious}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft />
      </Button>
      <p className="text-sm text-muted-foreground">
        Showing {from} to {to} from {total}
      </p>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={!canGoNext}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
