import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config.js";
import { authRouter } from "./routes/auth.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Requested-With"]
  })
);
app.use(express.json({ limit: "10kb", strict: true }));
app.use(cookieParser());
app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-8",
    legacyHeaders: false
  }),
  authRouter
);
app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API route not found.", code: "NOT_FOUND" });
});
app.use((request, response) => {
  response.status(404).json({ error: "Not found.", code: "NOT_FOUND" });
});
app.use((error, _request, response, _next) => {
  if (response.headersSent) return;
  if (error?.type === "entity.too.large") {
    response.status(413).json({ error: "Request body is too large.", code: "PAYLOAD_TOO_LARGE" });
    return;
  }
  if (error?.type === "entity.parse.failed") {
    response.status(400).json({ error: "Request body must be valid JSON.", code: "INVALID_JSON" });
    return;
  }
  const status = Number.isInteger(error?.status) ? error.status : 500;
  if (status >= 500) console.error("Unhandled API error.", error?.name ?? "UnknownError");
  response.status(status).json({
    error: status >= 500 ? "An unexpected error occurred." : error.message,
    code: error?.code ?? "INTERNAL_ERROR"
  });
});
