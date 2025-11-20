import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSearchCourse } from "../useCourses";
import { Search } from "lucide-react";

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
    <div className={`relative w-full ${className}`}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Search className="w-4 h-4 text-[#A0A0A0]" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 h-10 rounded-lg !border-[#E0E0E0] !bg-white !text-gray-900 placeholder:!text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:!border-[#E0E0E0] shadow-sm"
      />
    </div>
  );
};

export default SearchCourse;