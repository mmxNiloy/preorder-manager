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
  type RowSelectionState,
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
import { DataTableError } from "./data-table-error";
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
  /** Renders only the table without card chrome — for use inside parent Card layouts. */
  embedded?: boolean;
  /** Fixed page size; disables rows-per-page selector and optional limit URL sync. */
  fixedPageSize?: number;
  /** Show built-in footer pagination. Defaults to true unless embedded. */
  showPagination?: boolean;
  /** Enable row selection state for checkbox columns (UI only). */
  enableRowSelection?: boolean;
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
  embedded: boolean;
  showPagination: boolean;
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
  embedded,
  showPagination,
}: DataTableShellProps<TData, TValue>) {
  const totalPages = Math.max(pageCount, 1);
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageStart = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const pageEnd = Math.min(currentPage * limit, totalItems);

  const tableContent = (
  <div className="overflow-x-auto">
    <Table className="w-full min-w-195">
      <TableHeader className="border-b border-border/60">
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
          <TableRow
            key={headerGroup.id}
            className="border-border/70 hover:bg-transparent"
          >
            {headerGroup.headers.map((header: Header<TData, unknown>) => (
              <TableHead
                key={header.id}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
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
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: Row<TData>) => (
            <TableRow
              key={row.id}
              className="border-b border-border/40 hover:bg-transparent"
              data-state={row.getIsSelected() ? "selected" : undefined}
            >
              {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                <TableCell
                  key={cell.id}
                  className="px-4 py-3.5 text-sm text-muted-foreground"
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
            <TableCell colSpan={columns.length} className="p-0">
              <DataTableError message={emptyStateMessage} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  );

  if (embedded) {
    return tableContent;
  }

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

      {tableContent}

      {showPagination ? (
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
      ) : null}
    </section>
  );
}

type DataTableInnerProps<TData, TValue> = Omit<
  DataTableProps<TData, TValue>,
  "syncPaginationToUrl"
>;

function useDataTableInstance<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  fixedPageSize,
  enableRowSelection = false,
  paginationState,
  onPaginationChange,
  rowSelection,
  onRowSelectionChange,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  fixedPageSize?: number;
  enableRowSelection?: boolean;
  paginationState: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}) {
  return useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: paginationState,
      rowSelection,
    },
    enableRowSelection,
    onPaginationChange,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });
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
  emptyStateMessage = "No data found",
  embedded = false,
  fixedPageSize,
  showPagination,
  enableRowSelection = false,
}: DataTableInnerProps<TData, TValue>) {
  const resolvedPageSize =
    fixedPageSize ??
    (pageSizeOptions.includes(10) ? 10 : (pageSizeOptions[0] ?? 10));

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(resolvedPageSize),
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const effectivePageSize = fixedPageSize ?? pageSize;

  const paginationState: PaginationState = {
    pageIndex: currentPage - 1,
    pageSize: effectivePageSize,
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue,
  ) => {
    const next =
      typeof updaterOrValue === "function"
        ? updaterOrValue(paginationState)
        : updaterOrValue;

    void setCurrentPage(next.pageIndex + 1);
    if (!fixedPageSize) {
      void setPageSize(next.pageSize);
    }
  };

  const table = useDataTableInstance({
    columns,
    data,
    pageCount,
    fixedPageSize,
    enableRowSelection,
    paginationState,
    onPaginationChange: handlePaginationChange,
    rowSelection,
    onRowSelectionChange: setRowSelection,
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
      limit={effectivePageSize}
      onPageSizeChange={(next) => {
        table.setPageIndex(0);
        table.setPageSize(next);
      }}
      embedded={embedded}
      showPagination={showPagination ?? !embedded}
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
  emptyStateMessage = "No data found",
  embedded = false,
  fixedPageSize,
  showPagination,
  enableRowSelection = false,
}: DataTableInnerProps<TData, TValue>) {
  const defaultSize =
    fixedPageSize ??
    (pageSizeOptions.includes(10) ? 10 : (pageSizeOptions[0] ?? 10));

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const derivedPageCount =
    pagination.pageSize > 0
      ? Math.max(1, Math.ceil(totalItems / pagination.pageSize))
      : Math.max(pageCountProp, 1);

  const table = useDataTableInstance({
    columns,
    data,
    pageCount: derivedPageCount,
    fixedPageSize,
    enableRowSelection,
    paginationState: pagination,
    onPaginationChange: setPagination,
    rowSelection,
    onRowSelectionChange: setRowSelection,
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
      embedded={embedded}
      showPagination={showPagination ?? !embedded}
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
