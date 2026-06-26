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
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormActions from "./form-actions";

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
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" passHref>
          <Button type="button" variant="outline" disabled={loading}>
            <ChevronLeft />
            Back
          </Button>
        </Link>

        <FormActions
          loading={loading}
          className="justify-start sm:justify-end"
        />
      </div>

      <Card className="py-0 shadow-sm">
        <CardHeader className="border-b px-4 py-4 sm:px-6">
          <CardTitle className="text-base font-semibold">
            Preorder details
          </CardTitle>
          <CardDescription>
            These values appear in the preorders list.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <PreorderFormFields form={form as unknown as PreorderFormType} />
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t px-4 py-4">
          <FormActions loading={loading} />
        </CardFooter>
      </Card>
    </form>
  );
}
