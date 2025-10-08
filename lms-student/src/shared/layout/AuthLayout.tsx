import React from "react";

interface AuthLayoutProps {
  leftTitle: string;
  leftDescription: string;
  leftIcon?: React.ReactNode;
  leftImage?: React.ReactNode;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftTitle,
  leftDescription,
  leftIcon,
  leftImage,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-8 md:p-0 items-center justify-center">
      <div className="flex w-full overflow-hidden rounded-3xl bg-white shadow-xl max-w-[80vw] mx-auto min-h-[500px]">
        {/* Left Side (Image and Text) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-teal-800 w-[55%] p-10 relative">
          {/* Background shapes and effects */}
          <div className="absolute inset-0 z-0">
            {leftImage ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {leftImage}
              </div>
            ) : null}
          </div>
          <div className="relative z-10 text-white text-center">
            {leftIcon && <div className="flex justify-center mb-4">{leftIcon}</div>}
            <h2 className="text-3xl font-bold mb-4">{leftTitle}</h2>
            <p className="text-sm">{leftDescription}</p>
          </div>
        </div>
        {/* Right Side (Form) */}
        <div className="flex flex-col items-center justify-center p-5 w-[45%] min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
