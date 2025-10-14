"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// view engine setup (only needed if you actually render HTML pages)
// You can safely remove this if you only use APIs/GraphQL
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "https://studio.apollographql.com",];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Catch 404 (but skip /graphql so Apollo can handle it)
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // not accessible from JS
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false, // dev only (true in prod w/ HTTPS)
        sameSite: 'lax', // good default for CSRF protection
    },
}));
app.use((req, res, next) => {
    if (req.path.startsWith("/graphql")) {
        return next();
    }
    res.status(404).json({
        message: "Not Found",
        path: req.originalUrl,
    });
});
// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
});
exports.default = app;
