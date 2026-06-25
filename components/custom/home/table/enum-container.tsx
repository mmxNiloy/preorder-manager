import { useMemo } from "react";

type Props = {
  value: string | undefined | null;
} & React.ComponentProps<"span">;

export default function EnumContainer({ value, ...props }: Props) {
  const label = useMemo(() => {
    if (!value) return "-";

    const segments = value.split("_");
    const capitalizedSegments = segments.map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
    );
    return capitalizedSegments.join(" ");
  }, [value]);

  return <span {...props}>{label}</span>;
}
