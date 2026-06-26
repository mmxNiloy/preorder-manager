"use server";

import { SiteConfig } from "@/constants/site.config";
import { Metadata } from "next";
import { getPreorderById } from "../../../(server)";
import { Suspense } from "react";
import { PreorderDetails } from "@/components/custom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (id === "new") {
    return {
      title: SiteConfig.meta.preorder.new.title,
      description: SiteConfig.meta.preorder.new.description,
      authors: SiteConfig.meta.authors,
    };
  }

  // Get the preorder if it exists
  const preorder = await getPreorderById(id);

  if (!preorder.ok) {
    return {
      title: SiteConfig.meta.preorder.notFound.title,
      description: SiteConfig.meta.preorder.notFound.description,
      authors: SiteConfig.meta.authors,
    };
  }

  return {
    title: SiteConfig.meta.preorder.makeTitle(preorder.data.name),
    description: SiteConfig.meta.preorder.makeDescription(preorder.data),
    authors: SiteConfig.meta.authors,
  };
}

export default async function PreorderByIdPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <PreorderDetails id={id} />
      </Suspense>
    </div>
  );
}
