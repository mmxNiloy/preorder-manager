import { format } from "date-fns";

type Props = {
  date?: Date | undefined | null;
} & React.ComponentProps<"span">;

export default function DateTimeContainer({ date, ...props }: Props) {
  if (!date) return null;
  return <span {...props}>{format(date, "MMM d, yyyy h:mm a")}</span>;
}
