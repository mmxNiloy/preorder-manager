import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function DataTableSkeleton({
  columnCount = 1,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showViewOptions = false,
}: {
  columnCount?: number;
  rowCount?: number;
  searchableColumnCount?: number;
  filterableColumnCount?: number;
  showViewOptions?: boolean;
}) {
  return (
    <section className="rounded-xl border border-border bg-card">
      {searchableColumnCount > 0 || filterableColumnCount > 0 || showViewOptions ? (
        <header className="border-b border-border/80 px-4 py-4 sm:px-6">
          <div className="flex w-full items-center justify-between gap-2 overflow-auto">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {searchableColumnCount > 0
                ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                    <Skeleton
                      key={`s-${i}`}
                      className="h-10 w-[150px] lg:w-[250px]"
                    />
                  ))
                : null}
              {filterableColumnCount > 0
                ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                    <Skeleton
                      key={`f-${i}`}
                      className="h-10 w-[70px] border-dashed"
                    />
                  ))
                : null}
            </div>
            {showViewOptions ? (
              <Skeleton className="ml-auto hidden h-7 w-[70px] lg:flex" />
            ) : null}
          </div>
        </header>
      ) : null}

      <div className="overflow-x-auto">
        <ScrollArea className="w-full min-w-0">
          <Table className="w-full min-w-195">
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, r) => (
                <TableRow key={r} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, c) => (
                    <TableCell key={c} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <footer className="flex flex-col gap-3 border-t border-border/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Skeleton className="h-4 w-40" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </footer>
    </section>
  );
}
