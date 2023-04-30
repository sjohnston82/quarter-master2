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
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      items.forEach(async (item) => {
        if (item.expirationDate !== null) {
          const expiryDate = new Date(item.expirationDate);
          const currDate = new Date(Date.now());

          const difference = currDate.getTime() - expiryDate.getTime();
          const totalDays = Math.ceil(difference / (1000 * 3600 * 24)) * -1;

          await ctx.prisma.item.update({
            where: { id: item.id },
            data: {
              daysUntilExpiry: totalDays,
            },
          });

          if (totalDays < 0 && item.expired === false) {
            await ctx.prisma.item.update({
              where: { id: item.id },
              data: {
                expired: true,
              },
            });
          }
        }
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
      await ctx.prisma.item.update({
        where: {
          id: newItem.id,
        },
        data: {
          storageAreaName: currStorage.name,
        },
      });


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
