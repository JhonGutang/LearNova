"use client";

import React, { useEffect } from "react";
export default function ErrorPage() {


  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 text-center">
      <img
        src="/404-error.png"
        alt="404 Error"
        className="max-w-xl mb-8"
      />
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-600">We're sorry, but an unexpected error has occurred.</p>
    </div>
  );
}
