import React from "react";
import { Button } from "@/src/shadcn/components/ui/button";

interface ListViewProps<T = any> {
  data: T[];
  renderItem?: (item: T, idx: number) => React.ReactNode;
}

const getDefaultDisplay = (item: any) => {
  // Try to display title/name, description/tagline, and categories if present
  const title = item.title || item.name || "Untitled";
  const taglineOrDescription = item.description || item.tagline || "";
  const categories = Array.isArray(item.categories)
    ? item.categories
    : item.categories
    ? [item.categories]
    : [];
  const displayedCategories = categories.slice(0, 2);
  const remainingCount = categories.length - displayedCategories.length;

  // Only display "students" field if present (progress_level removed)
  let extraInfo = null;
  if (
    typeof item.totalNumberOfStudents === "number" ||
    typeof item.students === "number"
  ) {
    const count =
      typeof item.totalNumberOfStudents === "number"
        ? item.totalNumberOfStudents
        : item.students;
    extraInfo = (
      <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
        <span>
          {count} {count === 1 ? "student" : "students"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 pr-4">
      <div className="flex flex-col justify-start gap-1 mb-1">
        <p className="font-medium">{title}</p>
        {displayedCategories.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {displayedCategories.map((cat: any, i: number) => (
              <span key={i} className="chip chip-success text-xs">
                {cat}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="chip chip-secondary text-xs px-2 py-0.5">
                +{remainingCount}
              </span>
            )}
          </div>
        )}
      </div>
      {taglineOrDescription && (
        <p className="text-sm text-gray-600">{taglineOrDescription}</p>
      )}
      {extraInfo}
    </div>
  );
};

function ListView<T = any>({ data, renderItem }: ListViewProps<T>) {
  return (
    <div className="divide-y rounded-md border">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="relative flex p-4 min-h-[112px]"
        >
          {renderItem ? renderItem(item, idx) : getDefaultDisplay(item)}
          <div className="absolute bottom-4 right-4">
            <Button variant="outline">View</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListView;
