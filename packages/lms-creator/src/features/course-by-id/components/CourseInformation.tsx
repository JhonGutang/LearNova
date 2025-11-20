import { Button } from '@/src/shadcn/components/ui/button';
import { CourseWithCreatorName as Course } from '@lms/shared-types';
import { Pencil } from 'lucide-react';
import React from 'react';
import EditCourseModal from './EditCourseModal';

interface CourseInformationProps {
    course: Course
    publishCourse: (courseId: number) => void
    onCourseUpdated: (updatedCourse: Partial<Course>) => void
}

const CourseInformation: React.FC<CourseInformationProps> = ({ course, publishCourse, onCourseUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    return (
        <div className="basis-2/5 flex-shrink-0 flex-grow-0 p-10 h-full border-r-2 border-gray-200">
            <div className='flex items-center gap-2 text-2xl'>
                {course.title}
                <button
                    type="button"
                    className="ml-2 p-1 rounded hover:bg-gray-100 cursor-pointer"
                    aria-label="Edit title"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    <Pencil className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="text-sm text-gray-500 italic mt-1 mb-2">
                {course.tagline}
            </div>
            <div className='text-sm mb-2 mt-2'>
                <span className="flex flex-wrap gap-2">
                    {course.categories.map((cat) => (
                        <span key={cat} className="chip chip-success capitalize">
                            {cat}
                        </span>
                    ))}
                </span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2 font-bold">Description</span>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                    aria-label="Edit description"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    <Pencil className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="text-gray-700 text-sm">
                {course.description}
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="mb-2">
                <div className="font-semibold text-gray-800 mb-2">Information</div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Participants</span>
                        <span className="font-medium text-gray-900"> {course.totalNumberOfParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Lessons</span>
                        <span className="font-medium text-gray-900">{course.totalNumberOfLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Course Author</span>
                        <span className="font-medium text-gray-900">{course.creatorName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status: </span>
                        <span className="font-medium text-gray-900 capitalize">{course.status}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 w-full flex flex-col gap-2">
                <Button onClick={() => publishCourse(Number(course.id))} className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-150">
                    {course.status === "PUBLISHED" ? "Unpublished" : "Publish"}
                </Button>
                <Button className='bg-blue-500  hover:bg-blue-600 cursor-pointer' onClick={() => setIsEditModalOpen(true)}>
                    Edit Course
                </Button>
            </div>
            <EditCourseModal
                course={course}
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onCourseUpdated={onCourseUpdated}
            />
        </div>
    );
};

export default CourseInformation;
