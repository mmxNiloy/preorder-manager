import { PreorderWhen } from "@/src/generated/prisma/enums";
import { z } from "zod";

export const GetPreorderSchema = z.object({
  page: z.coerce.number().min(1).optional().nullable().catch(null).default(1),
  limit: z.coerce
    .number()
    .min(1)
    .max(100)
    .optional()
    .nullable()
    .catch(null)
    .default(10),
  isActive: z.boolean().optional().nullable().catch(null),
  sortBy: z
    .enum(["name", "createdAt", "startsAt", "endsAt"])
    .optional()
    .nullable()
    .catch(null)
    .default("name"),
  sortOrder: z
    .enum(["asc", "desc"])
    .optional()
    .nullable()
    .catch(null)
    .default("asc"),
});

export type GetPreorderDto = z.infer<typeof GetPreorderSchema>;

export const PreorderWhenValues = Object.values(PreorderWhen);

export const CreatePreorderSchema = z.object({
  name: z.string().min(1),
  products: z.number().min(1),
  preorderWhen: z.enum(PreorderWhenValues),
  startsAt: z.date(),
  endsAt: z.date().optional().nullable(),
});

export type CreatePreorderDto = z.infer<typeof CreatePreorderSchema>;

export const emptyCreatePreorderDto: CreatePreorderDto = {
  name: "",
  products: 1,
  preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
  startsAt: new Date(),
  endsAt: null,
};

export const UpdatePreorderSchema = CreatePreorderSchema.partial();

export type UpdatePreorderDto = z.infer<typeof UpdatePreorderSchema>;
