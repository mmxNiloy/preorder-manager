"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      <TabsList className="gap-2 bg-transparent *:px-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
