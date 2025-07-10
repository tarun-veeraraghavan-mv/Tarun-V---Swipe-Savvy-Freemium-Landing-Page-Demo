const bcrypt = require("bcryptjs");
const prisma = require("../lib/db/prisma");
const { sendWelcomeEmail } = require("../lib/emails/mailer");

// FUNCTION: registerUser()

// DESCRIPTION: This function registers the user into the Swipe
// Savvy platform. It checks for duplicate email and phone number
// It hashes the user's password securly via bcrypt
// It sends a welcome email
// When the user first register's they will be defaulted under the "free" plan
// This is will be later changed when they upgrade to the PRO subscription

// ROUTE: POST /register

// PARAMS: Request body contains:
// name: name of user (string)
// email: email of user (string)
// phone: phone number of user (string)
// password: password of user's account (string)
// website: the business's offical webiste. This is optional
// and defaults to "Not provided" (string)
// receiveSms: user can agree if they want to recieve SMS notifications
// or not. This is optional (boolean)

// RETURNS: a user object in JSON format

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, website, receiveSms } = req.body;

    // check existanc of user via email
    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // throws error if another user has same email
    if (existingUserByEmail) {
      res.status(400).json({
        error: "A user with this email already exists! Try again!",
      });
      return;
    }

    // check existanc of user via phone
    const existingUserByPhone = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    // throws error if another user has same phone number
    if (existingUserByPhone) {
      res.status(400).json({
        error: "A user with this phone number already exists! Try again!",
      });
      return;
    }

    // Hashing the password. 10 is the salt number. Higher the salt,
    // higher the security but takes more times
    const hashedPassword = await bcrypt.hash(password, 10);

    // storing the user to db
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        receiveSms,
        website: website || "Not provided",
        plan: "free",
      },
    });

    // sending welcome email to user on signup
    const sentEmail = await sendWelcomeEmail(user.id, user.email, user.name);

    // excluding rhe password before sending it to the client. Makes
    // app more secure
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({
        error: err.message,
      });
    } else {
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
};
