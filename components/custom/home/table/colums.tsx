"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Preorder } from "@/src/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "./actions";
import DateTimeContainer from "./date-time-container";
import EnumContainer from "./enum-container";
import ToggleAction from "./actions/toggle-action";
import NameCell from "./name-cell";

export { PREORDER_TABLE_HEADERS } from "./headers";

export const columns: ColumnDef<Preorder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(value === true)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value === true)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <NameCell name={row.original.name} />,
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "preorderWhen",
    header: "Preorder when",
    cell: ({ row }) => (
      <EnumContainer
        value={row.original.preorderWhen}
        className="inline-block"
      />
    ),
  },
  {
    accessorKey: "startsAt",
    header: "Starts at",
    cell: ({ row }) => <DateTimeContainer date={row.original.startsAt} />,
  },
  {
    accessorKey: "endsAt",
    header: "Ends at",
    cell: ({ row }) => <DateTimeContainer date={row.original.endsAt} />,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <ToggleAction data={row.original} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
