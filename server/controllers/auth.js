const bcrypt = require("bcryptjs");
const prisma = require("../lib/db/prisma");
const { sendWelcomeEmail } = require("../lib/emails/mailer");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, website, receiveSms } = req.body;

    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      res.status(400).json({
        error: "A user with this email already exists! Try again!",
      });
      return;
    }

    const existingUserByPhone = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (existingUserByPhone) {
      res.status(400).json({
        error: "A user with this phone number already exists! Try again!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const sentEmail = await sendWelcomeEmail(user.id, user.email, user.name);

    res.json(user);
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
