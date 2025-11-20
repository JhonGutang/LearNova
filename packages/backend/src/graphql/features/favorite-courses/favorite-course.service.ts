import { Course } from "../../../generated/graphql";
import { FavoriteCourseRepository, FavoriteCourseWithCourse } from "./favorite-course.repository";

export interface FavoriteCourseServiceInterface {
  getFavoriteCourses(studentId: number): Promise<{ studentId: number; courses: Course[] }>;
  toggleFavoriteCourse(studentId: number, courseId: number): Promise<{ success: boolean; isFavorite: boolean }>;
}

export class FavoriteCourseService implements FavoriteCourseServiceInterface {
  constructor(private favoriteCourseRepository: FavoriteCourseRepository) {}

  async getFavoriteCourses(studentId: number): Promise<{ studentId: number; courses: Course[] }> {
    const favoriteCourses = await this.favoriteCourseRepository.findFavoriteCoursesByStudentId(studentId);
    
    const courses: Course[] = favoriteCourses.map((favorite: FavoriteCourseWithCourse) => ({
      id: favorite.course.id.toString(),
      title: favorite.course.title,
      tagline: favorite.course.tagline,
      description: favorite.course.description,
      status: favorite.course.status,
      createdAt: favorite.course.created_at.toISOString(),
      categories: favorite.course.categories?.map((courseCategory) => courseCategory.category.name) || [],
      creator: {
        firstName: favorite.course.creator?.first_name,
        lastName: favorite.course.creator?.last_name
      }
    }));

    return {
      studentId,
      courses
    };
  }

  async toggleFavoriteCourse(studentId: number, courseId: number): Promise<{ success: boolean; isFavorite: boolean }> {
    try {
      const isFavorite = await this.favoriteCourseRepository.isFavorite(studentId, courseId);
      
      if (isFavorite) {
        await this.favoriteCourseRepository.removeFavoriteCourse(studentId, courseId);
        return { success: true, isFavorite: false };
      } else {
        await this.favoriteCourseRepository.createFavoriteCourse(studentId, courseId);
        return { success: true, isFavorite: true };
      }
    } catch (error: any) {
      console.error("Error toggling favorite course:", error);
      return { success: false, isFavorite: false };
    }
  }
}

