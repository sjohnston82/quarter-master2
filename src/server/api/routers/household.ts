import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const householdRouter = createTRPCRouter({
  createNewHousehold: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.household.create({
        data: {
          name: input.name,
          members: {
            connect: { id: userId }, // set the table join
          },
        },
        include: {
          members: true, // join the household and members in the return
        },
      });
    }),
});
