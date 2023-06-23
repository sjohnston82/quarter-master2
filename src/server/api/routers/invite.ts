import { z } from "zod";
import crypto from "crypto";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { sendEmail } from "~/server/helpers/email";

export const inviteRouter = createTRPCRouter({
  addNewInvites: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        householdId: z.string(),
        household: z.string(),
        inviter: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const secretCode = crypto.randomBytes(5).toString("hex");

      const newInvite = await ctx.prisma.invite.create({
        data: {
          email: input.email,
          householdId: input.householdId,
          token: secretCode,
          inviter: input.inviter,
        },
      });
      const emailData = {
        email: input.email,
        household: input.household,
        token: secretCode,
        householdId: input.householdId,
        inviter: input.inviter,
      };
      await sendEmail(emailData).catch((err) => {
        console.log("email failed", err);
      });
    }),

  joinByInviteCode: protectedProcedure
    .input(z.object({ email: z.string(), inviteCode: z.string() }))
    .mutation(
      async ({ ctx: { prisma, session }, input: { email, inviteCode } }) => {
        const currUser = await prisma.invite.findUnique({
          where: {
            email,
          },
        });
        if (!currUser)
          throw new Error("This email address hasn't been sent an invitation!");

        if (currUser.token !== inviteCode)
          throw new Error("The invite code is incorrect!");

        if (!currUser.householdId) throw new Error("No householdId!");

        await prisma.household.update({
          where: {
            householdId: currUser.householdId,
          },
          data: {
            members: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            householdId: currUser.householdId,
          },
        });

        await prisma.invite.delete({
          where: { email },
        });
        return currUser.householdId;
      }
    ),

  deleteInvite: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.invite.delete({
        where: {
          email: input.email,
        },
      });
    }),

  verifyByLink: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.invite.update({
        where: { token: input.token },
        data: {
          isVerified: true,
        },
      });
    }),

  joinOnceVerified: protectedProcedure.mutation(
    async ({ ctx: { session, prisma } }) => {
      const userEmail = session.user.email ?? undefined; // Set null to undefined
      const currUser = await prisma.invite.findUnique({
        where: {
          email: userEmail,
        },
      });
      if (!currUser) throw new Error("This user has not been found!");

      if (currUser.isVerified) {
        const userHouseholdId = currUser.householdId ?? undefined;
        await prisma.household.update({
          where: {
            householdId: userHouseholdId,
          },
          data: {
            members: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            householdId: currUser.householdId,
          },
        });

        await prisma.invite.delete({
          where: { email: userEmail },
        });
        return currUser.householdId;
      }
    }
  ),
});
