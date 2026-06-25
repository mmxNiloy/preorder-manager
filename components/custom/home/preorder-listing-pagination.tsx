import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type PreorderListingPaginationProps = {
  from?: number;
  to?: number;
  total?: number;
};

export default function PreorderListingPagination({
  from = 1,
  to = 8,
  total = 8,
}: PreorderListingPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" size="icon-sm" disabled>
        <ChevronLeft />
      </Button>
      <p className="text-sm text-muted-foreground">
        Showing {from} to {to} from {total}
      </p>
      <Button variant="outline" size="icon-sm" disabled>
        <ChevronRight />
      </Button>
    </div>
  );
}
