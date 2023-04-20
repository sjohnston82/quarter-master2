import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
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
});
