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
export const buildFindStudentEnrolledCoursesWithProgressQuery = (studentId: number) => {
  return {
    where: { student_id: studentId },
    orderBy: {
      updated_at: "desc",
    },
    take: 2,
    include: {
      course: {
        include: {
          lessons: true,
        },
      },
      lessonProgress: true,
    },
  };
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