import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { User } from "../models/User.js";

export const authCookieName = "chembioen_session";

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
  };
}

export function issueSession(response, userId) {
  const token = jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: "1d",
    issuer: "chembioen-2027",
    audience: "chembioen-2027-web"
  });
  response.cookie(authCookieName, token, sessionCookieOptions());
}

export async function requireAuth(request, _response, next) {
  try {
    const token = request.cookies?.[authCookieName];
    if (!token) {
      return next({ status: 401, code: "UNAUTHENTICATED", message: "Please log in to continue." });
    }

    const payload = jwt.verify(token, config.jwtSecret, {
      issuer: "chembioen-2027",
      audience: "chembioen-2027-web"
    });
    if (typeof payload === "string" || typeof payload.sub !== "string") {
      return next({ status: 401, code: "UNAUTHENTICATED", message: "Please log in to continue." });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return next({ status: 401, code: "UNAUTHENTICATED", message: "Please log in to continue." });
    }
    request.user = user;
    return next();
  } catch (error) {
    if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
      return next({ status: 401, code: "UNAUTHENTICATED", message: "Please log in to continue." });
    }
    return next(error);
  }
}

export function requireSameOrigin(request, _response, next) {
  if (
    request.get("origin") !== config.frontendOrigin ||
    request.get("x-requested-with") !== "XMLHttpRequest"
  ) {
    return next({
      status: 403,
      code: "INVALID_ORIGIN",
      message: "This request could not be verified. Refresh the page and try again."
    });
  }
  return next();
}
