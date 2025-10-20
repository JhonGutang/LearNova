import session from "express-session";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const nodeEnv = process.env.NODE_ENV;

// Debug logging
console.log("=== DEBUG INFO ===");
console.log("NODE_ENV:", nodeEnv);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET ? "***SET***" : "NOT SET");

if (nodeEnv === "STAGING") {
  app.set("trust proxy", 1);
}

// ===== CORRECT MIDDLEWARE ORDER =====

// 1. Basic middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 2. CORS (before session!)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://studio.apollographql.com",
  "https://learnova-lms.onrender.com",
  "https://learnovalms.vercel.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 3. Static files
app.use(express.static(path.join(__dirname, "public")));

// 4. Session configuration
let cookieSameSite: boolean | "lax" | "strict" | "none";
let cookieSecure: boolean;

if (nodeEnv === "LOCAL") {
  cookieSameSite = "lax";
  cookieSecure = false;
} else if (nodeEnv === "STAGING") {
  cookieSameSite = "none";
  cookieSecure = true;
} else {
  cookieSameSite = "none";
  cookieSecure = true;
}

console.log("=== COOKIE SETTINGS ===");
console.log("cookieSameSite:", cookieSameSite);
console.log("cookieSecure:", cookieSecure);
console.log("========================");

// 5. Session middleware (BEFORE cookieParser and passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: cookieSecure,
    sameSite: cookieSameSite,
  },
}));

// 6. Cookie parser (AFTER session) - Optional: You might not even need this
app.use(cookieParser());

// 7. Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// 8. Routes
import authRoutes from "./routes/auth";
app.use("/auth", authRoutes);

// Test endpoint to verify sessions
app.get("/test-session", (req: Request, res: Response) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session data:", req.session);
  
  res.json({
    sessionId: req.sessionID,
    session: req.session,
    cookies: req.cookies,
  });
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/graphql")) {
    return next();
  }
  res.status(404).json({
    message: "Not Found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;