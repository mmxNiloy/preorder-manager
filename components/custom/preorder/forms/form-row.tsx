import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormRowProps = {
  label: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function FormRow({
  label,
  description,
  children,
  className,
}: FormRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 border-b border-border/60 py-5 last:border-b-0 md:grid-cols-[minmax(0,280px)_1fr] md:gap-8 md:py-6",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        {label}
        {description}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
