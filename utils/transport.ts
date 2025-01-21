import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.VERIFICATION_EMAIL,
    pass: process.env.MAILTRAP_PASS,
  },
});

export default transporter;
