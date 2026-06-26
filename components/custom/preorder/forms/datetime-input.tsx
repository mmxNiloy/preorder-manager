"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

type DatetimeInputProps = {
  id?: string;
  name?: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
  className?: string;
};

function toDatetimeLocalValue(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export default function DatetimeInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  "aria-invalid": ariaInvalid,
  className,
}: DatetimeInputProps) {
  const inputValue = value ? toDatetimeLocalValue(value) : "";
  const title = value ? format(value, "MM/dd/yyyy, hh:mm aa") : undefined;

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Input
        id={id}
        name={name}
        type="datetime-local"
        value={inputValue}
        title={title}
        onBlur={onBlur}
        onChange={(e) => {
          const next = e.target.value;
          if (!next) {
            onChange(null);
            return;
          }
          onChange(parse(next, "yyyy-MM-dd'T'HH:mm", new Date()));
        }}
        aria-invalid={ariaInvalid}
        className="[&::-webkit-calendar-picker-indicator]:opacity-0"
      />
      <CalendarIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
