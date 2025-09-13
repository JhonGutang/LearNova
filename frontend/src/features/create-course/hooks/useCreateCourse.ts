import { useState } from "react";
import { CreateCourseFormData } from "@/src/types/backend-data";
import { CATEGORIES } from "@/constants/coursesDummyData";
import { CREATE_COURSE } from "../query";
import * as ApolloReact from "@apollo/client/react";

export function useCreateCourse() {
    const [createCourseFormData, setCreateCourseFormData] = useState<CreateCourseFormData>({
        title: "",
        tagline: "",
        description: "",
        categories: [],
    });

    const [createCourse, { loading, error }] = ApolloReact.useMutation(CREATE_COURSE, {
        refetchQueries: ['GetAllCourses'],
        onCompleted: (data) => {
            setCreateCourseFormData({
                title: "",
                tagline: "",
                description: "",
                categories: [],
            });
        },
        onError: (error) => {
            console.error('Failed to create course:', error);
        }
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
            await createCourse({
                variables: {
                    input: createCourseFormData
                }
            });
        } catch (error) {
            console.error("Failed to create course:", error);
        }
    };

    return {
        createCourseFormData,
        setCreateCourseFormData,
        CATEGORIES,
        handleSelectCategories,
        saveCourse,
        loading,
        error,
    };
}
