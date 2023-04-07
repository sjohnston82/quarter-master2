import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const householdRouter = createTRPCRouter({
  createNewHousehold: protectedProcedure
     .input(z.string().min(1).max(50))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.household.create({
        data: {
          name: input,
          members: {
            connect: { id: userId }, // set the table join
          },
        },
        include: {
          members: true, // join the household and members in the return
        },
      });
    }),
   
    }),
});
