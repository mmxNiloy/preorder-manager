import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableSkeletonHeader = {
  key: string;
  label: string;
  className?: string;
  skeletonClassName?: string;
};

type DataTableSkeletonProps = {
  headers: DataTableSkeletonHeader[];
  rowCount?: number;
};

const DEFAULT_SKELETON_WIDTHS: Record<string, string> = {
  select: "size-4",
  name: "h-4 w-32",
  products: "h-4 w-6",
  preorderWhen: "h-4 w-28",
  startsAt: "h-4 w-36",
  endsAt: "h-4 w-36",
  status: "h-5 w-10",
  actions: "h-7 w-16",
};

export function DataTableSkeleton({
  headers,
  rowCount = 10,
}: DataTableSkeletonProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-195">
        <TableHeader className="border-b border-border/60">
          <TableRow className="hover:bg-transparent">
            {headers.map((header) => (
              <TableHead
                key={header.key}
                className={cn(
                  "px-4 py-3 text-sm font-medium text-muted-foreground",
                  header.className,
                )}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="border-b border-border/40 hover:bg-transparent"
            >
              {headers.map((header) => (
                <TableCell key={header.key} className="px-4 py-3.5">
                  <Skeleton
                    className={cn(
                      DEFAULT_SKELETON_WIDTHS[header.key] ?? "h-4 w-full",
                      header.skeletonClassName,
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
