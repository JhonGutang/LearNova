import { CourseInput } from '../../../generated/graphql';

// For create
type CreateCourseData = CourseInput & { creator_id: number };

// Existing Query Builders
export const buildFetchAllCoursesQuery = () => {
  return {
    select: {
      id: true,
      title: true,
      tagline: true,
      description: true,
      created_at: true,
      categories: {
        select: {
          category: true,
        },
      },
      creator: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  };
};

export const buildCreateCourseQuery = (courseData: CreateCourseData) => {
  return {
    data: {
      title: courseData.title,
      creator_id: courseData.creator_id,
      tagline: courseData.tagline,
      description: courseData.description,
      categories: {
        create: courseData.categories.map((categoryName) => ({
          category: {
            connectOrCreate: {
              where: { name: categoryName.toLowerCase() },
              create: { name: categoryName.toLowerCase() },
            },
          },
        })),
      },
    },
    include: {
      categories: { include: { category: true } },
    },
  };
};

// Query builder for findStudentEnrolledCoursesWithProgress
export const buildFindStudentEnrolledCoursesWithProgressQuery = (
  studentId: number,
  limit?: number
) => {
  const query: any = {
    where: { student_id: studentId },
    orderBy: {
      updated_at: "desc",
    },
    include: {
      course: {
        include: {
          lessons: true,
          creator: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
      lessonProgress: true,
    },
  };

  if (typeof limit === "number") {
    query.take = limit;
  }

  return query;
};

// Query builder for fetching random courses not enrolled by a student
export const buildRandomCoursesNotEnrolledQuery = (
  enrolledCourseIds: number[] = [],
  limit: number = 5
) => {
  return {
    where: {
      id: { notIn: enrolledCourseIds },
      status: "PUBLISHED"
    },
    orderBy: [
      { id: "desc" }
    ],
    take: limit
  };
};

export const buildFindCourseOrEnrolledCourseQuery = (
  studentId: number,
  courseId: number,
  title: string
) => {
  return {
    where: {
      id: courseId,
      // Make title filter case-insensitive (assumes Prisma and DB support 'mode')
      title: {
        equals: title,
        mode: 'insensitive',
      },
    },
    include: {
      creator: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      lessons: {
        orderBy: {
          id: 'asc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          updated_at: true,
        },
      },
      studentsEnrolled: {
        where: {
          student_id: studentId,
        },
        select: {
          id: true,
          student_id: true,
          created_at: true,
          lessonProgress: {
            select: {
              id: true,
              lesson_id: true,
              status: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
        take: 1,
      },
    },
  };
};


export const buildSearchCoursesWithEnrollmentQuery = (
  studentId: number,
  searchTerm: string
) => {
  return {
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive' as const,
      },
    },
    include: {
      creator: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      studentsEnrolled: {
        where: {
          student_id: studentId,
        },
        select: {
          id: true, // enrolled course id
        },
        take: 1,
      },
    },
  };
};