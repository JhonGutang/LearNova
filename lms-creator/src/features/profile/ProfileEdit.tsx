import React from "react";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Button } from "@/src/shadcn/components/ui/button";

const editableFields = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "user@example.com",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "********",
  },
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
  },
  {
    id: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Middle Name (optional)",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
  },
];

const ProfileEdit: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center h-full min-h-[500px] p-8">
      <form className="space-y-6 bg-white p-8 rounded-lg shadow max-h-[500px] overflow-y-auto flex-1" style={{ minHeight: 0 }}>
        {editableFields.map(({ id, label, type, placeholder }) => (
          <div key={id} className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} placeholder={placeholder} />
          </div>
        ))}
      </form>
      <div className="flex justify-center items-center px-8 pt-4">
        <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;