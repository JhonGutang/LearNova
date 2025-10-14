"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCourse = normalizeCourse;
function normalizeLesson(lesson, lessonProgressMap) {
    if (!lesson)
        return undefined;
    const normalized = {
        id: String(lesson.id),
        title: lesson.title,
        description: lesson.description,
    };
    if (lessonProgressMap) {
        const progress = lessonProgressMap.get(String(lesson.id));
        if (progress) {
            // Format updated_at to a more readable string, e.g., "Apr 10, 2024, 2:30 PM"
            let readableDate = undefined;
            if (progress.updated_at instanceof Date) {
                readableDate = progress.updated_at.toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }
            else if (typeof progress.updated_at === "string" || typeof progress.updated_at === "number") {
                const dateObj = new Date(progress.updated_at);
                if (!isNaN(dateObj.getTime())) {
                    readableDate = dateObj.toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                }
                else {
                    readableDate = String(progress.updated_at);
                }
            }
            normalized.progress = {
                status: progress.status,
                completedAt: readableDate,
            };
        }
    }
    return normalized;
}
function normalizeCourse(course, opts) {
    if (!course)
        return null;
    const includeCreatorName = opts?.includeCreatorName ?? true;
    const includeLessons = opts?.includeLessons ?? true;
    const creatorName = includeCreatorName && course.creator
        ? `${course.creator.first_name} ${course.creator.last_name}`.trim()
        : undefined;
    const normalized = {
        id: String(course.id),
        title: course.title,
        tagline: course.tagline,
        description: course.description,
        status: course.status,
        categories: course.categories
            ? course.categories.map((cat) => cat.category ? cat.category.name : cat.name)
            : [],
        createdAt: course.created_at instanceof Date
            ? course.created_at.toISOString()
            : course.created_at,
    };
    if (includeCreatorName) {
        normalized.creatorName = creatorName ?? null;
    }
    if (includeLessons) {
        // Create a map of lesson progress for quick lookup
        let lessonProgressMap;
        if (opts?.lessonProgress && opts.lessonProgress.length > 0) {
            lessonProgressMap = new Map(opts.lessonProgress.map(progress => [
                String(progress.lesson_id || progress.lessonId),
                progress
            ]));
        }
        normalized.lessons = course.lessons
            ? course.lessons.map((lesson) => normalizeLesson(lesson, lessonProgressMap))
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
