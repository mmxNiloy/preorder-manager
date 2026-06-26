import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  value: string | undefined | null;
} & React.ComponentProps<"span">;

export default function EnumContainer({ value, className, ...props }: Props) {
  const label = useMemo(() => {
    if (!value) return "-";

    const segments = value.split("_");
    return segments.join(" ");
  }, [value]);

  return (
    <span
      {...props}
      className={cn("lowercase first-letter:uppercase", className)}
    >
      {label}
    </span>
  );
}
