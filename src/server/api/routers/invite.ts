import { string, z } from "zod";
import crypto from "crypto";
import nodemailer from "nodemailer";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { sendEmail } from "~/server/helpers/email";

const inviteSchema = z.object({
  email: z.string(),
});

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
      sendEmail(emailData).catch((err) => {
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
});
