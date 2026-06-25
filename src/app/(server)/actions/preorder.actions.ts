"use server";

import { Preorder, Prisma } from "@/src/generated/prisma/client";
import { ActionError, GetPreorderDto, Page } from "../dto";
import { prisma } from "@/src/lib/prisma";
import { ActionErrorFilter } from "../filters";

export async function getPreorders(
  dto: GetPreorderDto,
): Promise<Page<Preorder> | ActionError> {
  try {
    const { page, limit, isActive, sortBy, sortOrder } = dto;

    const safePage = page ?? 1;
    const safeLimit = limit ?? 10;
    const skip = (safePage - 1) * safeLimit;

    const filter: Prisma.PreorderWhereInput = {};

    const orderBy: Prisma.PreorderOrderByWithRelationInput = {};

    if (isActive !== null && isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (sortBy !== null && sortBy !== undefined) {
      orderBy[sortBy] = sortOrder ?? "asc";
    }

    const [preorders, total] = await Promise.all([
      prisma.preorder.findMany({
        where: filter,
        orderBy,
        skip,
        take: safeLimit,
      }),
      prisma.preorder.count({ where: filter }),
    ]);

    const pageCount = Math.ceil(total / safeLimit);
    const nextPage = safePage < pageCount ? safePage + 1 : null;
    const previousPage = safePage > 1 ? safePage - 1 : null;

    return {
      ok: true,
      data: preorders,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        pageCount,
        nextPage,
        previousPage,
      },
    };
  } catch (err) {
    return ActionErrorFilter.fromError(err, "getPreorders");
  }
}
