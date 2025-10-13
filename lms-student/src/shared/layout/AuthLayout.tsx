import React from "react";

interface AuthLayoutProps {
  leftTitle: string;
  leftDescription: string;
  leftIcon?: React.ReactNode;
  leftImage?: React.ReactNode;
  children: React.ReactNode;
  formOnRight?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftTitle,
  leftDescription,
  leftIcon,
  leftImage,
  children,
  formOnRight,
}) => {
  return (
    <div className="min-h-screen w-full md:grid md:grid-cols-2">
      {/* Form Panel */}
      <div className={`flex items-center justify-center bg-white p-8 ${formOnRight ? 'md:order-2' : 'md:order-1'}`}>
        {children}
      </div>
      {/* Marketing Panel */}
      <div className={`hidden md:flex flex-col items-center justify-center p-10 relative bg-gradient-to-b from-teal-700 to-teal-900 ${formOnRight ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative z-10 flex flex-col items-center text-white">
          {leftImage}
          {leftIcon && <div className="mt-6">{leftIcon}</div>}
          <h2 className="mt-6 text-2xl font-bold">{leftTitle}</h2>
          <p className="mt-2 max-w-md text-center text-xs opacity-90">{leftDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
