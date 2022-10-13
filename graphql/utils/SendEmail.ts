import nodemailer from 'nodemailer';
import { v4 } from 'uuid';
import Redis from 'ioredis';
import { confirmUserPrefix } from '../constants';

const nodemailer_user = process.env.nodemailer_user!;
const nodemailer_password = process.env.nodemailer_password!;
export const redis = new Redis();

export async function sendEmail(email: string, url: string) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: nodemailer_user,
      pass: nodemailer_password,
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: `"Integrity Pro" <${nodemailer_user}>`, // sender address
    to: email, // list of receivers
    subject: "Integrity Pro Reset Password", // Subject line
    html: `<p>Click <a href="${url}">here</a> to reset password</p>`, // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24);

  return `http://localhost:3000/user/confirm/${token}`;
}