import { z } from "zod";

import {
  createTRPCRouter, protectedProcedure
} from "~/server/api/trpc";

export const storageAreasRouter = createTRPCRouter({
  getStorageAreas: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      const storageAreas = await ctx.prisma.storageArea.findMany({
        where: {
          householdId: input.householdId,
        },
        select: {
          name: true,
          _count: true,
          id: true,
          items: true,
        },
      });

      return storageAreas;
    }),

  createStorageArea: protectedProcedure
    .input(z.object({ name: z.string(), householdId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.storageArea.create({
        data: {
          name: input.name,
          householdId: input.householdId,
        },
      });
    }),

  getStorageAreaById: protectedProcedure.input(z.object({ storageAreaId: z.string()})).query(async ({ ctx, input }) => {
    const currStorageArea = await ctx.prisma.storageArea.findUnique({
      where: { 
        id: input.storageAreaId,
      }
    })

    return currStorageArea
  })
});
