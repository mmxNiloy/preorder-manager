import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PreorderFormSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-24" />
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      <Card className="py-0 shadow-sm">
        <CardHeader className="border-b px-4 py-4 sm:px-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-4 w-64" />
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 border-b border-border/60 py-5 last:border-b-0 md:grid-cols-[minmax(0,280px)_1fr] md:gap-8 md:py-6"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-9 w-full max-w-md" />
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t px-4 py-4">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-28" />
        </CardFooter>
      </Card>
    </div>
  );
}
