import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Button } from "@/src/shadcn/components/ui/button";
import type { EditableCreatorProfileInput } from "./useUser";
import { CustomToast } from "@/src/shared/CustomToast";

export type UserProfileData = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
};

interface ProfileEditProps {
  userData: UserProfileData | null;
  editUser: (input: EditableCreatorProfileInput) => Promise<any>;
  editUserLoading?: boolean;
  editUserError?: any;
  editUserData?: any;
  refetchUser?: () => void;
}

// Exclude password field
const editableFields = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "user@example.com",
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

/**
 * ProfileEdit component allows users to edit their profile information.
 * 
 * Functionalities:
 * - Displays a form with editable profile fields (email, first name, last name, etc.).
 * - Initializes form fields with current user data.
 * - Allows users to update fields and submit new information.
 * - Disables the "Save Changes" button when there are no changes or during a save.
 * - Shows inline errors if profile update fails.
 * - Shows a toast notification upon successful profile update (instead of inline text).
 * - Refetches user data after a successful update.
 * - Keeps form state synchronized with userData prop changes.
 */

const ProfileEdit: React.FC<ProfileEditProps> = ({
  userData,
  editUser,
  editUserLoading,
  editUserError,
  editUserData,
  refetchUser,
}) => {
  // State to manage form values for all editable fields, initialized from userData
  const [form, setForm] = useState<EditableCreatorProfileInput>(() => ({
    email: userData?.email ?? "",
    firstName: userData?.firstName ?? "",
    lastName: userData?.lastName ?? "",
    middleName: userData?.middleName ?? "",
    phone: userData?.phone ?? "",
    address: userData?.address ?? "",
  }));

  // Controls when to show a success toast (fires after profile update)
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  /**
   * Memoized check to detect when all editable fields are unchanged.
   * - Compares current form values to userData values.
   * - The Save button is disabled if nothing has changed.
   */
  const isUnchanged = useMemo(() => {
    if (!userData) return true;
    // Compare each field, treating null/undefined/'' for optional fields as equivalent
    return editableFields.every(({ id }) => {
      const formValue = form[id as keyof EditableCreatorProfileInput] ?? "";
      const userValue = userData[id as keyof UserProfileData] ?? "";
      if (id === "middleName") {
        // Special comparison for middle name (accept empty, null, or undefined as unchanged)
        return (!formValue && !userValue) || formValue === userValue;
      }
      return formValue === userValue;
    });
  }, [form, userData]);

  /**
   * Handles user input for all form fields.
   * Updates local form state as the user types.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: value
    }));
  };

  /**
   * Called when the user submits the profile edit form.
   * Sends updated data using the editUser mutation.
   * Shows success toast (on status SUCCESS) and triggers a user data refetch.
   * Displays error (below inputs) if update fails.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await editUser(form);
      if (resp?.data?.editUser?.status === "SUCCESS") {
        setShowSuccessToast(true); // Will trigger useEffect to show toast
        if (refetchUser) refetchUser();
      } else {
        setShowSuccessToast(false);
      }
    } catch (e) {
      setShowSuccessToast(false);
    }
  };

  /**
   * Display success toast whenever a profile update completes successfully.
   */
  useEffect(() => {
    if (showSuccessToast) {
      CustomToast({
        type: "success",
        title: "Profile updated successfully.",
      });
      setShowSuccessToast(false);
    }
  }, [showSuccessToast]);

  /**
   * When the userData prop changes (such as after a refetch),
   * update the form state to match the new data.
   */
  useEffect(() => {
    setForm({
      email: userData?.email ?? "",
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      middleName: userData?.middleName ?? "",
      phone: userData?.phone ?? "",
      address: userData?.address ?? "",
    });
  }, [userData]);

  return (
    <div className="relative flex flex-col justify-center h-full min-h-[500px] p-8">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div
          className="space-y-6 bg-white p-8 rounded-lg shadow max-h-[600px] overflow-y-auto flex-1"
          style={{ minHeight: 0 }}
        >
          {/* Render an input for each editable field */}
          {editableFields.map(({ id, label, type, placeholder }) => (
            <div key={id} className="grid gap-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={form[id as keyof EditableCreatorProfileInput] ?? ""}
                onChange={handleInputChange}
                autoComplete="off"
                disabled={!!editUserLoading}
              />
            </div>
          ))}
          {/* Error message shown under the fields if update fails */}
          <div className="flex flex-col items-center justify-center">
            {!!editUserError && (
              <span className="text-red-600 text-sm mb-2">
                {editUserError?.message ||
                  "Failed to update profile. Please try again."}
              </span>
            )}
            {/* Success message is now shown via toast, not inline */}
          </div>
        </div>
        {/* Submit button remains fixed outside scrollable area */}
        <div className="mt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!!editUserLoading || isUnchanged}
          >
            {editUserLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;