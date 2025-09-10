
import express, { Router } from 'express';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.middlware';
const router: Router = express.Router();
const courseController = new CourseController();

router.get('/courses', courseController.getCourses);
router.get('/courses/:courseId', CourseValidation.validateCourseIdParam, courseController.getCourseById);
router.post('/create-course', CourseValidation.validateCreateCoursePayload, courseController.createCourse);

export default router;
