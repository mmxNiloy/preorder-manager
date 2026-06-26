"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { searchParams } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [sortBy, setSortBy] = useQueryState("sortBy", searchParams.sortBy);

  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    searchParams.sortOrder,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon-sm">
            <ArrowUpDown />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48 space-y-4">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm">Sort by</DropdownMenuLabel>
          <RadioGroup
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
            className="*:flex *:gap-2 px-2 space-y-2"
          >
            <div>
              <RadioGroupItem value="name" id="filter-name" />
              <Label htmlFor="filter-name">Name</Label>
            </div>

            <div>
              <RadioGroupItem value="createdAt" id="filter-createdAt" />
              <Label htmlFor="filter-createdAt">Created At</Label>
            </div>

            <div>
              <RadioGroupItem value="startsAt" id="filter-startsAt" />
              <Label htmlFor="filter-startsAt">Starts At</Label>
            </div>

            <div>
              <RadioGroupItem value="endsAt" id="filter-endsAt" />
              <Label htmlFor="filter-endsAt">Ends At</Label>
            </div>
          </RadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="mt-4">
          <DropdownMenuItem
            onClick={() => setSortOrder("asc")}
            className={cn("h-8", sortOrder === "asc" && "bg-muted")}
          >
            <ArrowUp />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setSortOrder("desc")}
            className={cn("h-8", sortOrder === "desc" && "bg-muted")}
          >
            <ArrowDown />
            Descending
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
