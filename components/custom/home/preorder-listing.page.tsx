import { DataTableError } from "@/components/ui/data-table";
import PreorderTable from "./table/preorder-table";
import { getPreorders, GetPreorderSchema } from "@/src/app/(server)";
import { searchParamsCache } from "@/lib/searchparams";
import ListingShell from "./preorder-listing-shell";

export default async function PreorderListingPage() {
  const page = searchParamsCache.get("page");
  const isActive = searchParamsCache.get("isActive");
  const sortBy = searchParamsCache.get("sortBy");
  const sortOrder = searchParamsCache.get("sortOrder");

  const dto = GetPreorderSchema.safeParse({
    page,
    isActive,
    sortBy,
    sortOrder,
  });

  if (!dto.success) {
    return (
      <ListingShell>
        <DataTableError
          message="Invalid filters"
          subtitle="Try resetting your filters or return to the first page."
        />
      </ListingShell>
    );
  }

  const preorders = await getPreorders(dto.data);

  if (!preorders.ok) {
    return (
      <ListingShell>
        <DataTableError
          message="Failed to load preorders"
          subtitle={preorders.message}
        />
      </ListingShell>
    );
  }

  return (
    <ListingShell
      total={preorders.meta.total}
      page={preorders.meta.page}
      pageCount={preorders.meta.pageCount}
    >
      <PreorderTable preorders={preorders} />
    </ListingShell>
  );
}
