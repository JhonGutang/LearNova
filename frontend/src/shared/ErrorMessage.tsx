import React from 'react';

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className="text-xs text-red-500 mt-1">
      {children}
    </div>
  );
};

export default ErrorMessage;
