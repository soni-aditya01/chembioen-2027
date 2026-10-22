import { Router } from "express";
import bcrypt from "bcryptjs";
import { authCookieName, issueSession, requireAuth, requireSameOrigin, sessionCookieOptions } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { loginSchema, registrationSchema } from "../validation/auth.js";

export const authRouter = Router();
const dummyPasswordHash = await User.hashPassword("invalid-account-password");

function sendValidationError(response, error) {
  return response.status(400).json({
    error: "Please check the highlighted fields.",
    code: "VALIDATION_ERROR",
    details: error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }))
  });
}

authRouter.post("/register", requireSameOrigin, async (request, response, next) => {
  const parsed = registrationSchema.safeParse(request.body);
  if (!parsed.success) return sendValidationError(response, parsed.error);

  try {
    const { confirmPassword, password, ...profile } = parsed.data;
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ ...profile, passwordHash });
    issueSession(response, user.id);
    return response.status(201).json({
      message: "Your account has been created.",
      user: user.toPublicProfile()
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.email) {
      return response.status(409).json({
        error: "An account with this email address already exists.",
        code: "EMAIL_ALREADY_REGISTERED"
      });
    }
    return next(error);
  }
});

authRouter.post("/login", requireSameOrigin, async (request, response, next) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) return sendValidationError(response, parsed.error);

  try {
    const user = await User.findOne({ email: parsed.data.email }).select("+passwordHash");
    const validPassword = user
      ? await user.verifyPassword(parsed.data.password)
      : await bcrypt.compare(parsed.data.password, dummyPasswordHash);
    if (!user || !validPassword) {
      return response.status(401).json({
        error: "Email or password is incorrect.",
        code: "INVALID_CREDENTIALS"
      });
    }

    issueSession(response, user.id);
    return response.status(200).json({
      message: "You are now logged in.",
      user: user.toPublicProfile()
    });
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/me", requireAuth, (request, response) => {
  response.status(200).json({ user: request.user.toPublicProfile() });
});

authRouter.post("/logout", requireSameOrigin, (_request, response) => {
  const { maxAge: _maxAge, ...clearOptions } = sessionCookieOptions();
  response.clearCookie(authCookieName, clearOptions);
  response.status(200).json({ message: "You have been logged out." });
});
