import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const sendEmail = async (email, subject, payload,template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure:false,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    ejs.renderFile(__dirname + template, payload , (err, data) => {
        if (err) {
        } else {
            const options = () => {
                return {
                  from: process.env.FROM_EMAIL,
                  to: email,
                  subject: subject,
                  html: data,
                };
              };
              transporter.sendMail(options(), (error, info) => {
                if (error) {
                  return error;
                } else {
                  return res.status(200).json({
                    success: true,
                  });
                }
              });
        }
      });

  } catch (error) {
    return error;
  }
};
