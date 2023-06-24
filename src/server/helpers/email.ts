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
      
      Your code to join is: ${token}

      Visit <a href="https://www.quarter-master.net">Quartermaster</a> to get started!
    `,
  });
};
