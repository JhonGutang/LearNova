import { Alert, AlertDescription } from "@/src/shadcn/components/ui/alert";
import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shadcn/components/ui/select";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import { CreateModuleFormData } from "@/src/types/backend-data";
import React from "react";

type CreateModuleFormProps = {
    createModuleFormData: CreateModuleFormData;
    setCreateModuleFormData: React.Dispatch<React.SetStateAction<CreateModuleFormData>>;
    categories: string[],
};

const CreateModuleForm: React.FC<CreateModuleFormProps> = ({
    createModuleFormData,
    setCreateModuleFormData,
    categories,
}) => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Create Module</h2>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="moduleName">
                        Module Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="moduleName"
                        type="text"
                        value={createModuleFormData.moduleName}
                        onChange={(e) =>
                            setCreateModuleFormData((prev) => ({
                                ...prev,
                                moduleName: e.target.value,
                            }))
                        }
                        required
                        placeholder="Enter module name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="moduleDescription">
                        Description
                    </Label>
                    <Textarea
                        id="moduleDescription"
                        value={createModuleFormData.moduleDescription}
                        onChange={(e) =>
                            setCreateModuleFormData((prev) => ({
                                ...prev,
                                moduleDescription: e.target.value,
                            }))
                        }
                        placeholder="Enter module description"
                        rows={8} // Increased from 4 to 8
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        value={createModuleFormData.category}
                        onValueChange={(value) =>
                            setCreateModuleFormData((prev) => ({
                                ...prev,
                                category: value,
                            }))
                        }
                        required
                    >
                        <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>
                <Button type="submit" className="w-full">
                    Create Module
                </Button>
            </form>
        </div>
    );
};

export default CreateModuleForm;
