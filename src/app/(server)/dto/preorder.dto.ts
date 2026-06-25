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
