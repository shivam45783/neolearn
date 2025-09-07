import {Router} from "express";
import { getGoogleLoginPage, getGoogleLoginCallback } from "../controllers/auth.controller.js";
const router = Router();

router.route("/google").get(getGoogleLoginPage);
router.route("/google/callback").get(getGoogleLoginCallback);
export default router;
