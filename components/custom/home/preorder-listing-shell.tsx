import { Card, CardContent } from "@/components/ui/card";
import { Toolbar } from "./toolbar";
import { PreorderListingPagination } from ".";
import React from "react";

type ListingShellProps = {
  children: React.ReactNode;

  total?: number;

  page?: number;

  pageCount?: number;
};

export default function ListingShell({
  children,

  total = 0,

  page = 1,

  pageCount = 1,
}: ListingShellProps) {
  return (
    <Card className="py-0 shadow-sm">
      <CardContent className="p-0">
        <div className="border-b px-4 py-3">
          <Toolbar />
        </div>

        {children}

        <div className="border-t px-4 py-4 bg-muted-dark">
          <PreorderListingPagination
            total={total}
            page={page}
            pageCount={pageCount}
            pageSize={10}
          />
        </div>
      </CardContent>
    </Card>
  );
}
