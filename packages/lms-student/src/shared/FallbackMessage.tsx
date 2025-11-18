import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";
import React from "react";
import { AlertTriangle } from "lucide-react";

type FallbackMessageProps = {
  message: string;
  isError?: boolean;
};

const FallbackMessage: React.FC<FallbackMessageProps> = ({
  message,
  isError,
}) => {
  const { redirect } = useRedirectLink();
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-lg w-full">
          {isError && (
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-2" />
          )}
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            {message}
          </h2>
          {isError && (
            <Button
              onClick={() => redirect("/signin")}
              className="mt-4 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded shadow"
            >
              Back to login
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default FallbackMessage;
