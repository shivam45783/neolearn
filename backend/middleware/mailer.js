import nodemailer from "nodemailer";
import prisma from "../utils/db.js";
import jwt from "jsonwebtoken";
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendMail = async (req, res) => {
  const { token, subject } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(token);
  let email = "";
  let name = "";
  if (decoded) {
    email = decoded.email;
    name =
      await prisma.$queryRaw`SELECT name FROM users WHERE email = ${decoded.email}`;
    name = name[0].name;
  } else {
    console.log("Invalid token or unable to decode");
    return;
  }

  const otp = generateOTP();
  await prisma.$queryRaw`UPDATE users SET otp = ${otp} WHERE email = ${email}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const logoUrl =
    "https://res.cloudinary.com/dpyvbrvuc/image/upload/v1761137872/logo_transparent_clvk9x.png";
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: `
        <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>NeoLearn OTP Verification</title>
      <style>
        @media only screen and (max-width: 700px) {
          .container {
            width: 90% !important;
            padding: 20px !important;
          }

          .otp {
            font-size: 20px !important;
            padding: 12px 20px !important;
          }

          .title {
            font-size: 20px !important;
          }

          .message {
            font-size: 14px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background: linear-gradient(to right, #0f172a, #1e293b); min-height: 100vh; width: 100%; text-align: center;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table class="container" width="100%" cellpadding="0" cellspacing="0" border="0"
              style="max-width: 500px; background: #1f2937; border-radius: 15px; padding: 30px; text-align: center; font-family: 'Poppins', sans-serif; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
              <tr>
                <td>
                  <img src="${logoUrl}" alt="NeoLearn Logo" width="70"/>
                  <h2 class="title" style="font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 15px; margin-bottom: 20px;">NeoLearn</h2>
                  <h2 class="title" style="font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 15px;">${subject}</h2>
                  <p class="message" style="font-size: 16px; color: #cbd5e1; margin: 0 0 25px;">
                    Hello ${name}👋,<br />
                    Use the OTP below to verify your email address. It is valid for the next 10 minutes.
                  </p>
                  <div class="otp" style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; color: #fff; background: linear-gradient(to right, #3b82f6, #60a5fa); border-radius: 10px; letter-spacing: 4px; margin-bottom: 25px;">
                    ${otp}
                  </div>
                  <p class="message" style="font-size: 16px; color: #cbd5e1; margin: 0 0 20px;">
                    If you didn't request this, please ignore this email.
                  </p>
                  <hr style="border-color: #334155;" />
                  <p class="footer" style="font-size: 12px; color: #94a3b8; margin-top: 30px;">© 2025 NeoLearn. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>

        `,
  };
  try {
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        await prisma.$queryRaw(
          `UPDATE users SET otp = NULL WHERE email = ${email}`
        );
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: true,
          message: "Email sent successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    await prisma.$queryRaw(
      `UPDATE users SET otp = NULL WHERE email = ${email}`
    );
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

export { sendMail };
