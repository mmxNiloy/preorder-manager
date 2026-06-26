import { PreorderListingSkeleton } from "@/components/custom/home";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Preorders</h1>

        <Skeleton className="h-9 w-28" />
      </div>

      <PreorderListingSkeleton />
    </div>
  );
}
