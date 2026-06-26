import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FormActionsProps = {
  loading: boolean;
  className?: string;
};

export default function FormActions({ loading, className }: FormActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href="/" passHref>
        <Button type="button" variant="outline" disabled={loading}>
          Cancel
        </Button>
      </Link>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Saving...
          </>
        ) : (
          "Save changes"
        )}
      </Button>
    </div>
  );
}
