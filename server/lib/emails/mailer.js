const nodemailer = require("nodemailer");
const prisma = require("../db/prisma");
const {
  welcomeEmailTemplate,
  welcomeEmailSubjectTemplate,
} = require("./welcomeEmailTemplate");
const {
  proSubscriberEmailTemplate,
  proSubscriberSubjectTemplate,
} = require("./proSubscriberEmailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.SWIPE_SAVVY_COMPANY_EMAIL}`,
    pass: `${process.env.GMAIL_APP_PASSWORD}`,
  },
});

exports.sendWelcomeEmail = async (userId, to, name) => {
  try {
    const mailOptions = {
      from: `${process.env.SWIPE_SAVVY_COMPANY_EMAIL}`,
      to,
      subject: welcomeEmailSubjectTemplate(name),
      text: welcomeEmailTemplate(name),
    };

    const info = transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Failed to send email:", err.message);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });

    await prisma.sentEmail.create({
      data: {
        to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        status: "sent",
        userId,
      },
    });
  } catch (err) {
    console.error("Error in sendWelcomeEmail:", err.message);

    await prisma.sentEmail.create({
      data: {
        to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        status: "failed",
        userId,
      },
    });
  }
};

exports.sendProSubscriptionEmail = async (userId, to, name) => {
  try {
    const mailOptions = {
      from: "tarunv1911@gmail.com",
      to,
      subject: proSubscriberSubjectTemplate(name),
      text: proSubscriberEmailTemplate(name),
    };

    const info = transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Failed to send email:", err.message);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });

    await prisma.sentEmail.create({
      data: {
        to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        status: "sent",
        userId,
      },
    });
  } catch (err) {
    console.error("Error in sendWelcomeEmail:", err.message);

    await prisma.sentEmail.create({
      data: {
        to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        status: "failed",
        userId,
      },
    });
  }
};
