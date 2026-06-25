"use client";

import { Preorder } from "@/src/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "./actions";
import DateTimeContainer from "./date-time-container";
import EnumContainer from "./enum-container";

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
    cell: ({ row }) => <EnumContainer value={row.original.preorderWhen} />,
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
    // TODO: Custom toggle cell
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
