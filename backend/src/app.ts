import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();

// view engine setup (only needed if you actually render HTML pages)
// You can safely remove this if you only use APIs/GraphQL
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Catch 404 (but skip /graphql so Apollo can handle it)

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,              // not accessible from JS
    maxAge: 1000 * 60 * 60,      // 1 hour
    secure: false,               // dev only (true in prod w/ HTTPS)
    sameSite: 'lax',             // good default for CSRF protection
  },
}));

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
