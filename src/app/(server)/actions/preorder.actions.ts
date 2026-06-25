"use server";

import { Preorder, Prisma } from "@/src/generated/prisma/client";
import {
  ActionError,
  ActionResponse,
  CreatePreorderDto,
  GetPreorderDto,
  Page,
  UpdatePreorderDto,
} from "../dto";
import { prisma } from "@/src/lib/prisma";
import { ActionErrorFilter } from "../filters";
import { revalidatePath } from "next/cache";

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
      message: "Preorders fetched successfully",
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

export async function getPreorderById(
  id: string,
): Promise<ActionResponse<Preorder> | ActionError> {
  try {
    const preorder = await prisma.preorder.findUniqueOrThrow({
      where: { id },
    });

    return {
      ok: true,
      data: preorder,
      message: "Preorder fetched successfully",
    };
  } catch (err) {
    return ActionErrorFilter.fromError(err, "getPreorderById");
  }
}

export async function createPreorder(
  dto: CreatePreorderDto,
): Promise<ActionResponse<Preorder> | ActionError> {
  try {
    const preorder = await prisma.preorder.create({
      data: dto,
    });

    revalidatePath("/");

    return {
      ok: true,
      data: preorder,
      message: "Preorder created successfully",
    };
  } catch (err) {
    return ActionErrorFilter.fromError(err, "createPreorder");
  }
}

export async function updatePreorder(
  id: string,
  dto: UpdatePreorderDto,
): Promise<ActionResponse<Preorder> | ActionError> {
  try {
    const preorder = await prisma.preorder.update({
      where: { id },
      data: dto,
    });

    revalidatePath("/");
    revalidatePath(`/preorder/${id}`);

    return {
      ok: true,
      data: preorder,
      message: "Preorder updated successfully",
    };
  } catch (err) {
    return ActionErrorFilter.fromError(err, "updatePreorder");
  }
}

export async function deletePreorder(
  id: string,
): Promise<ActionResponse<Preorder> | ActionError> {
  try {
    const preorder = await prisma.preorder.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    revalidatePath(`/preorder/${id}`);

    return {
      ok: true,
      data: preorder,
      message: "Preorder deleted successfully",
    };
  } catch (err) {
    return ActionErrorFilter.fromError(err, "deletePreorder");
  }
}
