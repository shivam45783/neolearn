import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../utils/db.js";
import validator from "validator";

const createAccessToken = (user) => {
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
const createRefreshToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  name.trim();
  email.trim();
  password.trim();

  try {
    const existingUser =
      await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length && existingUser[0].otp === null) {
      return res.status(409).json({
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
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
        status: 400,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user =
      await prisma.$queryRaw`INSERT INTO users (name, email, password, role) VALUES (${name}, ${email}, ${hashedPassword}, ${role})`;

    const userCreated =
      await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
    const access_token = createAccessToken(userCreated[0]);
    const refresh_token = createRefreshToken(userCreated[0]);
    await prisma.$queryRaw`UPDATE users SET refresh_token = ${refresh_token} WHERE email = ${email}`;
    console.log("user", userCreated[0]);
    // res.cookie("access_token", access_token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "User registered successfully",
      status: 201,
      data: { user: userCreated[0], access_token, refresh_token },
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

const verifyOTP = async (req, res) => {
  try {
    const { token, otp } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const storedOTP = await prisma.$queryRaw`
      SELECT otp, otp_expiry_time FROM users WHERE email = ${email}
    `;
    // console.log(storedOTP[0]);
    
    if (!storedOTP.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
    const now = new Date();
    if (new Date(storedOTP[0].otp_expiry_time) < now) {
      await prisma.$queryRaw`
        UPDATE users 
        SET otp = null, isEmailVerified = false 
        WHERE email = ${email}
      `;
      return res.status(401).json({
        success: false,
        message: "OTP has expired",
        status: 401,
      });
    }

    if (storedOTP[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        status: 400,
      });
    }

    await prisma.$queryRaw`
      UPDATE users 
      SET otp = null, isEmailVerified = true 
      WHERE email = ${email}
    `;
    const data =
      await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      status: 200,
      data: data[0],
    });
  } catch (e) {
    console.log("Error verifying OTP:", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during OTP verification",
      status: 500,
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(401).json({ message: "No user id provided in get user" });
  }
  const result =
    await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`;
  const user = result[0];
  return res.json({
    success: true,
    message: "User fetched successfully",
    status: 200,
    data: user,
  });
};

const getFreshTokens = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const userId = decoded.id;
    const result =
      await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`;
    const user = result[0];
    const access_token = createAccessToken(user);
    const refresh_token = createRefreshToken(user);
    await prisma.$queryRaw`UPDATE users SET refresh_token = ${refresh_token} WHERE id = ${userId}`;

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
      data: { user, access_token, refresh_token },
    });
  } catch (e) {}
};
export { registerUser, verifyOTP, getUser, getFreshTokens };
