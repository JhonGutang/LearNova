import React from 'react';
import { AlertCircle } from 'lucide-react';

type ErrorMessageProps = {
  children?: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({  children }) => {
  return (
    <div className="flex items-center pl-2 pt-2">
      <div className="text-center text-xs text-red-600">
       {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
