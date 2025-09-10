import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import ChipToggle from "@/src/shared/ChipToggle";
import ErrorMessage from "@/src/shared/ErrorMessage";
import { CreateModuleFormData } from "@/src/types/backend-data";
import React from "react";

type CreateModuleFormProps = {
    createModuleFormData: CreateModuleFormData;
    setCreateModuleFormData: React.Dispatch<React.SetStateAction<CreateModuleFormData>>;
    saveModule: () => void;
    categories: string[],
    handleSelectCategories: (category: string) => void;
};

const CreateModuleForm: React.FC<CreateModuleFormProps> = ({
    createModuleFormData,
    setCreateModuleFormData,
    saveModule,
    categories,
    handleSelectCategories,
}) => {

    // Category is always an array
    const selectedCategories: string[] = createModuleFormData.categories;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveModule();
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Create Module</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="title">
                        Module Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        value={createModuleFormData.title}
                        onChange={(e) =>
                            setCreateModuleFormData((prev) => ({
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
                        value={createModuleFormData.tagline}
                        onChange={(e) =>
                            setCreateModuleFormData((prev) => ({
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
                        value={createModuleFormData.description}
                        onChange={(e) =>
                            setCreateModuleFormData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="Enter module description"
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
                            const isSelected =  createModuleFormData.categories.includes(category);
                            return (
                                <ChipToggle key={category} option={category} isSelected={isSelected} onToggle={() =>handleSelectCategories(category)} />
                            );
                        })}
                    </div>
                    { createModuleFormData.categories.length === 0 && (
                        <ErrorMessage>Please select at least one category</ErrorMessage>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={ createModuleFormData.categories.length === 0}>
                    Create Module
                </Button>
            </form>
        </div>
    );
};

export default CreateModuleForm;
