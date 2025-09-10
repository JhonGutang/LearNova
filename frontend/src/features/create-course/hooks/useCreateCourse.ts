import { useState } from "react";
import { Course, CreateCourseFormData } from "@/src/types/backend-data";
import { CATEGORIES } from "@/constants/coursesDummyData";
import { CreateCourseService } from "../create-course.service";

const createCourseService = new CreateCourseService();

export function useCreateCourse() {
    const [course, setCourse] = useState<Course[]>([]);
    const [createCourseFormData, setCreateCourseFormData] = useState<CreateCourseFormData>({
        title: "",
        tagline: "",
        description: "",
        categories: [],
    });

    const handleSelectCategories = (category: string) => {
        setCreateCourseFormData((prev) => {
            const prevCategories = prev.categories;
            let newCategories: string[];
            if (prevCategories.includes(category)) {
                newCategories = prevCategories.filter((c) => c !== category);
            } else {
                newCategories = [...prevCategories, category];
            }
            return {
                ...prev,
                categories: newCategories,
            };
        });
    };

    const saveCourse = async () => {
        try {
            await createCourseService.create(createCourseFormData);
        } catch (error) {
            console.error("Failed to create course:", error);
        }
    }

    return {
        course,
        setCourse,
        createCourseFormData,
        setCreateCourseFormData,
        CATEGORIES,
        handleSelectCategories,
        saveCourse,
    };
}
