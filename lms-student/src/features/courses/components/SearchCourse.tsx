import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useSearchCourse } from "../useCourses";

interface SearchCourseProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onReplaceCourses: (courses: any[]) => void;
  className?: string;
}

const SearchCourse: React.FC<SearchCourseProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onReplaceCourses,
  className = "",
}) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  // Debounce the search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [value]);

  const { courses, loading, error } = useSearchCourse(debouncedValue);

  useEffect(() => {
    onReplaceCourses(courses ?? []);
  }, [courses]);

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchCourse;