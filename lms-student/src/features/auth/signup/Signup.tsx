"use client";
import React, { useCallback, useState } from "react";
import { SignupFormFields } from "@/constants/AuthFormFields";
import { useAuth } from "../useAuth";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/shared/layout/AuthLayout";
import { useRouter } from "next/navigation";

const initialFormState: Record<string, string> = {
  email: "",
  "first-name": "",
  "middle-name": "",
  "last-name": "",
  phone: "",
  address: "",
  password: "",
  "confirm-password": "",
};

const Signup: React.FC = () => {
  const router = useRouter()
  const { register, registerLoading } = useAuth();
  const [form, setForm] = useState<Record<string, string>>({ ...initialFormState });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    "confirm-password": false,
  });

  const redirectToSignin = () => {
    router.push('/signin')
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggleShowPassword = useCallback((fieldId: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await register(
        form,
        () => {
          setForm({ ...initialFormState });
          setErrors({});
        },
        (validationErrors) => {
          setErrors(validationErrors);
        }
      );
    },
    [form, register]
  );
  
  return (
    <AuthLayout
      leftTitle="Join Our Community"
      leftDescription="Sign up to unlock new features and opportunities."
      leftIcon={<span className="inline-block h-10 w-10 bg-white bg-opacity-20 rounded-full" />}
    >
      <div className="w-full max-w-sm border-none shadow-none bg-white rounded-xl h-full max-h-[500px] flex flex-col">
        <div className="text-center mb-6 flex-shrink-0">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please fill in the information below.
          </p>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <form
            className="space-y-6 overflow-y-auto max-h-[340px] pr-2 flex-1"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              {SignupFormFields.map((field) => {
                const isPasswordField =
                  field.id === "password" ||
                  field.id === "confirm-password";
                return (
                  <div className="space-y-2" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        type={
                          isPasswordField
                            ? showPassword[field.id]
                              ? "text"
                              : "password"
                            : field.type
                        }
                        placeholder={field.placeholder}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 pl-3 py-2 ${
                          errors[field.id] ? "border-red-500" : ""
                        } ${isPasswordField ? "pr-10" : ""}`}
                        value={form[field.id] || ""}
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={registerLoading}
                      />
                      {isPasswordField && (
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                          onClick={() => toggleShowPassword(field.id)}
                          aria-label={
                            showPassword[field.id]
                              ? "Hide password"
                              : "Show password"
                          }
                          disabled={registerLoading}
                        >
                          {showPassword[field.id] ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      )}
                    </div>
                    {errors[field.id] && (
                      <span className="text-xs text-red-500">
                        {errors[field.id]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </form>
          {/* Move the login link and the Sign Up button outside the scrollable form */}
          <button
            type="submit"
            className="w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60 mt-4 shadow-lg shadow-teal-800/25"
            disabled={registerLoading}
            onClick={handleSubmit}
          >
            {registerLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="mt-2 text-sm text-gray-500 flex-shrink-0 text-center">
            Already have an account?
            <a
              onClick={redirectToSignin}
              className="font-semibold text-teal-800 hover:text-teal-700 hover:underline cursor-pointer"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
export default Signup;
