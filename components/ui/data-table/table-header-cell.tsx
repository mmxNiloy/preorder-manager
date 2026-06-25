import { cn } from "@/lib/utils";
import React from "react";

export default function TableHeaderCell({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn(
        "text-xs font-semibold tracking-normal text-muted-foreground normal-case",
        className,
      )}
    >
      {children}
    </span>
  );
}
