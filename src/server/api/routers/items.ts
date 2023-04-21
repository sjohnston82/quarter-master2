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

  // createStorageArea: protectedProcedure
  //   .input(z.object({ name: z.string(), householdId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.prisma.storageArea.create({
  //       data: {
  //         name: input.name,
  //         householdId: input.householdId,
  //       },
  //     });
  //   }),
});
