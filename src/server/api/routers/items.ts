import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const itemsRouter = createTRPCRouter({
  getAllItems: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.item.findMany({
        where: {
          householdId: input.householdId,
        },
      });

      return items;
    }),

  createNewItem: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        householdId: z.string(),
        amount: z.number(),
        amountType: z.string().optional(),
        storageAreaId: z.string(),
        brand: z.string().optional(),
        foodCategories: z.array(z.string()).optional(),
        expirationDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newItem = await ctx.prisma.item.create({
        data: {
          name: input.name,
          householdId: input.householdId,
          amount: input.amount,
          amountType: input.amountType,
          brand: input.brand,
          foodCategories: input.foodCategories,
          expirationDate: input.expirationDate,
        },
      });

      const currStorage = await ctx.prisma.storageArea.findUnique({
        where: {
          id: input.storageAreaId,
        },
      });

      if (!currStorage) throw new Error("No storage area found.");

      await ctx.prisma.storageArea.update({
        where: {
          id: currStorage.id,
        },
        data: {
          items: {
            connect: {
              id: newItem.id,
            },
          },
        },
      });
    }),

  getItemsByStorageArea: protectedProcedure
    .input(z.object({ storageAreaId: z.string() }))
    .query(async ({ ctx, input }) => {
      const itemsInStorage = await ctx.prisma.item.findMany({
        where: {
          storageAreaId: input.storageAreaId,
        },
      });
      return itemsInStorage;
    }),
});
