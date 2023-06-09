import { TRPCError } from "@trpc/server";
import { z } from "zod";

const limit = 10;

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { calculateDaysUntilExpiry } from "~/utils/calculateDaysUntilExpiry";

interface CategoryCount {
  name: string;
  count: number;
  ids: string[];
}

type CategoryCounts = Record<string, CategoryCount>;

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
        take: limit + 1,
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
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        if (nextItem) nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  getExpiredItems: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input: { householdId } }) => {
      const nearlyExpired = await ctx.prisma.item.findMany({
        where: {
          householdId,
          daysUntilExpiry: {
            lt: 8,
          },
        },
        orderBy: {
          daysUntilExpiry: "desc",
        },
      });
      return nearlyExpired;
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

  // getFoodCategoryCount: protectedProcedure
  //   .input(z.object({ householdId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const allItems = await ctx.prisma.item.findMany({
  //       where: { householdId: input.householdId },
  //     });
  //     const categoryCounts: { name: string; count: number; ids: string[] }[] =
  //       [];

  //     allItems.forEach((item) => {
  //       item.foodCategories.forEach((category) => {
  //         const existingCategory = categoryCounts.find(
  //           (count) => count.name === category
  //         );
  //         if (existingCategory) {
  //           existingCategory.count++;
  //           existingCategory.ids.push(item.id);
  //         } else {
  //           categoryCounts.push({ name: category, count: 1, ids: [item.id] });
  //         }
  //       });
  //     });

  //     return categoryCounts;
  //   }),

  getFoodCategoryCount: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allItems = await ctx.prisma.item.findMany({
        where: { householdId: input.householdId },
      });
      const categoryCounts: CategoryCounts = {};

      allItems.forEach((item) => {
        item.foodCategories.forEach((category) => {
          if (categoryCounts.hasOwnProperty(category)) {
            const count = categoryCounts[category]?.count ?? 0;
            const ids = categoryCounts[category]?.ids ?? [];
            categoryCounts[category] = {
              name: category,
              count: count + 1,
              ids: [...ids, item.id],
            };
          } else {
            categoryCounts[category] = {
              name: category,
              count: 1,
              ids: [item.id],
            };
          }
        });
      });

      return Object.values(categoryCounts);
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

  // this is for when a food tag is clicked to return all items with the same tag
  // getItemsByFoodTypeClick: protectedProcedure.input(z.object({ foodType: z.string(), householdId: z.string() })).query(async ({ ctx, input }) => {
  //   const allItems = await ctx.prisma.items.findMany({
  //     where: {
  //       householdId: input.householdId,
  //     }
  //   })

  //   allItems.forEach((item) => {
  //     item.foodCategories
  //   })
  // })
});
