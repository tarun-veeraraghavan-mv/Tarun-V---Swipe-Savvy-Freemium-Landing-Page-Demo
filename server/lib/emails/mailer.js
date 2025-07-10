// Email related imports
const nodemailer = require("nodemailer");

// Local imports
const prisma = require("../db/prisma");
const {
  welcomeEmailTemplate,
  welcomeEmailSubjectTemplate,
} = require("./welcomeEmailTemplate");
const {
  proSubscriberEmailTemplate,
  proSubscriberSubjectTemplate,
} = require("./proSubscriberEmailTemplate");

// This is the nodemailer setup to send emails via GMAIL
// user: your company's email (e.g. support@swipesavvy.com)
// pass: must be an App Password, not your raw Gmail password.
// If not using 2FA & app password, Gmail will block you instantly.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.SWIPE_SAVVY_COMPANY_EMAIL}`,
    pass: `${process.env.GMAIL_APP_PASSWORD}`,
  },
});

// This function is used to send the user a welcome message
// It is triggered when a user first signs up into the app
exports.sendWelcomeEmail = async (userId, to, name) => {
  // Mail options: Custom template of different parts of mail. Uses
  // 'welcomeEmailSubjectTemplate' to customize the subject of email and
  // 'welcomeEmailTemplate' to customize the main body of the email
  const mailOptions = {
    from: `${process.env.SWIPE_SAVVY_COMPANY_EMAIL}`,
    to,
    subject: welcomeEmailSubjectTemplate(name),
    text: welcomeEmailTemplate(name),
  };

  try {
    // This is the actual function that sends the email based on the mail options
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    // Storing the sent email to DB for analytics, Future UI for
    // email history capabilities and debugging. If successfully sent we
    // set the status to "sent"
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
    // If there is an error in sending the email we still log it but
    // set the status to "fail"
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

// This function is used to send an email to the user when they
// switch to "pro" mode from "free" mode
exports.sendProSubscriptionEmail = async (userId, to, name) => {
  // Mail options: Custom template of different parts of mail. Uses
  // 'proSubscriberSubjectTemplate' to customize the subject of email and
  // 'proSubscriberEmailTemplate' to customize the main body of the email
  const mailOptions = {
    from: `${process.env.SWIPE_SAVVY_COMPANY_EMAIL}`,
    to,
    subject: proSubscriberSubjectTemplate(name),
    text: proSubscriberEmailTemplate(name),
  };

  try {
    // This is the actual function that sends the email based on the mail options
    const info = await transporter.sendMail(mailOptions);

    // Storing the sent email to DB for analytics, Future UI for
    // email history capabilities and debugging. If successfully sent we
    // set the status to "sent"
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
    // If there is an error in sending the email we still log it but
    // set the status to "fail"
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
