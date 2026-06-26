import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteConfig } from "@/constants/site.config";
import { ChevronLeft, Rabbit } from "lucide-react";
import Link from "next/link";

export default function PreorderFormNotFound() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" passHref>
          <Button type="button" variant="outline">
            <ChevronLeft />
            Back
          </Button>
        </Link>
      </div>

      <Card className="py-0 shadow-sm">
        <CardHeader className="border-b px-4 py-4 sm:px-6">
          <CardTitle>{SiteConfig.meta.preorder.notFound.title}</CardTitle>
          <CardDescription>
            {SiteConfig.meta.preorder.notFound.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 items-center justify-center flex flex-col min-h-[calc(100vh-20rem)]">
          <Rabbit className="size-16 sm:size-20 md:size-32 lg:size-40" />

          <p className="text-lg text-center">Well this is awkward...</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t px-4 py-4">
          <Link href="/" passHref>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
