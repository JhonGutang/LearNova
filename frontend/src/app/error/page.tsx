"use client";

import { Button } from "@/src/shadcn/components/ui/button";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import React from "react";

export default function ErrorPage() {
  const { redirect } = useRedirectLink();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-lg w-full">
        <img
          src="/404-error.png"
          alt="404 Error"
          className="max-w-xs w-full mb-6"
        />
        <h1 className="text-3xl font-extrabold mb-3 text-red-600">Something went wrong</h1>
        <p className="text-gray-700 mb-8">
          We're sorry, but an unexpected error has occurred.
        </p>
        <Button
          onClick={() => redirect('/signin')}
          className="w-full cursor-pointer py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-md"
        >
          Login to Continue
        </Button>
      </div>
    </div>
  );
}
