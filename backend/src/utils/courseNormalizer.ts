import { Course } from "../generated/graphql";

// Helper function to format a value as "Month Day, Year" if possible
function formatDateValue(value: unknown): string | null {
  let date: Date | null = null;

  if (value instanceof Date) {
    date = value;
  } else if (value && typeof (value as any).toISOString === "function") {
    try {
      date = new Date((value as any).toISOString());
    } catch {
      date = null;
    }
  } else if (value && typeof (value as any).toString === "function") {
    const stringValue = (value as any).toString();
    const parsedDate = new Date(stringValue);
    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate;
    }
  }

  if (date && !isNaN(date.getTime())) {
    // Format as "Month Day, Year" (e.g., "March 15, 2024")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  return null;
}

export function convertCourseDataToCamelCase<TOutput = Course>(course: unknown): TOutput {
  if (course === null || course === undefined) {
    return course as TOutput;
  }

  if (Array.isArray(course)) {
    return course.map((item) => convertCourseDataToCamelCase(item)) as unknown as TOutput;
  }

  if (typeof course !== "object") {
    return course as TOutput;
  }

  const inputRecord = course as Record<string, unknown>;
  const normalized: Record<string, unknown> = {};

  for (const key in inputRecord) {
    if (!Object.prototype.hasOwnProperty.call(inputRecord, key)) continue;
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    let value = inputRecord[key];

    // Special fix: If the key is 'created_at' or 'createdAt', and value is an object (likely a date), convert to ISO string if possible
    if (
      (key === "created_at" || camelKey === "createdAt") &&
      typeof value === "object" &&
      value !== null
    ) {
      normalized[camelKey] = formatDateValue(value);
      continue;
    }

    if (Array.isArray(value)) {
      normalized[camelKey] = value.map((item) =>
        typeof item === "object" && item !== null ? convertCourseDataToCamelCase(item) : item
      );
    } else if (value && typeof value === "object") {
      normalized[camelKey] = convertCourseDataToCamelCase(value);
    } else {
      normalized[camelKey] = value;
    }
  }

  return normalized as unknown as TOutput;
}


export function transformEnrolledCourseForStudent(enr: any) {
  const course = enr.course;
  
  const totalLessons = course.lessons?.length || 0;
  const finished = (enr.lessonProgress || []).filter(
    (p: any) => p.status === "FINISHED"
  ).length;

  // Convert creator data to camelCase if it exists
  const creator = course.creator ? convertCourseDataToCamelCase<{firstName: string | null, lastName: string | null}>(course.creator) : null;

  return {
    id: course.id,
    title: course.title,
    tagline: course.tagline,
    description: course.description,
    creator,
    createdAt: course.createdAt
      ? course.createdAt.toISOString?.() ?? String(course.createdAt)
      : null,
    // studentEnrollment: {
    //   enrolledCourseId: enr.id,
    //   enrolledAt: enr.created_at
    //     ? enr.created_at.toISOString?.() ?? String(enr.created_at)
    //     : null,
    //   progress:
    //     totalLessons > 0
    //       ? Math.round((finished / totalLessons) * 100) / 100
    //       : 0,
    // },
  };
}

export function normalizeCourseOrEnrolledCourseWithLessons(rawCourse: any): Course {
  const enrollment =
    rawCourse.studentsEnrolled && rawCourse.studentsEnrolled[0]
      ? rawCourse.studentsEnrolled[0]
      : null;

  const progressMap = new Map<number, any>(
    (enrollment?.lessonProgress?.map((p: any) => [p.lesson_id, p]) as [number, any][]) || []
  );

  const creator = rawCourse.creator
    ? {
        firstName: rawCourse.creator.first_name,
        lastName: rawCourse.creator.last_name,
      }
    : null;

  const enrolledCourseId = enrollment ? enrollment.id : null;

  const lessons = (rawCourse.lessons || []).map((lesson: any) => {
    const progressEntry = progressMap.get(lesson.id);
    const progress =
      progressEntry
        ? {
            id: progressEntry.id,
            enrolledCourseId: enrolledCourseId,
            lessonId: progressEntry.lesson_id,
            status: progressEntry.status,
            completedAt: progressEntry.updated_at
              ? formatDateValue(progressEntry.updated_at)
              : null,
          }
        : null;

    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      createdAt: lesson.created_at,
      progress,
    };
  });

  let studentEnrollment = null;
  if (enrollment) {
    studentEnrollment = {
      enrolledCourseId: enrollment.id,
      enrolledAt: enrollment.created_at,
      progress:
        rawCourse.lessons.length > 0
          ? (
              (enrollment.lessonProgress?.filter((p: any) => p.status === "FINISHED").length || 0) /
              rawCourse.lessons.length
            )
          : 0,
    };
  }

  return {
    id: rawCourse.id,
    title: rawCourse.title,
    tagline: rawCourse.tagline,
    description: rawCourse.description,
    createdAt: rawCourse.created_at,
    lessons,
    creator,
    studentEnrollment,
  } as Course;
}
