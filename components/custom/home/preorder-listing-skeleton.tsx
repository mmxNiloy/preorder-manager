import { Card, CardContent } from "@/components/ui/card";

export default function PreorderListingSkeleton() {
  return (
    <Card className="py-0 shadow-sm">
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex gap-2">
            <div className="h-8 w-12 rounded-lg bg-muted" />
            <div className="h-8 w-16 rounded-lg bg-muted" />
            <div className="h-8 w-20 rounded-lg bg-muted" />
          </div>
          <div className="size-7 rounded-lg bg-muted" />
        </div>
        <div className="min-h-[320px] px-4">
          <div className="h-full rounded-lg bg-muted/50" />
        </div>
        <div className="flex justify-center border-t px-4 py-4">
          <div className="h-7 w-48 rounded-lg bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
