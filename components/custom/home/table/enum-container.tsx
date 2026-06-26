import { cn } from "@/lib/utils";

type Props = {
  value: string | undefined | null;
} & React.ComponentProps<"span">;

export default function EnumContainer({ value, className, ...props }: Props) {
  return (
    <span
      {...props}
      className={cn("lowercase first-letter:uppercase", className)}
    >
      {value?.split("_").join(" ") ?? "-"}
    </span>
  );
}
