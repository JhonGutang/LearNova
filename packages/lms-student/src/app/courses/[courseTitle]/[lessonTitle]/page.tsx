import LessonPages from "@/features/lesson-pages/LessonPages";
import SidebarLayout from "@/shared/layout/Sidebar";

interface LessonTitlePageProps {
    params: {
        courseTitle: string
        lessonTitle: string;
    };
}

const LessonTitlePage = async ({ params }: LessonTitlePageProps) => {
    const { courseTitle, lessonTitle } = await params;

    return (
        <SidebarLayout>
        <LessonPages lessonLink={lessonTitle} courseLink={courseTitle}/>
        </SidebarLayout>
    );
};

export default LessonTitlePage