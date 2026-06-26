import type { DataTableSkeletonHeader } from "@/components/ui/data-table/data-table-skeleton";

export const PREORDER_TABLE_HEADERS: DataTableSkeletonHeader[] = [
  { key: "select", label: "" },
  { key: "name", label: "Name" },
  { key: "products", label: "Products" },
  { key: "preorderWhen", label: "Preorder when" },
  { key: "startsAt", label: "Starts at" },
  { key: "endsAt", label: "Ends at" },
  { key: "status", label: "" },
  { key: "actions", label: "" },
];
