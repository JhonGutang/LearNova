import "express-session";

declare module "express-session" {
  interface SessionData {
    creatorId?: number; // add your custom session field
  }
}
