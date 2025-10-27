import { Router } from "express";
import { sendMail } from "../middleware/mailer.js";
import { verifyOTP } from "../controllers/auth.controller.js";

const mailRouter = Router();

mailRouter.post("/send-mail", sendMail);


export default mailRouter;