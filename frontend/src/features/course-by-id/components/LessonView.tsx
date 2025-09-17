import { Button } from "@/src/shadcn/components/ui/button";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { Lesson } from "@/src/types/backend-data";
import { ArrowRight } from "lucide-react";

interface LessonListViewProps {
  lessons: Lesson[];
  parentLink?: string;
}

const LessonListView: React.FC<LessonListViewProps> = ({ lessons, parentLink }) => {
  const { redirect, toSlug } = useRedirectLink();
    console.log(parentLink)
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
          className="relative flex p-4 min-h-[96px] hover:bg-muted/40 transition"
        >
          <div className="flex-1 pr-4">
            <div className="flex flex-col justify-start gap-1 mb-1">
              <p className="font-medium">{lesson.title}</p>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                redirect(`${parentLink}/${toSlug(lesson.id, lesson.title)}`);
              }}
            >
              View <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonListView;