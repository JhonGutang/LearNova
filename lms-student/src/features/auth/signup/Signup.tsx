import React from "react";
import { SignupFormFields } from "@/constants/AuthFormFields";


const Signup: React.FC = () => {
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
            <p className="text-sm">Sign up to unlock new features and opportunities.</p>
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
            <div className="flex-1 min-h-0">
              <form className="space-y-6 overflow-y-auto max-h-[340px] pr-2">
                <div className="space-y-4">
                  {SignupFormFields.map((field) => (
                    <div className="space-y-2" key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 pl-3 py-2"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                  Sign Up
                </button>
                <div className="relative flex items-center justify-center text-xs text-gray-400">
                  <span className="absolute left-0 w-full border-t border-gray-200"></span>
                  <span className="relative z-10 px-2 bg-white">OR</span>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-50 transition-colors"
                >
                  {/* <GoogleIcon className="h-4 w-4" /> */}
                  <span>Sign up with Google</span>
                </button>
              </form>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/signin" className="font-semibold text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
