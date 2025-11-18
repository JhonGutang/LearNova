import { BarChart } from "../../../generated/graphql";

type StudentEnrolled = { id: number };
type Lesson = { id: number };
type Course = {
  id: number;
  title: string;
  studentsEnrolled: StudentEnrolled[];
  lessons: Lesson[];
};
type SortedCourse = Course & {
  enrolleesCount: number;
  lessonsCount: number;
};

export interface IStatisticsService {
  getBarChartsForCreator(creatorId: number): Promise<BarChart[]>;
  getTotalEnrolleesAndCoursesForCreator(creatorId: number): Promise<{ totalEnrollees: number; totalCourses: number }>;
}

function compareByEnrolleesCountDesc(a: SortedCourse, b: SortedCourse): number {
  return b.enrolleesCount - a.enrolleesCount;
}

function hasNoLessons(course: SortedCourse): boolean {
  return course.lessonsCount === 0;
}

function hasNoEnrolledCourseIds(enrolledCourseIds: number[]): boolean {
  return enrolledCourseIds.length === 0;
}

function isCourseCompletedForStudent(progressCount: number | undefined, lessonsCount: number): boolean {
  return progressCount !== undefined && progressCount === lessonsCount;
}

export class StatisticsService implements IStatisticsService {
  private prisma: any;

  constructor(prismaInstance: any) {
    this.prisma = prismaInstance;
  }

  async getBarChartsForCreator(creatorId: number): Promise<BarChart[]> {
    const courses: Course[] = await this.prisma.course.findMany({
      where: { creator_id: creatorId },
      select: {
        id: true,
        title: true,
        studentsEnrolled: {
          select: { id: true }
        },
        lessons: {
          select: { id: true }
        }
      }
    });

    const sortedCourses: SortedCourse[] = courses
      .map((course: Course): SortedCourse => ({
        ...course,
        enrolleesCount: course.studentsEnrolled.length,
        lessonsCount: course.lessons.length
      }))
      .sort(compareByEnrolleesCountDesc)
      .slice(0, 3);

    const barCharts: BarChart[] = await Promise.all(
      sortedCourses.map(async (course: SortedCourse) => {
        if (hasNoLessons(course)) {
          return {
            id: course.id,
            title: course.title,
            totalEnrollees: course.enrolleesCount,
            completionRate: 0
          };
        }

        const enrolledCourseIds: number[] = course.studentsEnrolled.map(
          (se: StudentEnrolled) => se.id
        );

        if (hasNoEnrolledCourseIds(enrolledCourseIds)) {
          return {
            id: course.id,
            title: course.title,
            totalEnrollees: 0,
            completionRate: 0
          };
        }

        const progressGrouped = await this.prisma.lesson_Progress.groupBy({
          by: ['enrolled_course_id'],
          where: {
            enrolled_course_id: { in: enrolledCourseIds },
            status: 'FINISHED'
          },
          _count: { id: true }
        });

        const progressCountMap: Record<number, number> = {};
        for (const g of progressGrouped) {
          progressCountMap[g.enrolled_course_id] = g._count.id;
        }

        let completedCount = 0;
        for (const eid of enrolledCourseIds) {
          if (isCourseCompletedForStudent(progressCountMap[eid], course.lessonsCount)) {
            completedCount += 1;
          }
        }

        const completionRate =
          course.enrolleesCount > 0
            ? Number((completedCount / course.enrolleesCount).toFixed(2))
            : 0;

        return {
          id: course.id,
          title: course.title,
          totalEnrollees: course.enrolleesCount,
          completionRate
        };
      })
    );

    return barCharts;
  }

  async getTotalEnrolleesAndCoursesForCreator(
    creatorId: number
  ): Promise<{ totalEnrollees: number; totalCourses: number }> {
    const courses = await this.prisma.course.findMany({
      where: { creator_id: creatorId },
      select: { id: true }
    });

    const courseIds = courses.map((c: { id: number }) => c.id);

    const totalCourses = courses.length;

    let totalEnrollees = 0;
    if (courseIds.length > 0) {
      const studentIdsResult = await this.prisma.enrolled_Course.findMany({
        where: {
          course_id: { in: courseIds }
        },
        select: {
          student_id: true
        },
        distinct: ['student_id']
      });

      totalEnrollees = studentIdsResult.length;
    }

    return {
      totalCourses,
      totalEnrollees,
    };
  }
}
