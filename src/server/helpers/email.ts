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
      
      <table width="100%" cellspacing="0" cellpadding="0">
  <tr>
      <td>
          <table cellspacing="0" cellpadding="0">
              <tr>
                  <td style="border-radius: 2px;" bgcolor="#ED2939">
                      <a href="https://quarter-master.net/firstLogin/joinByEmail/${token}" target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                          Click to Join Household            
                      </a>
                  </td>
              </tr>
          </table>
      </td>
  </tr>
</table>
    `,
  });
};
