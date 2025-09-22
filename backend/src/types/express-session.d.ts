import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number; // add your custom session field
  }
}
