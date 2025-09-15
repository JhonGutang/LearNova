import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import ChipToggle from "@/src/shared/ChipToggle";
import ErrorMessage from "@/src/shared/ErrorMessage";
import { CreateCourseFormData } from "@/src/types/backend-data";
import React from "react";

type CreateCourseFormProps = {
    createCourseFormData: CreateCourseFormData;
    setCreateCourseFormData: React.Dispatch<React.SetStateAction<CreateCourseFormData>>;
    saveCourse: () => void;
    categories: string[],
    handleSelectCategories: (category: string) => void;
};

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
    createCourseFormData,
    setCreateCourseFormData,
    saveCourse,
    categories,
    handleSelectCategories,
}) => {

    const selectedCategories: string[] = createCourseFormData.categories;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveCourse();
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Create Course</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="title">
                        Course Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        value={createCourseFormData.title}
                        onChange={(e) =>
                            setCreateCourseFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        required
                        placeholder="Enter Module Title"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="tagline">
                        Tagline
                    </Label>
                    <Input
                        id="tagline"
                        type="text"
                        value={createCourseFormData.tagline}
                        onChange={(e) =>
                            setCreateCourseFormData((prev) => ({
                                ...prev,
                                tagline: e.target.value,
                            }))
                        }
                        placeholder="Enter a short tagline"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        value={createCourseFormData.description}
                        onChange={(e) =>
                            setCreateCourseFormData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="Enter Course description"
                        rows={8}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2" id="category">
                        {categories.map((category) => {
                            const isSelected =  createCourseFormData.categories.includes(category);
                            return (
                                <ChipToggle key={category} option={category} isSelected={isSelected} onToggle={() =>handleSelectCategories(category)} />
                            );
                        })}
                    </div>
                    { createCourseFormData.categories.length === 0 && (
                        <ErrorMessage>Please select at least one category</ErrorMessage>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={ createCourseFormData.categories.length === 0}>
                    Create Module
                </Button>
            </form>
        </div>
    );
};

export default CreateCourseForm;
