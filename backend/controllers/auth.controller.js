import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../utils/db.js";
import validator from "validator";

const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser =
      await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser && existingUser.otp === null) {
      return res.json({
        success: false,
        message: "User already exists",
        status: 409,
      });
    }
    if (existingUser && existingUser.otp !== null) {
      await prisma.$queryRaw`DELETE FROM users WHERE email = ${email}`;
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email",
        status: 400,
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
        status: 400,
      });
    }
   
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user =
      await prisma.$queryRaw`INSERT INTO users (name, email, password, role) VALUES (${name}, ${email}, ${hashedPassword}, ${role})`;

    const userCreated = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
    const token = createToken(userCreated[0]);
    console.log("user", userCreated[0]);
    
    return res.json({
      success: true,
      message: "User registered successfully",
      status: 201,
      data: { user: userCreated[0], token },
    });
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    return res.json({
      success: false,
      message: "Something went wrong",
      status: 500,
    });
  }
};

export { registerUser };
