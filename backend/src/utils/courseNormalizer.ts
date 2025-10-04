function normalizeLesson(lesson: any) {
    if (!lesson) return undefined;
    return {
      id: String(lesson.id),
      title: lesson.title,
      description: lesson.description,
    };
  }
  
export function normalizeCourse(
    course: any,
    opts?: { includeCreatorName?: boolean; includeLessons?: boolean; isEnrolled?: boolean; enrolledCourseId?: number }
  ) {
    if (!course) return null;
    const includeCreatorName = opts?.includeCreatorName ?? true;
    const includeLessons = opts?.includeLessons ?? true;
  
    const creatorName =
      includeCreatorName && course.creator
        ? `${course.creator.first_name} ${course.creator.last_name}`.trim()
        : undefined;
  
    const normalized: any = {
      id: String(course.id),
      title: course.title,
      tagline: course.tagline,
      description: course.description,
      status: course.status,
      categories: course.categories
        ? course.categories.map((cat: any) =>
            cat.category ? cat.category.name : cat.name
          )
        : [],
      createdAt:
        course.created_at instanceof Date
          ? course.created_at.toISOString()
          : course.created_at,
    };
  
    if (includeCreatorName) {
      normalized.creatorName = creatorName ?? null;
    }
  
    if (includeLessons) {
      normalized.lessons = course.lessons
        ? course.lessons.map(normalizeLesson)
        : [];
    }
  
    if (typeof opts?.isEnrolled === "boolean") {
      normalized.isEnrolled = opts.isEnrolled;
    }
  
    if (typeof opts?.enrolledCourseId !== "undefined") {
      normalized.enrolledCourseId = opts.enrolledCourseId;
    }
  
    return normalized;
  }