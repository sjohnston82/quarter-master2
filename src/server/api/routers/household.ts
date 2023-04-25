import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const householdRouter = createTRPCRouter({
  createNewHousehold: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { role: "ADMIN" },
      });

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

  getHouseholdId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        householdId: true,
      },
    });
  }),

  getHouseholdInfo: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.household.findUnique({
        where: {
          householdId: input.householdId,
        },
        select: {
          name: true,
          members: true,
          invitedList: true,
          householdId: true,
          _count: true,
        },
      });
    }),

  getHouseholdMembers: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const membersList = await prisma.household.findMany({
        where: {
          householdId: input.householdId,
        },
        select: {
          members: {
            orderBy: {
              joinedAt: "asc",
            },
          },
        },
      });

      return membersList;
    }),

  getInviteList: protectedProcedure
    .input(z.object({ householdId: z.string() }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const inviteList = await prisma.household.findMany({
        where: {
          householdId: input.householdId,
        },
        select: {
          invitedList: true,
        },
      });

      return inviteList;
    }),
});
