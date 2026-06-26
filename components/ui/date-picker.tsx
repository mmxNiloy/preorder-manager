"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type DatePickerProps = Omit<React.ComponentProps<"button">, "value"> & {
  value?: Date | undefined;
  onValueChange?: (value: Date | undefined) => void;
};

export function DatePicker({
  value,
  onValueChange,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = value || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    onValueChange?.(newDate);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={"bg-red-500"}
        render={
          <Button
            variant={"outline"}
            className={cn(!value && "text-muted-foreground")}
            {...props}
          >
            <span>
              {value
                ? format(value, "MM/dd/yyyy hh:mm aa")
                : "MM/DD/YYYY hh:mm aa"}
            </span>
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        }
      />
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <div className="sm:flex">
          <Calendar mode="single" selected={value} onSelect={onValueChange} />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      value && value.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" && value.getHours() < 12) ||
                        (ampm === "PM" && value.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
