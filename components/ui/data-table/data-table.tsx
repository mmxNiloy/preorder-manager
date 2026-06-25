"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type Cell,
  type ColumnDef,
  type Header,
  type HeaderGroup,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import TableHeaderCell from "./table-header-cell";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems?: number;
  pageCount?: number;
  pageSizeOptions?: number[];
  title?: string;
  description?: string;
  headerActions?: ReactNode;
  renderHeaderActionContainer?: boolean;
  emptyStateMessage?: string;
  /** When false, pagination is kept in component state (avoids clobbering URL `page` / `limit`). */
  syncPaginationToUrl?: boolean;
}

type DataTableShellProps<TData, TValue> = {
  table: TanstackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  totalItems: number;
  pageCount: number;
  pageSizeOptions: number[];
  title?: string | undefined;
  description?: string | undefined;
  headerActions?: ReactNode | undefined;
  renderHeaderActionContainer: boolean;
  emptyStateMessage: string;
  limit: number;
  onPageSizeChange: (next: number) => void;
};

function DataTableShell<TData, TValue>({
  table,
  columns,
  totalItems,
  pageCount,
  pageSizeOptions,
  title,
  description,
  headerActions,
  renderHeaderActionContainer,
  emptyStateMessage,
  limit,
  onPageSizeChange,
}: DataTableShellProps<TData, TValue>) {
  const totalPages = Math.max(pageCount, 1);
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageStart = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const pageEnd = Math.min(currentPage * limit, totalItems);

  return (
    <section className="rounded-xl border border-border bg-card [&_button]:cursor-pointer [&_select]:cursor-pointer [&_input]:cursor-pointer">
      {(title || description || headerActions) && (
        <header className="border-b border-border/80 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {title ? (
                <h2 className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>
            {headerActions ? (
              renderHeaderActionContainer ? (
                <div className="flex flex-wrap items-end justify-start gap-2 lg:justify-end">
                  {headerActions}
                </div>
              ) : (
                headerActions
              )
            ) : null}
          </div>
        </header>
      )}

      <div className="overflow-x-auto">
        <Table className="w-full min-w-195">
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/70 hover:bg-transparent"
              >
                {headerGroup.headers.map((header: Header<TData, unknown>) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    <TableHeaderCell>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHeaderCell>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-border/70">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-0 hover:bg-muted/20"
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm text-muted-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <footer className="flex flex-col gap-3 border-t border-border/80 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-muted-foreground">
          Showing {pageStart}-{pageEnd} of {totalItems}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Rows per page
            </span>
            <Select
              value={String(limit)}
              onValueChange={(value) => {
                onPageSizeChange(Number(value));
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-8 w-[4.5rem] rounded-md border border-input bg-background px-2 text-sm text-muted-foreground shadow-none",
                  "focus:ring-2 focus:ring-primary/20",
                )}
              >
                <SelectValue placeholder={String(limit)} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="text-muted-foreground"
            >
              Previous
            </Button>

            <span className="min-w-20 text-center text-xs font-medium text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="text-muted-foreground"
            >
              Next
            </Button>
          </div>
        </div>
      </footer>
    </section>
  );
}

function DataTableUrl<TData, TValue>({
  columns,
  data,
  totalItems = 0,
  pageCount = 1,
  pageSizeOptions = [5, 10, 25, 50],
  title,
  description,
  headerActions,
  renderHeaderActionContainer = true,
  emptyStateMessage = "No records found.",
}: Omit<DataTableProps<TData, TValue>, "syncPaginationToUrl">) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(10),
  );

  const paginationState: PaginationState = {
    pageIndex: currentPage - 1,
    pageSize,
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue,
  ) => {
    const next =
      typeof updaterOrValue === "function"
        ? updaterOrValue(paginationState)
        : updaterOrValue;

    void setCurrentPage(next.pageIndex + 1);
    void setPageSize(next.pageSize);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <DataTableShell
      table={table}
      columns={columns}
      totalItems={totalItems}
      pageCount={pageCount}
      pageSizeOptions={pageSizeOptions}
      title={title}
      description={description}
      headerActions={headerActions}
      renderHeaderActionContainer={renderHeaderActionContainer}
      emptyStateMessage={emptyStateMessage}
      limit={pageSize}
      onPageSizeChange={(next) => {
        table.setPageIndex(0);
        table.setPageSize(next);
      }}
    />
  );
}

function DataTableLocal<TData, TValue>({
  columns,
  data,
  totalItems = 0,
  pageCount: pageCountProp = 1,
  pageSizeOptions = [5, 10, 25, 50],
  title,
  description,
  headerActions,
  renderHeaderActionContainer = true,
  emptyStateMessage = "No records found.",
}: Omit<DataTableProps<TData, TValue>, "syncPaginationToUrl">) {
  const defaultSize = pageSizeOptions.includes(10)
    ? 10
    : (pageSizeOptions[0] ?? 10);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultSize,
  });

  const derivedPageCount =
    pagination.pageSize > 0
      ? Math.max(1, Math.ceil(totalItems / pagination.pageSize))
      : Math.max(pageCountProp, 1);

  const table = useReactTable({
    data,
    columns,
    pageCount: derivedPageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <DataTableShell
      table={table}
      columns={columns}
      totalItems={totalItems}
      pageCount={derivedPageCount}
      pageSizeOptions={pageSizeOptions}
      title={title}
      description={description}
      headerActions={headerActions}
      renderHeaderActionContainer={renderHeaderActionContainer}
      emptyStateMessage={emptyStateMessage}
      limit={pagination.pageSize}
      onPageSizeChange={(next) => {
        setPagination((p) => ({ ...p, pageIndex: 0, pageSize: next }));
      }}
    />
  );
}

export function DataTable<TData, TValue>({
  syncPaginationToUrl = true,
  ...rest
}: DataTableProps<TData, TValue>) {
  if (syncPaginationToUrl === false) {
    return <DataTableLocal {...rest} />;
  }
  return <DataTableUrl {...rest} />;
}
