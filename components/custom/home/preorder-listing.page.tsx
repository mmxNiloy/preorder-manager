import { Card, CardContent } from "@/components/ui/card";

import PreorderListingPagination from "./preorder-listing-pagination";
import { Toolbar } from "./toolbar";
import PreorderTable from "./table/preorder-table";
import { getPreorders, GetPreorderSchema } from "@/src/app/(server)";
import { searchParamsCache } from "@/lib/searchparams";

export default async function PreorderListingPage() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const isActive = searchParamsCache.get("isActive");
  const sortBy = searchParamsCache.get("sortBy");
  const sortOrder = searchParamsCache.get("sortOrder");

  const dto = GetPreorderSchema.safeParse({
    page,
    limit,
    isActive,
    sortBy,
    sortOrder,
  });

  if (!dto.success) {
    // TODO: Handle error
    return <>Error</>;
  }

  const preorders = await getPreorders(dto.data);

  if (!preorders.ok) {
    // TODO: Handle error
    return <>Error</>;
  }

  return (
    <Card className="py-0 shadow-sm">
      <CardContent className="p-0">
        <div className="border-b px-4 py-3">
          <Toolbar />
        </div>

        <div className="min-h-[320px]" aria-hidden>
          <PreorderTable preorders={preorders} />
        </div>

        <div className="border-t px-4 py-4">
          <PreorderListingPagination />
        </div>
      </CardContent>
    </Card>
  );
}
