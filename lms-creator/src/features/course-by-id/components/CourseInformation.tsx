import { Course } from '@/src/types/backend-data';
import { Pencil } from 'lucide-react';
import React from 'react';

interface CourseInformationProps {
    course: Course
}

const CourseInformation: React.FC<CourseInformationProps> = ({ course }) => {
    
    const totalSubModules = 7;
    const author = "Author's Name";


    return (
        <div className="basis-2/5 flex-shrink-0 flex-grow-0 p-10 h-full border-r-2 border-gray-200">
            <div className='flex items-center gap-2 text-2xl'>
                {course.title}
                <button
                    type="button"
                    className="ml-2 p-1 rounded hover:bg-gray-100 cursor-pointer"
                    aria-label="Edit title"
                >
                    <Pencil className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="text-base text-sm text-gray-500 italic mt-1 mb-2">
                {course.tagline}
            </div>
            <div className='text-sm mb-2 mt-2'>
                <span className="flex flex-wrap gap-2">
                    {course.categories.map((cat) => (
                        <span key={cat} className="chip chip-success">
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
                        <span className="font-medium text-gray-900">{course.totalNumberOfStudents ?? 8}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Lessons</span>
                        <span className="font-medium text-gray-900">{totalSubModules}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Course Author</span>
                        <span className="font-medium text-gray-900">{author}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status: </span>
                        <span className="font-medium text-gray-900 capitalize">{course.status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseInformation;
