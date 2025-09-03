import nodemailer from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "outbound.mailhop.org",
    port: 465,
    secure: true,
    auth: {
      user: "ecom88",
      pass: "Sys#%adm88n",
    },
    logger: true,
    debug: true,
  });

  await transporter.sendMail({
    from: '"Hice Support" <support@hice.com.au>',
    to,
    subject: "Reset your password within ten mins!",
    text: "",
    html,
  });
};
