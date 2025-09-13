import React from "react";
import { Course } from "@/src/types/backend-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/shadcn/components/ui/card";
import { Button } from "@/src/shadcn/components/ui/button";
import { Users } from "lucide-react";
import { useRedirectLink } from "../shadcn/hooks/useRedirectLink";
interface CardViewProps {
    data: Course[];
}

const CardView: React.FC<CardViewProps> = ({ data }) => {
  const {redirect, toSlug} = useRedirectLink();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((course, idx) => {
        const categories = Array.isArray(course.categories) ? course.categories : [course.categories];
        const displayedCategories = categories.slice(0, 2);
        const remainingCount = categories.length - displayedCategories.length;

        return (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <div className="mt-1 flex flex-wrap gap-1">
                {displayedCategories.map((cat, i) => (
                  <span key={i} className="chip chip-success">
                    {cat}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="chip chip-secondary text-xs px-2 py-0.5">
                    +{remainingCount}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="text-gray-600">{course.tagline}</p>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-gray-600 text-sm min-h-[28px]">
                <Users className="w-5 h-5 text-gray-500" />
                <span>
                  {course.totalNumberOfStudents || 0}{" "}
                  {(course.totalNumberOfStudents || 0) === 1 ? "student" : "students"}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => redirect('/courses/' + toSlug(course.id, course.title))}>
                View
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CardView;
