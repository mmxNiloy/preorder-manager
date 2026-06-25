import {
  PreorderListingPage,
  PreorderListingSkeleton,
} from "@/components/custom";
import { Button } from "@/components/ui/button";
import { SiteConfig } from "@/constants/site.config";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Metadata } from "next";
import Link from "next/link";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SiteConfig.meta.title,
    description: SiteConfig.meta.description,
    authors: SiteConfig.meta.authors,
  };
}

type Props = {
  searchParams: Promise<SearchParams>;
};

export const revalidate = 300;

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  searchParamsCache.parse(params);
  const key = serialize(params);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Preorders</h1>

        <Button render={<Link href="/preorder/new" />}>Create Preorder</Button>
      </div>

      <Suspense key={key} fallback={<PreorderListingSkeleton />}>
        <PreorderListingPage />
      </Suspense>
    </div>
  );
}
