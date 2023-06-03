import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter, protectedProcedure
} from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  addToShoppingList: protectedProcedure
    .input(
      z.object({
        householdId: z.string(),
        name: z.string(),
        location: z.string(),
        amount: z.number().optional(),
        amountType: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.shoppingList.create({
        data: {
          householdId: input.householdId,
          name: input.name,
          location: input.location,
          amount: input.amount,
          amountType: input.amountType,
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

  deleteItemFromShoppingList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.shoppingList.delete({
        where: { id: input.id },
      });
    }),

  deleteAllCompleteItems: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.shoppingList.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),

  editShoppingItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        amount: z.number().nullable().optional(),
        amountType: z.string().nullable().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currItem = await ctx.prisma.shoppingList.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!currItem)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shopping item not found.",
        });

      await ctx.prisma.shoppingList.update({
        where: { id: currItem.id },
        data: {
          name: input.name,
          amount: input.amount,
          amountType: input.amountType,
          location: input.location,
        },
      });
    }),
});
