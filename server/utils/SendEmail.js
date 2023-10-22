import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export const sendEmail = async (email, subject, payload, template) => {
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


    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: `Hi Ashish Here is Link`,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
