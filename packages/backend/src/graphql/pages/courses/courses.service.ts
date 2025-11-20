import { CourseCategory, CoursesPage, Course } from "../../../generated/graphql";
import { CourseService } from "../../features/courses/courses.service";
import { formatStudentProfile } from "../../../utils/studentProfileFormatter";
import { PrismaClient } from "../../../../generated/prisma";
import { FavoriteCourseRepository } from "../../features/favorite-courses/favorite-course.repository";

interface CoursesServiceInterface {
    getData(category: CourseCategory, studentId: number): Promise<CoursesPage>;
}

export class CoursesService implements CoursesServiceInterface {
    private prisma: PrismaClient;
    private courseService: CourseService;
    private favoriteCourseRepository: FavoriteCourseRepository;

    constructor(prisma: PrismaClient, courseService: CourseService) {
        this.prisma = prisma;
        this.courseService = courseService;
        this.favoriteCourseRepository = new FavoriteCourseRepository(prisma);
    }

    async getData(category: CourseCategory, studentId: number): Promise<CoursesPage> {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        const studentProfile = formatStudentProfile(student);
        const favoriteCourseIds = await this.favoriteCourseRepository.getFavoriteCourseIds(studentId);

        const addIsFavoriteFlag = (courses: Course[]): Course[] => {
            return courses.map(course => ({
                ...course,
                isFavorite: favoriteCourseIds.includes(Number(course.id))
            }));
        };

        switch (category) {
            case CourseCategory.All: {
                const allCourses = await this.courseService.coursesForStudents(studentId);
                return {
                    student: studentProfile,
                    courses: addIsFavoriteFlag(allCourses),
                } as CoursesPage;
            }
            case CourseCategory.Featured: {
                const allCourses = await this.courseService.coursesForStudents(studentId);
                const featuredCourses = allCourses.slice(0, 3);
                return {
                    student: studentProfile,
                    courses: addIsFavoriteFlag(featuredCourses),
                } as CoursesPage;
            }
            case CourseCategory.Enrolled: {
                const enrollCourse = await this.courseService.studentEnrolledCourses(studentId);
                return {
                    student: studentProfile,
                    courses: addIsFavoriteFlag(enrollCourse),
                } as CoursesPage;
            }
            default:
                throw new Error('Invalid course category');
        }
    }
}