"use client";

import { Button } from "@/components/ui/button";
import { Loader, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export function DataTableError({
  errorMessage = "Failed to load data",
}: {
  errorMessage?: string;
}) {
  const [loading, startRetry] = useTransition();
  const router = useRouter();

  const onRetry = useCallback(() => {
    startRetry(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="text-lg font-semibold text-destructive">
        {errorMessage}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please check connectivity and try again.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        title="Try again"
        disabled={loading}
        onClick={onRetry}
      >
        {loading ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <RefreshCw className="size-4" />
        )}{" "}
        Try again
      </Button>
    </section>
  );
}
