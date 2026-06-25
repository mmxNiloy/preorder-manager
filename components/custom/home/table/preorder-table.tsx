import { Page } from "@/src/app/(server)";
import { Preorder } from "@/src/generated/prisma/client";
import { columns } from "./colums";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  preorders: Page<Preorder>;
};

export default function PreorderTable({ preorders }: Props) {
  return (
    <DataTable
      data={preorders.data}
      totalItems={preorders.meta.total}
      pageCount={preorders.meta.pageCount}
      columns={columns}
    />
  );
}
