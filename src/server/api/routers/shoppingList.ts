import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  addToShoppingList: protectedProcedure
    .input(
      z.object({
        householdId: z.string(),
        name: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.shoppingList.create({
        data: {
          householdId: input.householdId,
          name: input.name,
          location: input.location,
        },
      });
    }),

  getAllShoppingListItems: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      const shoppingListItems = await ctx.prisma.shoppingList.findMany({
        where: {
          householdId: input.householdId,
        },
      });
      return shoppingListItems;
    }),

  findByLocation: protectedProcedure
    .input(z.object({ householdId: z.string(), location: z.string() }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.shoppingList.findMany({
        where: {
          householdId: input.householdId,
          location: input.location,
        },
      });
      return items;
    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.shoppingList.findUnique({
        where: { id: input.id },
      });

      if (!item)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item was not found.",
        });

      if (item.completed === true) {
        await ctx.prisma.shoppingList.update({
          where: { id: item.id },
          data: { completed: false },
        });
      } else {
        await ctx.prisma.shoppingList.update({
          where: { id: item.id },
          data: {
            completed: true,
          },
        });
      }
    }),

  
});
