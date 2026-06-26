import { Card, CardContent } from "@/components/ui/card";
import { DataTableError } from "@/components/ui/data-table";

import PreorderListingPagination from "./preorder-listing-pagination";
import { Toolbar } from "./toolbar";
import PreorderTable from "./table/preorder-table";
import { getPreorders, GetPreorderSchema } from "@/src/app/(server)";
import { searchParamsCache } from "@/lib/searchparams";

const PAGE_SIZE = 10;

export default async function PreorderListingPage() {
  const page = searchParamsCache.get("page");
  const isActive = searchParamsCache.get("isActive");
  const sortBy = searchParamsCache.get("sortBy");
  const sortOrder = searchParamsCache.get("sortOrder");

  const dto = GetPreorderSchema.safeParse({
    page,
    limit: PAGE_SIZE,
    isActive,
    sortBy,
    sortOrder,
  });

  if (!dto.success) {
    return (
      <Card className="py-0 shadow-sm">
        <CardContent className="p-0">
          <div className="border-b px-4 py-3">
            <Toolbar />
          </div>
          <DataTableError message="No data found" />
          <div className="border-t px-4 py-4">
            <PreorderListingPagination total={0} page={1} pageCount={1} />
          </div>
        </CardContent>
      </Card>
    );
  }

  const preorders = await getPreorders(dto.data);

  if (!preorders.ok) {
    return (
      <Card className="py-0 shadow-sm">
        <CardContent className="p-0">
          <div className="border-b px-4 py-3">
            <Toolbar />
          </div>
          <DataTableError message="No data found" />
          <div className="border-t px-4 py-4">
            <PreorderListingPagination total={0} page={1} pageCount={1} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0 shadow-sm">
      <CardContent className="p-0">
        <div className="border-b px-4 py-3">
          <Toolbar />
        </div>

        <PreorderTable preorders={preorders} />

        <div className="border-t px-4 py-4">
          <PreorderListingPagination
            total={preorders.meta.total}
            page={preorders.meta.page}
            pageCount={preorders.meta.pageCount}
            pageSize={PAGE_SIZE}
          />
        </div>
      </CardContent>
    </Card>
  );
}
