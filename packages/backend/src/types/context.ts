import type { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  session: Request["session"]; // <-- grabs the right type automatically
}
