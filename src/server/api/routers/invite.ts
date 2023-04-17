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
        },
      });
      const emailData = {
        email: input.email,
        household: input.household,
        token: secretCode,
        householdId: input.householdId,
        inviter: input.inviter
      };
      sendEmail(emailData).catch((err) => {
        console.log("email failed", err);
      });
    }),
});
