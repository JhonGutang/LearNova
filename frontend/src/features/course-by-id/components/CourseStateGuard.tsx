import ErrorMessage from "@/src/shared/ErrorMessage";
import { Course } from "@/src/types/backend-data";
import { ErrorLike } from "@apollo/client";
import { Loader2 } from "lucide-react";

interface CourseStateGuardProps {
    course: Course | null
    loading: Boolean,
    error: ErrorLike | undefined
}

const CourseStateGuard: React.FC<CourseStateGuardProps> = ({ course, loading, error}) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen w-full">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading course...</span>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center h-screen w-full">
          <ErrorMessage>
            Failed to load course. Please try again later.
          </ErrorMessage>
        </div>
      );
    }
  
    if (!course) {
      return (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative text-center">
            <span className="font-bold">Course Not Found</span>
          </div>
        </div>
      );
    }
  }

  export default CourseStateGuard