import { PreorderFormSkeleton } from "@/components/custom/preorder";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-8">
      <PreorderFormSkeleton />
    </div>
  );
}
