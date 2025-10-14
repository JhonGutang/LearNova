"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const courseNormalizer_1 = require("../../utils/courseNormalizer");
class CourseService {
    constructor(courseRepository, lessonRepository, levelSystemService // Inject LevelSystemService
    ) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.levelSystemService = levelSystemService;
    }
    async create(courseData) {
        const existingCourse = await this.courseRepository.findByTitle(courseData.title);
        if (existingCourse) {
            throw new Error('A course with this title already exists.');
        }
        const newCourse = await this.courseRepository.create(courseData);
        return (0, courseNormalizer_1.normalizeCourse)(newCourse, { includeCreatorName: false, includeLessons: false });
    }
    async enroll(courseId, studentId) {
        try {
            await this.courseRepository.createEnrollment(courseId, studentId);
            return true;
        }
        catch (error) {
            if (error.code === "P2002") {
                return false;
            }
            return false;
        }
    }
    async getEnrolledCourses(studentId) {
        const enrolledCourses = await this.courseRepository.findEnrolledCoursesByStudentId(studentId);
        return enrolledCourses
            .filter((enrolled) => enrolled.course)
            .map((enrolled) => (0, courseNormalizer_1.normalizeCourse)(enrolled.course, { includeCreatorName: true, includeLessons: false }));
    }
    async getSpecificCourse(courseId, title, options) {
        // Fetch course data with repository
        const course = await this.courseRepository.findByIdAndTitle(courseId, title, options?.creatorId);
        if (!course) {
            return null;
        }
        // Handle student-specific logic: check enrollment status
        if (options?.studentId) {
            const enrollmentStatus = await this.courseRepository.checkEnrollmentStatus(courseId, options.studentId);
            // Also check lesson progress if enrolledCourseId exists
            let lessonProgress = [];
            if (enrollmentStatus.enrolledCourseId) {
                lessonProgress = await this.lessonRepository.findLessonProgressByEnrollment(enrollmentStatus.enrolledCourseId);
            }
            return (0, courseNormalizer_1.normalizeCourse)(course, {
                includeCreatorName: true,
                includeLessons: true,
                enrolledCourseId: enrollmentStatus.enrolledCourseId,
                lessonProgress: lessonProgress, // Pass lesson progress to normalizeCourse
            });
        }
        // Default response (for creators or public access)
        return (0, courseNormalizer_1.normalizeCourse)(course, {
            includeCreatorName: true,
            includeLessons: true,
        });
    }
    async getAllCourses(options = {}) {
        const { creatorId, studentId } = options;
        // Delegate data fetching to repository
        const courses = await this.courseRepository.findAllCourses({
            creatorId,
            studentId,
        });
        // Business logic: Transform data for GraphQL
        return courses.map((course) => {
            const isEnrolled = (course.studentsEnrolled?.length ?? 0) > 0 ? true : false;
            return (0, courseNormalizer_1.normalizeCourse)(course, {
                includeCreatorName: true,
                includeLessons: false,
                isEnrolled,
            });
        });
    }
    async startProgress(enrolledCourseId, lessonId) {
        try {
            const existingProgress = await this.lessonRepository.findLessonProgress({ enrolledCourseId, lessonId });
            if (existingProgress) {
                return {
                    progressStatus: "IN_PROGRESS",
                    message: "This lesson is already " + existingProgress.status
                };
            }
            const newProgress = await this.lessonRepository.createLessonProgress(enrolledCourseId, lessonId);
            return {
                progressStatus: "STARTED",
                message: "This lesson is now " + newProgress.status
            };
        }
        catch (error) {
            return {
                progressStatus: "FAILED",
                message: "Error creating lesson progress: " + error
            };
        }
    }
    async finishProgress(studentId, lessonId) {
        const existingProgress = await this.lessonRepository.findLessonProgress({ studentId, lessonId });
        console.log(existingProgress);
        if (!existingProgress) {
            return {
                progressStatus: "FAILED",
                message: "User doesn't have progress with this lesson"
            };
        }
        if (existingProgress.status &&
            existingProgress.status.toUpperCase() === "FINISHED") {
            return {
                progressStatus: "FINISHED",
                message: "Lesson progress is already marked as FINISHED.",
            };
        }
        try {
            await this.lessonRepository.updateLessonProgressStatus(Number(existingProgress.id), "FINISHED");
            let expGained = undefined;
            if (existingProgress.lesson &&
                typeof existingProgress.lesson.exp === "number") {
                expGained = existingProgress.lesson.exp;
            }
            let levelUpResult = null;
            if (typeof expGained === "number" && expGained > 0) {
                levelUpResult = await this.levelSystemService.levelUp(studentId, expGained);
            }
            let message = "Lesson progress marked as FINISHED";
            if (levelUpResult) {
                message += ` and student awarded ${expGained} EXP.`;
            }
            return {
                progressStatus: "FINISHED",
                message
            };
        }
        catch (error) {
            return {
                progressStatus: "FAILED",
                message: "Error updating lesson progress: " + error
            };
        }
    }
}
exports.CourseService = CourseService;
