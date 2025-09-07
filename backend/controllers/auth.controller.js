// import  prisma from "../index.js";
import {
  Google,
  decodeIdToken,
  generateCodeVerifier,
  generateState,
} from "arctic";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const google  = new arctic.Google(cleintId)
import { OAUTH_EXCHANGE_EXPIRY } from "../config/constants.js";
import { google } from "../lib/oauth/google.js";
import { json } from "express";
import { getUserWithOAuthId } from "../services/auth.service.js";

const getGoogleLoginPage = async (req, res) => {
  // res.send("Hello Google");
  if (req.user) return res.redirect("/dashboard");
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid", // this is called scopes, here we are giving openid and profile
    "profile",
    "email",
  ]);

  const cookieConfig = {
    httpOnly: true,
    secure: true,
    maxAge: OAUTH_EXCHANGE_EXPIRY, // 1 day
    sameSite: "lax", // this is such that when google redirect to our callback url, it will maintain the cookies
  };
  res.cookie("google_oauth_state", state, cookieConfig);
  res.cookie("google_code_verifier", codeVerifier, cookieConfig);
  res.redirect(url.toString());
  console.log(url.toString());
};

const getGoogleLoginCallback = async (req, res) => {
  // google redirects with code and state in query params ans we will use this code to find out the user
  const { code, state } = req.query;
  console.log(code, state);

  const {
    google_oauth_state: storedState,
    google_code_verifier: codeVerifier,
  } = req.cookies;

  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    req.flash(
      "error",
      "Couldn't login with Google because of invalid login attempt. Please try again!"
    );
    return res.redirect("/auth");
  }

  let tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (error) {
    req.flash(
      "error",
      "Couldn't login with Google because of invalid login attempt. Please try again!"
    );
    return res.redirect("/auth");
  }
  console.log("token:", tokens);
  const claims = decodeIdToken(tokens.idToken());
  const { sub: googleUserId, name, email } = claims;

  // if user is already linked with google account
  let user = await getUserWithOAuthId({ email, provider: "google" });

  // if user exists but is not linked with oauth
  if (user && !user.providerAccountId) {
    
  }
};

export { getGoogleLoginPage, getGoogleLoginCallback };
