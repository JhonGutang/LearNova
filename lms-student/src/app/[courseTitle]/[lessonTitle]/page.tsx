import LessonPages from "@/features/lesson-pages/LessonPages";
import SidebarLayout from "@/shared/layout/Sidebar";

interface LessonTitlePageProps {
    params: {
        lessonTitle: string;
    };
}

const LessonTitlePage = async ({ params }: LessonTitlePageProps) => {
    const { lessonTitle } = await params;

    return (
        <SidebarLayout>
        <LessonPages lessonLink={lessonTitle}/>
        </SidebarLayout>
    );
};

export default LessonTitlePage