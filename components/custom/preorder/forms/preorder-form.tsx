"use client";

import {
  createPreorder,
  CreatePreorderSchema,
  emptyCreatePreorderDto,
  updatePreorder,
  UpdatePreorderDto,
  UpdatePreorderSchema,
} from "@/src/app/(server)";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { toast } from "sonner";
import PreorderFormFields, { PreorderFormType } from "./preorder-form-fields";
import { Preorder, PreorderWhen } from "@/src/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  data?: Preorder;
};

export default function PreorderForm({ data }: Props) {
  const [loading, startSubmit] = useTransition();
  const router = useRouter();

  const createForm = useForm({
    defaultValues: emptyCreatePreorderDto,
    validators: {
      onSubmit: CreatePreorderSchema,
    },
    onSubmit: ({ value }) => {
      startSubmit(async () => {
        const res = await createPreorder(value);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        router.push("/");
      });
    },
  });

  const updateForm = useForm({
    defaultValues: {
      name: data?.name || "",
      products: data?.products || 1,
      preorderWhen: data?.preorderWhen || PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: data?.startsAt || new Date(),
      endsAt: data?.endsAt || null,
      isActive: data?.isActive ?? true,
    } as UpdatePreorderDto,
    validators: {
      onSubmit: UpdatePreorderSchema,
    },
    onSubmit: ({ value }) => {
      startSubmit(async () => {
        if (!data || !data.id) {
          toast.error("Preorder not found");
          return;
        }

        const res = await updatePreorder(data.id, value);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        router.push("/");
      });
    },
  });

  const form = useMemo(() => {
    if (data) return updateForm;
    return createForm;
  }, [data, createForm, updateForm]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <div className="flex flex-row items-center justify-between">
        <Link href="/" passHref>
          <Button type="button" variant="outline" disabled={loading}>
            <ChevronLeft />
            Back
          </Button>
        </Link>

        <div className="flex gap-4">
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
              <>Save Changes</>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <b>Preorder Details</b>
          </CardTitle>
          <CardDescription>
            These values appear in the preorders list.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent>
          <PreorderFormFields form={form as unknown as PreorderFormType} />
        </CardContent>

        <CardFooter>
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
              <>Save Changes</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
