"use client";

import { Preorder } from "@/src/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "./actions";
import DateTimeContainer from "./date-time-container";
import EnumContainer from "./enum-container";
import ToggleAction from "./actions/toggle-action";

export const columns: ColumnDef<Preorder>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "preorderWhen",
    header: "Preorder When",
    cell: ({ row }) => (
      <EnumContainer
        value={row.original.preorderWhen}
        className="inline-block"
      />
    ),
  },
  {
    accessorKey: "startsAt",
    header: "Starts At",
    cell: ({ row }) => <DateTimeContainer date={row.original.startsAt} />,
  },
  {
    accessorKey: "endsAt",
    header: "Ends At",
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
