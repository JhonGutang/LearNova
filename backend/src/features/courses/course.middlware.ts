
import { Request, Response, NextFunction } from 'express';
import { CoursePayload } from "../../interfaces/course.interface";

export class CourseValidation {
  static validateCreateCoursePayload(req: Request, res: Response, next: NextFunction): void | Response {
    const course: CoursePayload = req.body; // Assuming you're sending data in the request body

    // Validate the payload using the existing validation logic
    if (!course.title || !course.tagline || !course.description || !course.categories) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const errors: string[] = [];
    if (typeof course.title !== 'string') {
      errors.push('title must be a text');
    }
    if (typeof course.tagline !== 'string') {
      errors.push('tagline must be a text');
    }
    if (typeof course.description !== 'string') {
      errors.push('description must be a text');
    }
    // categories must be an array of strings and at least one category
    if (!Array.isArray(course.categories) || course.categories.length === 0) {
      errors.push('categories must be a non-empty array');
    } else if (!course.categories.every((cat: any) => typeof cat === 'string')) {
      errors.push('every category must be a text');
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Invalid field types.', details: errors });
    }

    // If validation passes, call next() to pass control to the next middleware or route handler
    next();
  }

  // Middleware to validate courseId param for fetching a specific course
  static validateCourseIdParam(req: Request, res: Response, next: NextFunction): void | Response {
    const { courseId } = req.params;

    // Check if courseId is missing, empty, or not a valid positive integer
    if (
      typeof courseId !== 'string' ||
      courseId.trim() === '' ||
      isNaN(Number(courseId)) ||
      !/^\d+$/.test(courseId)
    ) {
      return res.status(400).json({ error: 'Invalid id parameter. It must be a non-empty numeric value.' });
    }

    next();
  }
}
