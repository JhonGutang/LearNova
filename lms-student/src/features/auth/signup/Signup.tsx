"use client";
import React, { useCallback, useState } from "react";
import { SignupFormFields } from "@/constants/AuthFormFields";
import { useAuth } from "../useAuth";
import { studentCreateInput } from "@/types/data";
import { Eye, EyeOff } from "lucide-react";

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
  const { register, registerLoading } = useAuth();
  const [form, setForm] = useState<Record<string, string>>({ ...initialFormState });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    "confirm-password": false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggleShowPassword = useCallback((fieldId: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  }, []);

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    // Required fields except middle-name and confirm-password
    ["email", "first-name", "last-name", "phone", "address", "password"].forEach((id) => {
      if (!form[id]) newErrors[id] = `${id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} is required`;
    });
    // Email validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    // Password strength
    if (form.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password = "Password must be at least 8 characters and include a number and a letter";
    }
    // Phone validation
    if (form.phone && !/^[0-9\-\s\(\)]+$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    // Password match
    if (form.password !== form["confirm-password"]) {
      newErrors["confirm-password"] = "Passwords do not match";
    }
    return newErrors;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const input: studentCreateInput = {
      email: form.email,
      first_name: form["first-name"],
      last_name: form["last-name"],
      phone: form.phone,
      address: form.address,
      password: form.password,
    };
    if (form["middle-name"]) input.middle_name = form["middle-name"];
    try {
      await register(input);
      // Clear the form fields after successful registration
      setForm({ ...initialFormState });
    } catch {}
  }, [form, register, validate]);
  
  return (
    <div className="flex min-h-screen bg-gray-100 p-8 md:p-0 items-center justify-center">
      <div className="flex w-full overflow-hidden rounded-3xl bg-white shadow-xl max-w-[80vw] mx-auto min-h-[500px]">
        {/* Left Side (Image and Text) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 w-[55%] p-10 relative">
          <div className="absolute inset-0 z-0">
            {/* Decorative elements or image can go here */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              {/* Example: <img src="/signup-image.png" alt="Sign Up" className="object-cover w-full h-full" /> */}
            </div>
          </div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-sm">
              Sign up to unlock new features and opportunities.
            </p>
          </div>
        </div>
        {/* Right Side (Signup Form) */}
        <div className="flex flex-col items-center justify-center p-5 w-[45%] min-h-[500px]">
          <div className="w-full max-w-sm border-none shadow-none bg-white rounded-xl h-full max-h-[500px] flex flex-col">
            <div className="text-center mb-6 flex-shrink-0">
              <div className="flex justify-center mb-4">
                {/* You can place a logo or icon here */}
                <span className="inline-block h-10 w-10 bg-blue-600 rounded-full"></span>
              </div>
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
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 pl-3 py-2 ${
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60 mt-4"
                disabled={registerLoading}
                onClick={handleSubmit}
              >
                {registerLoading ? "Signing Up..." : "Sign Up"}
              </button>
              <div className="mt-2 text-sm text-gray-500 flex-shrink-0 text-center">
                Already have an account?
                <a
                  href="/signin"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
