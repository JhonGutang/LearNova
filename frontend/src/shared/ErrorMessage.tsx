import React from 'react';
import { AlertCircle } from 'lucide-react';

type ErrorMessageProps = {
  message: string;
  error?: any;
  children?: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, error, children }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-500 mb-4">{message}</p>
        {error && (
          <details className="text-sm text-gray-400">
            <summary className="cursor-pointer">Show error details</summary>
            <pre className="mt-2 text-left bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
        {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
