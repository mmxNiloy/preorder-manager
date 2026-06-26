"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export default function StatusRadio() {
  const [isActive, setIsActive] = useQueryState(
    "isActive",
    searchParams.isActive,
  );

  const value = useMemo(() => {
    if (isActive === undefined || isActive === null) return "all";

    return isActive ? "active" : "inactive";
  }, [isActive]);

  const handleValueChange = useCallback(
    (value: string) => {
      if (value === "all") {
        setIsActive(null);
      } else {
        setIsActive(value === "active");
      }
    },
    [setIsActive],
  );

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList
        variant="line"
        className="h-auto gap-1 bg-transparent p-0"
      >
        <TabsTrigger
          value="all"
          className="rounded-lg px-4 py-1.5 data-active:bg-muted data-active:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="active"
          className="rounded-lg px-4 py-1.5 data-active:bg-muted data-active:shadow-none"
        >
          Active
        </TabsTrigger>
        <TabsTrigger
          value="inactive"
          className="rounded-lg px-4 py-1.5 data-active:bg-muted data-active:shadow-none"
        >
          Inactive
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
