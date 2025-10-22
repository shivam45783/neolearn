import { Router } from "express";
import { sendMail } from "../middleware/mailer.js";

const mailRouter = Router();

mailRouter.post("/send-mail", sendMail);


export default mailRouter;