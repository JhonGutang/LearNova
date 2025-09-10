
import { navItems } from "@/constants/navigationItems";
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout";
import React from "react";
import { Button } from "@/src/shadcn/components/ui/button";
import { Course } from "@/src/types/backend-data";
import CardView from "@/src/shared/CardView";
import ListView from "@/src/shared/ListView";
import { Plus } from "lucide-react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
interface CoursePrensetationalProps {
  courses: Course[];
}

interface CoursesHeaderProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const CourseHeader: React.FC<CoursesHeaderProps> = ({ view, setView }) => {
    const {redirect} = useRedirectLink();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Courses</h2>
      <div className="flex gap-2">
        <Button variant="default" onClick={() => redirect("/create-course")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
        <Button
          variant={view === "card" ? "default" : "outline"}
          onClick={() => setView("card")}
        >
          Card view
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          onClick={() => setView("list")}
        >
          List view
        </Button>
      </div>
    </div>
  );
};

const CoursesPresentational: React.FC<CoursePrensetationalProps> = ({
  courses,
}) => {
  const [view, setView] = React.useState<"card" | "list">("card");

  return (
    <TeacherHomeLayout navItems={navItems} pageTitle="Courses">
      <main className="p-4">
        <CourseHeader view={view} setView={setView} />
        {view === "card" ? (
          <CardView data={courses} />
        ) : (
          <ListView data={courses} />
        )}
      </main>
    </TeacherHomeLayout>
  );
};

export default CoursesPresentational;
