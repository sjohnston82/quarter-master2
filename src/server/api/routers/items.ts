import { TRPCError } from "@trpc/server";
import { z } from "zod";

const LIMIT = 10;

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { calculateDaysUntilExpiry } from "~/utils/calculateDaysUntilExpiry";

export const itemsRouter = createTRPCRouter({
  getAllItemsInfinite: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        householdId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, householdId } = input;
      const items = await ctx.prisma.item.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: LIMIT + 1,
        orderBy: {
          name: "asc",
        },
        where: {
          householdId,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      items.forEach(async (item) => {
        if (item.expirationDate !== null) {
          const totalDays = calculateDaysUntilExpiry(item.expirationDate);

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
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > LIMIT) {
        const nextItem = items.pop(); // return the last item from the array
        if (nextItem) nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

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
          const totalDays = calculateDaysUntilExpiry(item.expirationDate);

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
        brand_name: z.string().optional(),
        foodCategories: z.array(z.string()).optional(),
        expirationDate: z.date().nullable().optional(),
        flavor: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newItem = await ctx.prisma.item.create({
        data: {
          name: input.name,
          householdId: input.householdId,
          amount: input.amount,
          amountType: input.amountType,
          brand: input.brand_name,
          foodCategories: input.foodCategories,
          expirationDate: input.expirationDate,
          flavor: input.flavor,
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

      if (input.expirationDate) {
        const totalDays = calculateDaysUntilExpiry(input.expirationDate);

        await ctx.prisma.item.update({
          where: {
            id: newItem.id,
          },
          data: {
            daysUntilExpiry: totalDays,
          },
        });
      }
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

  updateItemAmount: protectedProcedure
    .input(
      z.object({ amount: z.number(), id: z.string(), amountType: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const currItem = await ctx.prisma.item.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!currItem)
        throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });

      await ctx.prisma.item.update({
        where: {
          id: currItem.id,
        },
        data: {
          amount: input.amount,
          amountType: input.amountType,
        },
      });
    }),

  editItem: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        brand: z.string(),
        flavor: z.string(),
        foodCategories: z.array(z.string()).optional(),
        expirationDate: z.date().optional(),
        storageAreaId: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currItem = await ctx.prisma.item.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!currItem)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The item does not exist.",
        });

      await ctx.prisma.item.update({
        where: {
          id: currItem.id,
        },
        data: {
          name: input.name,
          brand: input.brand,
          flavor: input.flavor,
          expirationDate: input.expirationDate,
          foodCategories: input.foodCategories,
        },
      });

      if (input.expirationDate !== undefined) {
        const totalDays = calculateDaysUntilExpiry(input.expirationDate);

        await ctx.prisma.item.update({
          where: {
            id: currItem.id,
          },
          data: {
            daysUntilExpiry: totalDays,
          },
        });
      }
    }),

  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.item.delete({
        where: { id: input.id },
      });
    }),

  getFoodCategoryCount: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      // const categoryCount = await ctx.prisma.item.groupBy({
      //   by: ["foodCategories"],
      //   where: { householdId: input.householdId },
      //   _count: {
      //     foodCategories: true,
      //   },
      // });
      const allItems = await ctx.prisma.item.findMany({
        where: { householdId: input.householdId },
      });
      const categoryCounts: { name: string; count: number; ids: string[] }[] =
        [];

      allItems.forEach((item) => {
        item.foodCategories.forEach((category) => {
          const existingCategory = categoryCounts.find(
            (count) => count.name === category
          );
          if (existingCategory) {
            existingCategory.count++;
            existingCategory.ids.push(item.id);
          } else {
            categoryCounts.push({ name: category, count: 1, ids: [item.id] });
          }
        });
      });

      return categoryCounts;
    }),

  getItemsByFoodType: protectedProcedure
    .input(z.object({ idsToFind: z.string().array() }))
    .query(async ({ ctx, input }) => {
      const foodTypeItems = await ctx.prisma.item.findMany({
        where: {
          id: {
            in: input.idsToFind,
          },
        },
      });
      return foodTypeItems;
    }),
});
