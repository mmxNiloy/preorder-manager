import { PackageOpen } from "lucide-react";

type DataTableErrorProps = {
  message?: string;
  subtitle?: string;
};

export function DataTableError({
  message = "No data found",
  subtitle,
}: DataTableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <PackageOpen className="size-10 text-muted-foreground" strokeWidth={1.5} />
      <p className="text-sm font-medium text-foreground">{message}</p>
      {subtitle ? (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
