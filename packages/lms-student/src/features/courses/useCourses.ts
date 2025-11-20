import * as ApolloReact from "@apollo/client/react";
import { COURSES_PAGE_QUERY, SEARCH_COURSE_QUERY, TOGGLE_FAVORITE_COURSE_MUTATION } from "./query";
import { CourseWithCreator as Course } from "@lms/shared-types";
import { CustomToast } from "@/shared/CustomToast";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  level: number;
  exp: number;
}

export interface CoursesPageData {
  coursesPage: {
    courses: (Course & { studentEnrollment?: any })[];
    student: Student;
  }
}

export interface SearchCourseData {
  searchCourse: (Course & { studentEnrollment?: any })[];
}

export function useCourses(category: string) {
  const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesPageData>(COURSES_PAGE_QUERY, {
    variables: { category },
  });

  return {
    coursesPageData: data?.coursesPage,
    loading,
    error,
    refetch,
  };
}

export function useSearchCourse(title: string) {
  const { data, loading, error, refetch } = ApolloReact.useQuery<SearchCourseData>(SEARCH_COURSE_QUERY, {
    variables: { title },
    skip: !title,
  });

  return {
    courses: data?.searchCourse,
    loading,
    error,
    refetch,
  };
}

interface ToggleFavoriteCourseData {
  toggleFavoriteCourse: {
    status: string;
    message: string;
    isFavorite: boolean;
  };
}

interface ToggleFavoriteCourseVariables {
  courseId: number;
}

export function useToggleFavoriteCourse() {
  const [toggleFavorite, { loading }] = ApolloReact.useMutation<
    ToggleFavoriteCourseData,
    ToggleFavoriteCourseVariables
  >(TOGGLE_FAVORITE_COURSE_MUTATION, {
    update: (cache, { data: mutationData }, { variables }) => {
      if (!variables || !mutationData?.toggleFavoriteCourse) return;

      const courseId = variables.courseId;
      const newIsFavorite = mutationData.toggleFavoriteCourse.isFavorite;

      const updateCoursesList = (courses: any[]) => {
        return courses.map((course) => {
          if (Number(course.id) === courseId) {
            return {
              ...course,
              isFavorite: newIsFavorite,
            };
          }
          return course;
        });
      };

      const categories = ['ALL', 'FEATURED', 'ENROLLED', null];
      categories.forEach((category) => {
        try {
          const cacheData = cache.readQuery<CoursesPageData>({
            query: COURSES_PAGE_QUERY,
            variables: { category },
          });

          if (cacheData?.coursesPage?.courses) {
            cache.writeQuery({
              query: COURSES_PAGE_QUERY,
              variables: { category },
              data: {
                coursesPage: {
                  ...cacheData.coursesPage,
                  courses: updateCoursesList(cacheData.coursesPage.courses),
                },
              },
            });
          }
        } catch (e) {
        }
      });

      try {
        cache.modify({
          fields: {
            searchCourse(existingCourses = [], { readField }) {
              return existingCourses.map((courseRef: any) => {
                const id = readField('id', courseRef);
                if (Number(id) === courseId) {
                  return {
                    ...courseRef,
                    isFavorite: newIsFavorite,
                  };
                }
                return courseRef;
              });
            },
          },
        });
      } catch (e) {
      }
    },
  });

  const toggleFavoriteCourse = async (courseId: number, currentIsFavorite: boolean = false) => {
    try {
      const result = await toggleFavorite({
        variables: { courseId },
        optimisticResponse: {
          toggleFavoriteCourse: {
            status: 'SUCCESS',
            message: currentIsFavorite ? 'Removed from favorites' : 'Added to favorites',
            isFavorite: !currentIsFavorite,
          },
        },
      });
      
      const response = result.data?.toggleFavoriteCourse;
      
      if (response?.status === "SUCCESS") {
        CustomToast({
          type: "success",
          title: "Success",
          description: response.message,
        });
        return { success: true, isFavorite: response.isFavorite };
      } else {
        CustomToast({
          type: "error",
          title: "Error",
          description: response?.message || "Failed to toggle favorite course",
        });
        return { success: false, isFavorite: false };
      }
    } catch (err) {
      console.error("Error toggling favorite course:", err);
      CustomToast({
        type: "error",
        title: "Error",
        description: "Failed to toggle favorite course",
      });
      return { success: false, isFavorite: false };
    }
  };

  return {
    toggleFavoriteCourse,
    loading,
  };
}
