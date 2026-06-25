"use client";

import {
  createPreorder,
  CreatePreorderSchema,
  emptyCreatePreorderDto,
  updatePreorder,
  UpdatePreorderDto,
  UpdatePreorderSchema,
} from "@/src/app/(server)";
import { Preorder, PreorderWhen } from "@/src/generated/prisma/client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { toast } from "sonner";
import PreorderFormFields, { PreorderFormType } from "./preorder-form-fields";

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
    } as UpdatePreorderDto,
    validators: {
      onSubmit: UpdatePreorderSchema,
    },
    onSubmit: ({ value }) => {
      startSubmit(async () => {
        if (!data || data.id) {
          toast.error("Preorder not found");
          return;
        }

        const res = await updatePreorder(data.id, value);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
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
    >
      <PreorderFormFields form={form as unknown as PreorderFormType} />
    </form>
  );
}
