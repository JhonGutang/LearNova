import { Button } from "@/src/shadcn/components/ui/button";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { Lesson } from "@/src/types/backend-data";
import { Eye, Pencil } from "lucide-react";

interface LessonListViewProps {
  lessons: Lesson[];
  parentLink?: string;
}

const LessonListView: React.FC<LessonListViewProps> = ({ lessons, parentLink }) => {
  const { redirect, toSlug } = useRedirectLink();
  // console.log(parentLink)
  if (!lessons || lessons.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No lessons yet. Create your first lesson!
      </div>
    );
  }

  return (
    <div className="divide-y rounded-md border">
      {lessons.map((lesson, idx) => (
        <div
          key={lesson.id || idx}
          className="flex items-center justify-between p-4 min-h-[96px] hover:bg-muted/40 transition border shadow-sm rounded-md bg-white"
        >
          <div className="flex-1 pr-4">
            <div className="flex flex-col justify-start gap-1 mb-1">
              <p className="font-medium">{lesson.title}</p>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Edit lesson"
              className="cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="View lesson"
              className="cursor-pointer"
              onClick={() => {
                redirect(`${parentLink}/${toSlug(lesson.id, lesson.title)}`);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonListView;