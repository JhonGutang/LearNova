import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/shadcn/components/ui/card";
import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { steps } from "@/constants/formItems";
import type { StepType } from "@lms/shared-types";

const Signin = () => {
  const {
    form,
    error,
    step,
    isSubmitted,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useAuth(steps as StepType[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-white transition-colors duration-500">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl transition-all duration-500 overflow-hidden">
        <CardHeader className="text-center p-6 sm:p-8 border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Your Account
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Join us today to get started.
          </p>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-800">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Account Created!</h3>
              <p className="text-gray-600">
                You have successfully signed in. Welcome to the team!
              </p>
            </div>
          ) : (
            <form
              onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
              className="space-y-6"
            >
              {/* Progress Indicator */}
              <div className="flex justify-between items-center mb-6">
                {steps.map((s, index) => (
                  <React.Fragment key={s.key}>
                    <div className="flex flex-col items-center flex-grow">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${
                          index <= step
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium text-center ${
                          index <= step
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 w-full flex-grow mx-2 rounded-full transition-colors duration-300 ${
                          index < step
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {steps[step].fields.map((field) => (
                    <div
                      className={`${
                        field.key.includes("Name")
                          ? "col-span-1"
                          : "sm:col-span-2"
                      } flex flex-col gap-2`}
                      key={field.key}
                    >
                      <Label
                        htmlFor={field.id}
                        className="text-sm font-semibold text-gray-700"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.id}
                          type={
                            field.type === "password"
                              ? field.key === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : showConfirmPassword
                                ? "text"
                                : "password"
                              : field.type
                          }
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) =>
                            handleChange(field.key as keyof typeof form, e.target.value)
                          }
                          autoComplete={field.autoComplete}
                          className={`w-full rounded-md border-gray-300 focus:border-blue-500 transition-all duration-300
                            ${
                              error && !form[field.key as keyof typeof form]
                                ? "border-red-500 ring-red-500"
                                : ""
                            }
                          `}
                        />
                        {(field.key === "password" ||
                          field.key === "confirmPassword") && (
                          <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer bg-transparent border-0"
                            onClick={() => {
                              if (field.key === "password") {
                                setShowPassword((v) => !v);
                              } else if (field.key === "confirmPassword") {
                                setShowConfirmPassword((v) => !v);
                              }
                            }}
                          >
                            {field.key === "password"
                              ? showPassword
                                ? <EyeOff className="h-4 w-4 text-gray-400" />
                                : <Eye className="h-4 w-4 text-gray-400" />
                              : showConfirmPassword
                              ? <EyeOff className="h-4 w-4 text-gray-400" />
                              : <Eye className="h-4 w-4 text-gray-400" />}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm p-3 rounded-md border border-red-500 bg-red-50 text-center transition-all duration-300 animate-fadeIn">
                  {error}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-6">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    className="flex-1 rounded-full px-6 py-4 font-semibold transition-all duration-300"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`${
                    step > 0 ? "flex-1" : "w-full"
                  } px-6 py-4 font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700`}
                >
                  {step === steps.length - 1 ? "Sign In" : "Next"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
