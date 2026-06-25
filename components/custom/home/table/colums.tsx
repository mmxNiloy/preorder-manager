"use client";

import { Preorder } from "@/src/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

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
  },
  {
    accessorKey: "startsAt",
    header: "Starts At",
  },
  {
    accessorKey: "endsAt",
    header: "Ends At",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    // TODO: Custom toggle cell
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
