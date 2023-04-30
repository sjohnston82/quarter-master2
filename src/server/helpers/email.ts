import nodemailer from "nodemailer";

interface EmailProps {
  email: string;
  household: string;
  householdId: string;
  token: string;
  inviter: string;
}

export const sendEmail = async ({
  email,
  household,
  token,
  inviter,
}: EmailProps) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  const message = await transporter.sendMail({
    from: "'QuarterMaster' <quartermasterinvites@getMaxListeners.com>",
    to: email,
    subject: "You have been invited to a Household on QuarterMaster!",
    html: `
      <h1>You have been invited to the ${household} Household on QuarterMaster by ${inviter}!</h1>
      <p>Copy the following code after logging in at <a href="https://quarter-master2.vercel.app">https://quarter-master2.vercel.app</a> to join your household!</p>
      <p>Your join code is: ${token}</p>

    `,
  });
};
