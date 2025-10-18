import { Course } from "../generated/graphql";

// Helper function to format a value as ISO date string if possible
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

// New function: transform enrolled course data for studentEnrolledCourses
export function transformEnrolledCourseForStudent(enr: any) {
  const course = enr.course;
  
  // Defensive: check required fields
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
    studentEnrollment: {
      enrolledCourseId: enr.id,
      enrolledAt: enr.created_at
        ? enr.created_at.toISOString?.() ?? String(enr.created_at)
        : null,
      progress:
        totalLessons > 0
          ? Math.round((finished / totalLessons) * 100) / 100
          : 0,
    },
  };
}
