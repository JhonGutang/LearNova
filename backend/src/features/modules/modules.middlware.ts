
import { Request, Response, NextFunction } from 'express';
import { ModulePayload } from "../../interfaces/modules.interface";

export class ModulesValidation {
  static validateCreateModulePayload(req: Request, res: Response, next: NextFunction): void | Response {
    const module: ModulePayload = req.body; // Assuming you're sending data in the request body

    // Validate the payload using the existing validation logic
    if (!module.title || !module.tagline || !module.description || !module.category) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const errors: string[] = [];
    if (typeof module.title !== 'string') {
      errors.push('title must be a text');
    }
    if (typeof module.tagline !== 'string') {
      errors.push('tagline must be a text');
    }
    if (typeof module.description !== 'string') {
      errors.push('description must be a text');
    }
    // category must be an array of strings
    if (!Array.isArray(module.category)) {
      errors.push('It must contain at least one category');
    } else if (!module.category.every((cat: any) => typeof cat === 'string')) {
      errors.push('every category must be a text');
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Invalid field types.', details: errors });
    }

    // If validation passes, call next() to pass control to the next middleware or route handler
    next();
  }

  // Middleware to validate moduleId param for fetching a specific module
  static validateModuleIdParam(req: Request, res: Response, next: NextFunction): void | Response {
    const { moduleId } = req.params;

    // Check if moduleId is missing, empty, or not a valid positive integer
    if (
      typeof moduleId !== 'string' ||
      moduleId.trim() === '' ||
      isNaN(Number(moduleId)) ||
      !/^\d+$/.test(moduleId)
    ) {
      return res.status(400).json({ error: 'Invalid id parameter. It must be a non-empty numeric value.' });
    }

    next();
  }
}
