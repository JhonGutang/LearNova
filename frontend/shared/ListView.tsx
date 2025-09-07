import React from "react";
import { ModuleData } from "@/types/backend-data";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface ListViewProps {
  data: ModuleData[];
}

const ListView: React.FC<ListViewProps> = ({ data }) => {
  return (
    <div className="divide-y rounded-md border">
      {data.map((module, idx) => {
        const categories = Array.isArray(module.category) ? module.category : [module.category];
        const displayedCategories = categories.slice(0, 2);
        const remainingCount = categories.length - displayedCategories.length;

        return (
          <div
            key={idx}
            className="relative flex p-4 min-h-[112px]" // ensure enough height for button placement
          >
            <div className="flex-1 pr-4">
              <div className="flex flex-col justify-start gap-1 mb-1">
                <p className="font-medium">{module.title}</p>
                <div className="flex gap-1 flex-wrap">
                  {displayedCategories.map((cat, i) => (
                    <span key={i} className="chip chip-success text-xs">{cat}</span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="chip chip-secondary text-xs px-2 py-0.5">
                      +{remainingCount}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">{module.description}</p>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>
                  {module.totalNumberOfStudents}{" "}
                  {module.totalNumberOfStudents === 1 ? "student" : "students"}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button variant="outline">View</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
