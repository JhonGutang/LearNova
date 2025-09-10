import { Request, Response } from 'express';  // Import express types
import { CourseService } from './courses.service';


export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getAll();
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error getting course:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  createCourse = async (req: Request, res: Response) => {
    try {
      const newCourse = await this.courseService.create(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  getCourseById = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const course = await this.courseService.getById(courseId);
      if (course === null) {
        return res.status(404).json({ error: 'Course not Found' });
      }
      return res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: `Internal server error: ${error}` });
    }
  }


}
